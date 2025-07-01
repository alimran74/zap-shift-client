import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import warehouseData from '../../../../public/Warehouse.json'; // Adjust if needed
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    age: '',
    region: '',
    district: '',
    phone: '',
    nationalId: '',
    bikeBrand: '',
    bikeRegNumber: '',
    status: 'pending'
  });

  // Extract unique regions from warehouse data
  useEffect(() => {
    const uniqueRegions = [...new Set(warehouseData.map(item => item.region))];
    setRegions(uniqueRegions);
  }, []);

  // Update district options when region changes
  useEffect(() => {
    if (selectedRegion) {
      const filteredDistricts = warehouseData
        .filter(item => item.region === selectedRegion)
        .map(item => item.district);
      setDistricts([...new Set(filteredDistricts)]);
    } else {
      setDistricts([]);
    }
  }, [selectedRegion]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'region') {
      setSelectedRegion(value);
      setFormData(prev => ({
        ...prev,
        district: '' // reset district if region changes
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.post('/riders', formData);

      if (res.data?.insertedId) {
        Swal.fire('✅ Success', 'Your rider application has been submitted.', 'success');
        // Optional: reset form
      } else {
        Swal.fire('❌ Error', 'Submission failed.', 'error');
      }
    } catch (error) {
      console.error('❌ Rider application error:', error);
      Swal.fire('❌ Error', error?.response?.data?.message || 'Something went wrong!', 'error');
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl text-black font-semibold mb-4">🚴 Apply to Be a Rider</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <input type="text" name="name" value={formData.name} readOnly className="input input-bordered w-full" />
        <input type="email" name="email" value={formData.email} readOnly className="input input-bordered w-full" />

        <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="input input-bordered w-full" required />

        <select name="region" value={formData.region} onChange={handleChange} className="select select-bordered w-full" required>
          <option value="">Select Region</option>
          {regions.map(region => (
            <option key={region} value={region}>{region}</option>
          ))}
        </select>

        <select name="district" value={formData.district} onChange={handleChange} className="select select-bordered w-full" required>
          <option value="">Select District</option>
          {districts.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>

        <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="text" name="nationalId" placeholder="National ID Card Number" value={formData.nationalId} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="text" name="bikeBrand" placeholder="Bike Brand" value={formData.bikeBrand} onChange={handleChange} className="input input-bordered w-full" required />
        <input type="text" name="bikeRegNumber" placeholder="Bike Registration Number" value={formData.bikeRegNumber} onChange={handleChange} className="input input-bordered w-full" required />

        <button type="submit" className="btn btn-primary w-full">Submit Application</button>
      </form>
    </div>
  );
};

export default BeARider;
