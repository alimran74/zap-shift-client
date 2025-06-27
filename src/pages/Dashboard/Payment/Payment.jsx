import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Key)

const Payment = () => {
  const { id } = useParams();  // parcel id from URL param
  const axiosSecure = useAxiosSecure();

  const [parcel, setParcel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchParcel = async () => {
      try {
        const res = await axiosSecure.get(`/api/parcels/${id}`);
        setParcel(res.data.data); // your backend should return parcel object here
      } catch (error) {
        console.error("Failed to fetch parcel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParcel();
  }, [id, axiosSecure]);

  if (loading) {
    return <div>Loading parcel details...</div>;
  }

  if (!parcel) {
    return <div>Parcel not found.</div>;
  }

  return (
    <Elements stripe={stripePromise}>
        <PaymentForm parcel={parcel}/>
    </Elements>
  );
};

export default Payment;
