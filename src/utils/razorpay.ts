declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentOptions {
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  buyerName?: string;
  buyerEmail?: string;
  onSuccess: (response: any, buyerEmail?: string) => void;
  onCancel?: () => void;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const initiateCheckout = async (options: PaymentOptions) => {
  try {
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      throw new Error('Razorpay SDK failed to load. Please check your internet connection or disable any adblockers.');
    }

    // 1. Create order on the backend (pass buyer info for storage)
    const orderResponse = await fetch(`${API_URL}/api/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        amount: options.amount,
        currency: options.currency,
        name: options.buyerName,
        email: options.buyerEmail,
      }),
    });

    if (!orderResponse.ok) {
      throw new Error('Failed to create order. Please try again.');
    }

    const orderData = await orderResponse.json();

    // 2. Open Razorpay Checkout
    const rzpOptions = {
      key: orderData.key_id,
      amount: orderData.amount,
      currency: orderData.currency,
      name: options.name,
      description: options.description,
      image: options.image || 'https://static.readdy.ai/image/3a79f3d26d575281f009959c52307d03/4faeac9cacf9a888180dbe48ffa35e91.png',
      order_id: orderData.id,
      handler: async (response: any) => {
        // 3. Verify payment on the backend (include buyer info)
        try {
          const verifyResponse = await fetch(`${API_URL}/api/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              buyer_email: options.buyerEmail,
              buyer_name: options.buyerName,
            }),
          });

          if (verifyResponse.ok) {
            options.onSuccess(response, options.buyerEmail);
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        } catch (error) {
          console.error('Verification error:', error);
          alert('Error verifying payment.');
        }
      },
      prefill: {
        name: options.buyerName || '',
        email: options.buyerEmail || '',
        contact: '',
      },
      theme: {
        color: '#10b981',
      },
      modal: {
        ondismiss: () => {
          if (options.onCancel) options.onCancel();
        },
      },
    };

    if (typeof window.Razorpay !== 'function') {
      throw new Error('Razorpay SDK failed to load. Please disable your adblocker or check your internet connection.');
    }

    const rzp = new window.Razorpay(rzpOptions);
    rzp.open();
  } catch (error: any) {
    console.error('Checkout error:', error);
    alert(`Checkout failed: ${error.message || 'An unexpected error occurred.'}`);
  }
};
