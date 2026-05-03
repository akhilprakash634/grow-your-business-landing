const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const DATA_DIR = process.env.DATA_DIR || __dirname;
const SALES_FILE = path.join(DATA_DIR, 'sales.json');
const BUYERS_FILE = path.join(DATA_DIR, 'authorized_emails.json');

const getSalesCount = () => {
  try {
    const data = fs.readFileSync(SALES_FILE, 'utf8');
    return JSON.parse(data).count;
  } catch (error) {
    return 6;
  }
};

const incrementSalesCount = () => {
  try {
    const count = getSalesCount();
    fs.writeFileSync(SALES_FILE, JSON.stringify({ count: count + 1 }));
    return count + 1;
  } catch (error) {
    console.error('Error updating sales count:', error);
  }
};

const getBuyers = () => {
  try {
    const data = fs.readFileSync(BUYERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const addBuyer = (email, name) => {
  try {
    const buyers = getBuyers();
    const normalized = email.toLowerCase().trim();
    const already = buyers.find(b => b.email === normalized);
    if (!already) {
      buyers.push({ email: normalized, name, purchasedAt: new Date().toISOString() });
      fs.writeFileSync(BUYERS_FILE, JSON.stringify(buyers, null, 2));
    }
  } catch (error) {
    console.error('Error saving buyer:', error);
  }
};

const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://growyourbusiness.today', 'https://www.growyourbusiness.today'],
  methods: ['GET', 'POST'],
  credentials: true
}));

// Simple request logger
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    const status = res.statusCode;
    const color = status >= 500 ? '\x1b[31m' : status >= 400 ? '\x1b[33m' : '\x1b[32m';
    console.log(`${color}[${new Date().toISOString()}] ${req.method} ${req.path} → ${status} (${duration}ms)\x1b[0m`);
  });
  next();
});

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Get sales count
app.get('/api/sales-count', (req, res) => {
  res.json({ count: getSalesCount() });
});

// Create order — accepts name + email for prefill and later storage
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt = 'receipt_' + Date.now(), name, email } = req.body;

    if (!amount || amount < 100) {
      return res.status(400).json({ error: 'Amount must be at least 100 paise (₹1)' });
    }

    const options = {
      amount: parseInt(amount),
      currency,
      receipt,
      notes: {
        buyer_name: name || '',
        buyer_email: email || '',
      },
    };

    const order = await razorpay.orders.create(options);
    res.json({ ...order, key_id: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

// Verify payment + store buyer email
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, buyer_email, buyer_name } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required payment details' });
    }

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      incrementSalesCount();
      if (buyer_email) {
        addBuyer(buyer_email, buyer_name);
      }
      res.json({ status: 'success', message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ status: 'failure', message: 'Invalid signature' });
    }
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Check if email has purchased access
app.post('/api/check-access', (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ authorized: false, error: 'Email required' });
    const buyers = getBuyers();
    const normalized = email.toLowerCase().trim();
    const buyer = buyers.find(b => b.email === normalized);
    res.json({ authorized: !!buyer, buyer: buyer || null });
  } catch (error) {
    console.error('Error checking access:', error);
    res.status(500).json({ authorized: false, error: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\x1b[36m✓ Server running on port ${PORT}\x1b[0m`);
});
