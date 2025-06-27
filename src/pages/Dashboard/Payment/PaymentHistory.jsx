import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { LoaderIcon } from 'react-hot-toast';
import './PaymentHistory.css'; // 👈 Add custom CSS for animation

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { isPending, data: payments = [] } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center mt-20">
        <LoaderIcon className="animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center mb-10 text-white  ">
        💳 Payment History
      </h2>

      {payments.length === 0 ? (
        <p className="text-center text-lg text-gray-500 mt-10">
          No payments have been made yet.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-2xl rounded-xl border border-gray-200">
          <table className="min-w-full text-base text-gray-800">
            <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Parcel ID</th>
                <th className="py-3 px-4 text-left">User Email</th>
                <th className="py-3 px-4 text-left">Amount (৳)</th>
                <th className="py-3 px-4 text-left">Transaction ID</th>
                <th className="py-3 px-4 text-left">Paid At</th>
                <th className="py-3 px-4 text-left">Raw ISO Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment.transactionId}
                  className="animated-gradient text-white transition-all duration-200"
                >
                  <td className="py-3 px-4 font-medium">{index + 1}</td>
                  <td className="py-3 px-4 font-mono text-sm">{payment.parcelId}</td>
                  <td className="py-3 px-4 text-sm">{payment.userEmail}</td>
                  <td className="py-3 px-4 font-bold">৳{payment.amount}</td>
                  <td className="py-3 px-4 font-mono text-sm break-all">{payment.transactionId}</td>
                  <td className="py-3 px-4 text-sm">
                    {new Date(payment.paidAt).toLocaleString("en-BD", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </td>
                  <td className="py-3 px-4 text-xs">{payment.paid_at_string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
