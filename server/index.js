const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const { createClient } = require('@sanity/client');
require('dotenv').config();

const sanityClient = createClient({
  projectId: '5n8h847y',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-05-08',
  token: process.env.SANITY_API_TOKEN,
});

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
app.use(cors()); // Allow all origins for testing and unblock localhost/production mix

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

let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
} else {
  console.error('\x1b[31mError: RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing in .env\x1b[0m');
}

// Configure Nodemailer Transporter for Zoho
const smtpPort = parseInt(process.env.SMTP_PORT || '465');
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.zoho.in',
  port: smtpPort,
  secure: smtpPort === 465, // true for 465, false for other ports
  requireTLS: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const PRODUCTS = {
  'first-client': {
    name: 'First Freelance Client System',
    downloadLink: 'https://1drv.ms/b/c/3aac4d58cd15c559/IQC-aJwdaaG9SZTnxvoHF0OvAVoJ5uv-lrqAiLA9cjJ4G5E?e=jiW0I0',
    subject: 'Welcome to the First Freelance Client System! 🎉'
  },
  'women-income-ideas': {
    name: 'Income Making Ideas for Women (Hindi/Marathi)',
    downloadLink: 'https://1drv.ms/b/c/3aac4d58cd15c559/IQA3xstO1F2QQ5MJln5pbsWjATn7PiEth5ZIi-qeIHsC5ZE?e=Sw94mO',
    subject: 'Welcome to Income Making Ideas for Women! 🎉'
  }
};

