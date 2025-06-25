import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ['my-parcels', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/parcels?email=${user?.email}`);
      return res.data.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <div className="flex justify-center items-center mt-10"><span className="loading loading-dots loading-lg text-primary"></span></div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">📦 My Parcels</h2>

      <div className="overflow-x-auto shadow-2xl rounded-xl border border-gray-200">
        <table className="table table-zebra table-lg w-full">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-[15px]">
            <tr>
              <th>#</th>
              <th>Parcel ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Weight</th>
              <th>Status</th>
              <th>Cost</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {parcels.map((parcel, index) => (
              <tr key={parcel.parcelId} className="hover:bg-indigo-50 transition-all duration-300">
                <td className="font-semibold">{index + 1}</td>
                <td className="text-xs text-gray-600">{parcel.parcelId.slice(0, 10)}...</td>
                <td className="font-medium">{parcel.title}</td>
                <td>
                  <span className={`badge ${parcel.type === 'document' ? 'badge-info' : 'badge-secondary'}`}>
                    {parcel.type}
                  </span>
                </td>
                <td>{parcel.weight || '-'}</td>
                <td>
                  <span className={`badge ${parcel.status === 'Pending' ? 'badge-warning' : 'badge-success'}`}>
                    {parcel.status}
                  </span>
                </td>
                <td className="text-green-600 font-semibold">৳{parcel.cost}</td>
                <td className="text-xs text-gray-500 leading-tight">
                  {parcel.creation_date_local}<br />
                  <span className="text-[11px]">{parcel.creation_time_local}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
