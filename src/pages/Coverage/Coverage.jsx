import React, { useState } from 'react';
import BangladeshMap from './BangladeshMap'; // adjust path if needed

// ✅ All 64 districts with coordinates
const districts = [
  { name: 'Bagerhat', lat: 22.6512, lng: 89.7856 },
  { name: 'Bandarban', lat: 22.1953, lng: 92.2184 },
  { name: 'Barguna', lat: 22.0953, lng: 90.1121 },
  { name: 'Barishal', lat: 22.701, lng: 90.3535 },
  { name: 'Bhola', lat: 22.6859, lng: 90.6482 },
  { name: 'Bogra', lat: 24.8465, lng: 89.3776 },
  { name: 'Brahmanbaria', lat: 23.9571, lng: 91.1114 },
  { name: 'Chandpur', lat: 23.2333, lng: 90.6667 },
  { name: 'Chattogram', lat: 22.3569, lng: 91.7832 },
  { name: 'Chuadanga', lat: 23.6402, lng: 88.8418 },
  { name: 'Comilla', lat: 23.4607, lng: 91.1809 },
  { name: "Cox's Bazar", lat: 21.4272, lng: 92.0058 },
  { name: 'Dhaka', lat: 23.8103, lng: 90.4125 },
  { name: 'Dinajpur', lat: 25.627, lng: 88.6332 },
  { name: 'Faridpur', lat: 23.607, lng: 89.8429 },
  { name: 'Feni', lat: 23.0231, lng: 91.3955 },
  { name: 'Gaibandha', lat: 25.329, lng: 89.5286 },
  { name: 'Gazipur', lat: 23.9999, lng: 90.4203 },
  { name: 'Gopalganj', lat: 23.0051, lng: 89.8266 },
  { name: 'Habiganj', lat: 24.3774, lng: 91.4125 },
  { name: 'Jamalpur', lat: 24.9375, lng: 89.9371 },
  { name: 'Jashore', lat: 23.1706, lng: 89.2137 },
  { name: 'Jhalokathi', lat: 22.6416, lng: 90.1987 },
  { name: 'Jhenaidah', lat: 23.5442, lng: 89.1531 },
  { name: 'Joypurhat', lat: 25.0947, lng: 89.017 },
  { name: 'Khagrachhari', lat: 23.1193, lng: 91.9847 },
  { name: 'Khulna', lat: 22.8456, lng: 89.5403 },
  { name: 'Kishoreganj', lat: 24.426, lng: 90.9821 },
  { name: 'Kurigram', lat: 25.8054, lng: 89.6362 },
  { name: 'Kushtia', lat: 23.9013, lng: 89.1208 },
  { name: 'Lakshmipur', lat: 22.9446, lng: 90.8304 },
  { name: 'Lalmonirhat', lat: 25.9923, lng: 89.2847 },
  { name: 'Madaripur', lat: 23.1641, lng: 90.189 },
  { name: 'Magura', lat: 23.485, lng: 89.419 },
  { name: 'Manikganj', lat: 23.8615, lng: 89.969 },
  { name: 'Meherpur', lat: 23.7622, lng: 88.6311 },
  { name: 'Moulvibazar', lat: 24.4829, lng: 91.7779 },
  { name: 'Munshiganj', lat: 23.5422, lng: 90.5305 },
  { name: 'Mymensingh', lat: 24.7471, lng: 90.4203 },
  { name: 'Naogaon', lat: 24.7936, lng: 88.9318 },
  { name: 'Narail', lat: 23.154, lng: 89.495 },
  { name: 'Narayanganj', lat: 23.6238, lng: 90.5 },
  { name: 'Narsingdi', lat: 23.9323, lng: 90.715 },
  { name: 'Natore', lat: 24.4206, lng: 88.9934 },
  { name: 'Netrokona', lat: 24.8709, lng: 90.727 },
  { name: 'Nilphamari', lat: 25.931, lng: 88.856 },
  { name: 'Noakhali', lat: 22.8231, lng: 91.0973 },
  { name: 'Pabna', lat: 24.0136, lng: 89.233 },
  { name: 'Panchagarh', lat: 26.335, lng: 88.5515 },
  { name: 'Patuakhali', lat: 22.3596, lng: 90.3296 },
  { name: 'Pirojpur', lat: 22.5841, lng: 89.975 },
  { name: 'Rajbari', lat: 23.7574, lng: 89.6441 },
  { name: 'Rajshahi', lat: 24.3745, lng: 88.6042 },
  { name: 'Rangamati', lat: 22.7324, lng: 92.2985 },
  { name: 'Rangpur', lat: 25.7465, lng: 89.251 },
  { name: 'Satkhira', lat: 22.7085, lng: 89.0715 },
  { name: 'Shariatpur', lat: 23.2423, lng: 90.4348 },
  { name: 'Sherpur', lat: 25.0206, lng: 90.0153 },
  { name: 'Sirajganj', lat: 24.4534, lng: 89.7006 },
  { name: 'Sunamganj', lat: 25.0658, lng: 91.395 },
  { name: 'Sylhet', lat: 24.8949, lng: 91.8687 },
  { name: 'Tangail', lat: 24.2513, lng: 89.9167 },
  { name: 'Thakurgaon', lat: 26.041, lng: 88.4283 }
];

const Coverage = () => {
  const [search, setSearch] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(
  districts.find(d => d.name === 'Dhaka')
);


  const filtered = districts.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          We are available in 64 districts
        </h1>

        {/* 🔍 Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search district..."
          className="input input-bordered w-full max-w-md mt-6"
        />

        {/* Dropdown */}
        {search && (
          <ul className="bg-white text-black border rounded-md mt-2 max-w-md mx-auto text-left shadow">
            {filtered.length > 0 ? (
              filtered.map((d, i) => (
                <li
                  key={i}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedDistrict(d);
                    setSearch(d.name);
                  }}
                >
                  {d.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No match found</li>
            )}
          </ul>
        )}
      </div>

      {/* 🗺 Map */}
      <div className="max-w-5xl mx-auto">
        {selectedDistrict && <BangladeshMap selectedDistrict={selectedDistrict} />}
      </div>
    </div>
  );
};

export default Coverage;
