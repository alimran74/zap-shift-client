import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid"; // ✅ for parcelId
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";

const SendParcel = () => {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [warehouseData, setWarehouseData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [senderCenters, setSenderCenters] = useState([]);
  const [receiverCenters, setReceiverCenters] = useState([]);

  const type = watch("type");
  const weight = watch("weight");
  const senderDistrict = watch("senderRegion");
  const receiverDistrict = watch("receiverRegion");

  useEffect(() => {
    fetch("/Warehouse.json")
      .then((res) => res.json())
      .then((data) => {
        setWarehouseData(data);
        const uniqueDistricts = [...new Set(data.map((item) => item.district))];
        setDistricts(uniqueDistricts);
      })
      .catch((err) => console.error("Failed to load warehouse data", err));
  }, []);

  useEffect(() => {
    const found = warehouseData.find((item) => item.district === senderDistrict);
    setSenderCenters(found?.covered_area || []);
  }, [senderDistrict, warehouseData]);

  useEffect(() => {
    const found = warehouseData.find((item) => item.district === receiverDistrict);
    setReceiverCenters(found?.covered_area || []);
  }, [receiverDistrict, warehouseData]);

  useEffect(() => {
    setValue("senderName", user?.displayName || user?.email || "Anonymous");
  }, [user, setValue]);

  const onSubmit = (data) => {
    const weightNum = parseFloat(weight) || 0;
    const withinCity = senderDistrict === receiverDistrict;

    let baseCost = 0;
    let extraCost = 0;
    let breakdown = "";

    if (type === "document") {
      baseCost = withinCity ? 60 : 80;
      breakdown = `📄 Document Delivery<br/>📍 ${withinCity ? "Within City" : "Outside City"}<br/>💰 Base Cost: ৳${baseCost}`;
    } else {
      if (weightNum <= 3) {
        baseCost = withinCity ? 110 : 150;
        breakdown = `📦 Non-Document (≤3kg)<br/>📍 ${withinCity ? "Within City" : "Outside City"}<br/>💰 Base Cost: ৳${baseCost}`;
      } else {
        const extraWeight = weightNum - 3;
        baseCost = withinCity ? 110 : 150;
        extraCost = extraWeight * 40;
        if (!withinCity) extraCost += 40;
        breakdown = `📦 Non-Document (>3kg)<br/>📍 ${withinCity ? "Within City" : "Outside City"}<br/>
        💰 Base Cost: ৳${baseCost}<br/>
        🏋️‍♂️ Extra Weight (${extraWeight}kg × ৳40): ৳${extraWeight * 40}<br/>
        ${!withinCity ? "🚚 Outside District Extra: ৳40<br/>" : ""}
        ➕ Total Extra: ৳${extraCost}`;
      }
    }

    const total = baseCost + extraCost;

    

    Swal.fire({
      title: "📦 Confirm Parcel Submission",
      html: `
        <div style="text-align: left;">
          ${breakdown}
          <hr class="my-2"/>
          <strong>🧾 Total Delivery Cost: ৳${total}</strong>
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Confirm & Submit",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        const now = new Date();
        const parcelData = {
          ...data,
          parcelId: uuidv4(),
          cost: total,
          status: "Pending",
          isPaid: false,
          paymentMethod: "COD",
          deliveryType: "Regular",
          creation_date: now.toISOString(),
          creation_timestamp: now.getTime(),
          creation_date_local: now.toLocaleDateString("en-BD", { timeZone: "Asia/Dhaka" }),
          creation_time_local: now.toLocaleTimeString("en-BD", { timeZone: "Asia/Dhaka" }),
          userEmail: user?.email || "anonymous@example.com",
        };

        console.log("📬 Parcel Saved:", parcelData);

        axiosSecure.post('/parcels', parcelData)
        .then(res => {
          console.log(res.data);
          if(res.data.insertedId){
            Swal.fire("✅ Success", `Parcel submitted! 🚚<br/>Tracking ID: <b>${parcelData.parcelId}</b>`, "success");
          };
          navigate('/dashboard/myParcels')
        })

        
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow rounded-lg mt-10 mb-10">
      <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">📦 Add Parcel</h2>
      <p className="text-center text-gray-600 mb-6">Fill out the form to send your parcel.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Parcel Info</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <select {...register("type")} className="select select-bordered w-full" defaultValue="document">
              <option value="document">Document</option>
              <option value="non-document">Non-Document</option>
            </select>
            <input {...register("title", { required: true })} placeholder="Parcel Title" className="input input-bordered w-full" />
            {type === "non-document" && (
              <input type="number" {...register("weight", { min: 0 })} placeholder="Weight (kg)" className="input input-bordered w-full" />
            )}
          </div>
        </div>

        {/* Sender Info */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Sender Info</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <input {...register("senderName")} readOnly className="input text-black input-bordered w-full bg-gray-100" />
            <input {...register("senderContact", { required: true })} placeholder="Contact" className="input input-bordered w-full" />
            <input {...register("senderRegion", { required: true })} list="senderDistricts" placeholder="Sender District" className="input input-bordered w-full" />
            <datalist id="senderDistricts">{districts.map((d, i) => <option key={i} value={d} />)}</datalist>
            <select {...register("senderCenter", { required: true })} className="select select-bordered w-full">
              <option value="">Select Service Center</option>
              {senderCenters.map((center, i) => <option key={i} value={center}>{center}</option>)}
            </select>
            <input {...register("senderAddress", { required: true })} placeholder="Address" className="input input-bordered w-full" />
            <input {...register("senderInstruction")} placeholder="Pickup Instruction" className="input input-bordered w-full" />
          </div>
        </div>

        {/* Receiver Info */}
        <div>
          <h3 className="text-xl font-semibold mb-2 text-gray-700">Receiver Info</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <input {...register("receiverName", { required: true })} placeholder="Receiver Name" className="input input-bordered w-full" />
            <input {...register("receiverContact", { required: true })} placeholder="Contact" className="input input-bordered w-full" />
            <input {...register("receiverRegion", { required: true })} list="receiverDistricts" placeholder="Receiver District" className="input input-bordered w-full" />
            <datalist id="receiverDistricts">{districts.map((d, i) => <option key={i} value={d} />)}</datalist>
            <select {...register("receiverCenter", { required: true })} className="select select-bordered w-full">
              <option value="">Select Service Center</option>
              {receiverCenters.map((center, i) => <option key={i} value={center}>{center}</option>)}
            </select>
            <input {...register("receiverAddress", { required: true })} placeholder="Address" className="input input-bordered w-full" />
            <input {...register("receiverInstruction")} placeholder="Delivery Instruction" className="input input-bordered w-full" />
          </div>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button type="submit" className="btn bg-[#CAEB66] rounded text-black w-48">Submit Parcel</button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
