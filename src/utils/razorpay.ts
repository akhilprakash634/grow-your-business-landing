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
  onSuccess: (response: any) => void;
  onCancel?: () => void;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const initiateCheckout = async (options: PaymentOptions) => {
  try {
    // 1. Create order on the backend
    const orderResponse = await fetch(`${API_URL}/api/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: options.amount,
        currency: options.currency,
      }),
    });

    if (!orderResponse.ok) {
      throw new Error('Failed to create order');
    }

    const orderData = await orderResponse.json();

    // 2. Open Razorpay Checkout
    const rzpOptions = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderData.amount,
      currency: orderData.currency,
      name: options.name,
      description: options.description,
      image: options.image || 'https://static.readdy.ai/image/3a79f3d26d575281f009959c52307d03/4faeac9cacf9a888180dbe48ffa35e91.png',
      order_id: orderData.id,
      handler: async (response: any) => {
        // 3. Verify payment on the backend
        try {
          const verifyResponse = await fetch(`${API_URL}/api/verify-payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          if (verifyResponse.ok) {
            options.onSuccess(response);
          } else {
            alert('Payment verification failed. Please contact support.');
          }
        } catch (error) {
          console.error('Verification error:', error);
          alert('Error verifying payment.');
        }
      },
      prefill: {
        name: '',
        email: '',
        contact: '',
      },
      theme: {
        color: '#10b981', // Emerald matching the website theme
      },
      modal: {
        ondismiss: () => {
          if (options.onCancel) options.onCancel();
        },
      },
    };

    const rzp = new window.Razorpay(rzpOptions);
    rzp.open();
  } catch (error: any) {
    console.error('Checkout error:', error);
    alert(`Checkout failed: ${error.message || 'An unexpected error occurred.'}`);
  }
};