const sendConfirmationEmail = async (email, name, productId = 'first-client') => {
  if (!process.env.SMTP_PASSWORD) {
    console.log('Skipping email send: SMTP_PASSWORD not configured in .env');
    return;
  }
  
  const product = PRODUCTS[productId] || PRODUCTS['first-client'];
  const firstName = name ? name.split(' ')[0] : 'Freelancer';
  const mailOptions = {
    from: `"Grow Your Business" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: product.subject,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
        <h2 style="color: #10b981;">Welcome, ${firstName}! 🎉</h2>
        <p>Thank you for purchasing the <strong>${product.name}</strong>.</p>
        <p>We've unlocked everything for you. Your journey starts today.</p>
 
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #10b981;">Download Your Product:</h3>
          <p>You can access your complete PDF playbook via our secure OneDrive link here:</p>
          <a href="${product.downloadLink}" style="display: inline-block; background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-top: 10px;">Download Complete PDF</a>
        </div>
 
        <p style="margin-top: 30px;">If you have any questions or need help, feel free to reply to this email or reach out to us on WhatsApp (+91 62828 63459).</p>
        
        <p>To your success,<br/><strong>The Grow Your Business Team</strong></p>
      </div>
    `
  };
 
  try {
    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${email} for ${productId}`);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};

const syncOrderToSanity = async (orderData) => {
  if (!process.env.SANITY_API_TOKEN) {
    console.log('Skipping Sanity sync: SANITY_API_TOKEN not configured');
    return;
  }

  try {
    const doc = {
      _type: 'order',
      customerName: orderData.name,
      customerEmail: orderData.email,
      productId: orderData.product_id,
      amount: orderData.amount / 100, // Convert paise to INR
      paymentId: orderData.razorpay_payment_id,
      orderId: orderData.razorpay_order_id,
      status: 'completed',
      createdAt: new Date().toISOString(),
    };

    await sanityClient.create(doc);
    console.log(`Order synced to Sanity for ${orderData.email}`);
  } catch (error) {
    console.error('Error syncing order to Sanity:', error);
  }
};

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'active', message: 'Grow Your Business API is running' });
});

// Get sales count
app.get('/api/sales-count', (req, res) => {
  res.json({ count: getSalesCount() });
});

// Create order — accepts name + email for prefill and later storage
app.post('/api/create-order', async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(500).json({ error: 'Payment gateway not initialized. Check server logs.' });
    }
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
        sendConfirmationEmail(buyer_email, buyer_name, req.body.product_id);
        syncOrderToSanity({
          ...req.body,
          email: buyer_email,
          name: buyer_name,
          amount: req.body.amount || 0 // Assuming amount is passed or fetched
        });
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

// Register buyer after payment (for post-payment collection)
app.post('/api/register-purchase', async (req, res) => {
  try {
    const { payment_id, email, name } = req.body;
    if (!payment_id || !email) {
      return res.status(400).json({ error: 'Payment ID and email are required' });
    }
    
    addBuyer(email, name || 'Learner');
    await sendConfirmationEmail(email, name || 'Learner');
    
    res.json({ status: 'success', message: 'Purchase registered successfully' });
  } catch (error) {
    console.error('Error registering purchase:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const SUPPORT_FILE = path.join(DATA_DIR, 'support_requests.json');

const addSupportRequest = (email, mobile) => {
  try {
    let requests = [];
    if (fs.existsSync(SUPPORT_FILE)) {
      requests = JSON.parse(fs.readFileSync(SUPPORT_FILE, 'utf8'));
    }
    requests.push({
      email: email.toLowerCase().trim(),
      mobile,
      requestedAt: new Date().toISOString()
    });
    fs.writeFileSync(SUPPORT_FILE, JSON.stringify(requests, null, 2));
  } catch (error) {
    console.error('Error saving support request:', error);
  }
};

// Verify purchase and log support request
app.post('/api/request-support', (req, res) => {
  try {
    const { email, mobile } = req.body;
    if (!email || !mobile) {
      return res.status(400).json({ authorized: false, error: 'Email and mobile are required' });
    }

    const buyers = getBuyers();
    const normalized = email.toLowerCase().trim();
    const buyer = buyers.find(b => b.email === normalized);

    if (buyer) {
      addSupportRequest(email, mobile);
      res.json({ authorized: true, message: 'Support request verified' });
    } else {
      res.status(403).json({ authorized: false, error: 'No purchase found for this email. Please ensure you use the same email used during purchase.' });
    }
  } catch (error) {
    console.error('Error processing support request:', error);
    res.status(500).json({ authorized: false, error: 'Server error' });
  }
});

app.post('/api/submit-review', async (req, res) => {
  try {
    const { name, rating, comment, productId } = req.body;
    
    if (!name || !rating || !comment || !productId) {
      return res.status(400).json({ error: 'Missing required fields: name, rating, comment, and productId are all required.' });
    }

    const doc = {
      _type: 'review',
      name,
      rating: parseInt(rating),
      comment,
      product: {
        _type: 'reference',
        _ref: productId,
      },
      approved: false,
      createdAt: new Date().toISOString(),
    };

    const result = await sanityClient.create(doc);
    console.log('Review created in Sanity:', result._id);
    res.json({ status: 'success', message: 'Review submitted for approval! It will be visible once approved.' });
  } catch (error) {
    console.error('Error submitting review:', error);
    res.status(500).json({ error: 'Failed to submit review', details: error.message });
  }
});


// Admin: Get all reviews
app.get('/api/admin/reviews', async (req, res) => {
  try {
    const query = `*[_type == "review"] | order(createdAt desc) {
      _id,
      name,
      rating,
      comment,
      approved,
      createdAt,
      "productTitle": product->title
    }`;
    const reviews = await sanityClient.fetch(query);
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching admin reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Admin: Approve review
app.post('/api/admin/approve-review', async (req, res) => {
  try {
    const { reviewId } = req.body;
    await sanityClient.patch(reviewId).set({ approved: true }).commit();
    res.json({ status: 'success' });
  } catch (error) {
    console.error('Error approving review:', error);
    res.status(500).json({ error: 'Failed to approve review' });
  }
});

// Admin: Delete review
app.post('/api/admin/delete-review', async (req, res) => {
  try {
    const { reviewId } = req.body;
    await sanityClient.delete(reviewId);
    res.json({ status: 'success' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ error: 'Failed to delete review' });
  }
});


const PORT = process.env.PORT || 5000;

// Keep-alive ping for Render
const pingBackend = () => {
  const url = process.env.BACKEND_URL || `http://localhost:${PORT}`;
  const client = url.startsWith('https') ? require('https') : require('http');
  client.get(`${url}/api/sales-count`, (res) => {
    console.log(`Keep-alive ping: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`Keep-alive ping failed: ${err.message}`);
  });
};

// Run every 5 minutes (300,000 milliseconds)
setInterval(pingBackend, 5 * 60 * 1000);

app.listen(PORT, () => {
  console.log(`\x1b[36m✓ Server running on port ${PORT}\x1b[0m`);
});
