// client/src/pages/Payment/KhaltiPayment.js
import React, { useState } from 'react';
import KhaltiCheckout from 'khalti-checkout-web';
import axios from 'axios';
import "../styles/KhaltiPayment.css";

const KhaltiPayment = () => {
  const [amount, setAmount] = useState(0);

  const config = {
    publicKey: 'test_public_key_dc74eeb3d9b74b27b47e68d032c883d7', // replace with your public key
    productIdentity: '1234567890',
    productName: 'Dahal-Kirana',
    productUrl: 'http://localhost:3000',
    eventHandler: {
      onSuccess(payload) {
        console.log(payload);
        axios.post('/api/v1/khalti/verify', {
          token: payload.token,
          amount: payload.amount,
        })
        .then(response => {
          console.log(response.data);
          if (response.data.success) {
            alert('Payment verified successfully');
          } else {
            alert('Payment verification failed');
          }
        })
        .catch(error => {
          console.error(error);
          alert('Something went wrong');
        });
      },
      onError(error) {
        console.log(error);
      },
      onClose() {
        console.log('widget is closing');
      },
    },
    paymentPreference: [
      'KHALTI',
      'EBANKING',
      'MOBILE_BANKING',
      'CONNECT_IPS',
      'SCT',
    ],
  };

  let checkout = new KhaltiCheckout(config);

  return (
    <div className="khalti-payment-container">
      <h3 className="text-center mb-4">Khalti Payment </h3>
      <div className="payment-form">
        <div className="form-group mb-3">
          <label htmlFor="amount" className="form-label">Enter Amount</label>
          <input
            type="number"
            id="amount"
            className="form-control"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>
        <button
          className="btn btn-primary btn-block"
          onClick={() => checkout.show({ amount: amount * 100 })}
          disabled={!amount}
        >
          Pay with Khalti
        </button>
      </div>
    </div>
  );
};

export default KhaltiPayment;
