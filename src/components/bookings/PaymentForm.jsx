import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { API_URL } from "../../util/constants";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PaymentForm = ({ amount, onSuccessfulPayment }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const response = await axios.post(`${API_URL}/payment`, { amount });
      const clientSecret = response.data.clientSecret;
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        console.error(error);
        toast.error("Payment failed!");
        return;
      }

      if (paymentIntent.status === "succeeded") {
        await onSuccessfulPayment();
        toast.success("Payment succeeded!");
        navigate(`/profile/${user._id}`, { replace: true });
      } else {
        toast.error("Payment failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Payment failed!");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group mb-3">
        <label htmlFor="card-element">Credit or Debit Card</label>
        <CardElement id="card-element" className="form-control" />
      </div>
      <button type="submit" disabled={isProcessing} className="py-2 w-100">
        {isProcessing ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default PaymentForm;
