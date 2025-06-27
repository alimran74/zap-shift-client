import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const PaymentForm = ({ parcel }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    try {
      // 1. Create payment intent from backend
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: parseInt(parcel.cost),
        parcel: parcel._id,
      });

      const clientSecret = res.data.clientSecret;

      // 2. Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "Vladimir Putin", // optional: dynamic user name
          },
        },
      });

      if (result.error) {
        console.error("❌ Payment failed:", result.error.message);
        setError(result.error.message);
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        console.log("✅ Payment successful:", result.paymentIntent);
        setError("");

        // Optional: Update isPaid = true in database

        // Show SweetAlert
        Swal.fire({
          title: "🎉 Payment Successful!",
          text: `৳${parcel.cost} has been paid for this parcel.`,
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#6366F1",
          background: "#fff",
        });
      }

      console.log("💳 Payment Intent Response:", res.data);
      console.log("📦 Parcel ID:", parcel._id);
      console.log("💰 Amount to Pay:", parcel.cost);
    } catch (err) {
      console.error("🔥 Error in payment process:", err.message);
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6 rounded-xl shadow-xl w-full max-w-md mx-auto"
      >
        <CardElement className="p-2 border rounded" />
        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn btn-primary w-full"
        >
          {loading
            ? "Processing..."
            : `Pay ৳${parcel.cost} for Parcel Pickup`}
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
