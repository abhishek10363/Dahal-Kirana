// server/controllers/paymentController.js
import axios from 'axios';

export const verifyKhaltiPayment = async (req, res) => {
  const { token, amount } = req.body;

  try {
    const response = await axios.post(
      'https://khalti.com/api/v2/payment/verify/',
      {
        token,
        amount,
      },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        },
      }
    );

    if (response.data.state.name === 'Completed') {
      res.status(200).send({
        success: true,
        message: 'Payment verified successfully',
      });
    } else {
      res.status(400).send({
        success: false,
        message: 'Payment verification failed',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'Something went wrong',
    });
  }
};
