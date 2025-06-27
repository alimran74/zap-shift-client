import { useState } from "react";
import useAxiosSecure from "./useAxiosSecure"; // make sure the path is correct
import toast from "react-hot-toast";

const useTrackUpdater = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const addTrackingUpdate = async ({ parcelId, status, location, note = "" }) => {
    if (!parcelId || !status || !location) {
      toast.error("🚫 Parcel ID, status, and location are required.");
      return false;
    }

    setLoading(true);
    try {
      const response = await axiosSecure.post("/trackings", {
        parcelId,
        status,
        location,
        note,
        timestamp: new Date().toISOString(),
      });

      if (response.data?.success) {
        toast.success("✅ Tracking update added successfully");
        return true;
      } else {
        toast.error(response.data?.message || "Failed to add tracking update");
        return false;
      }
    } catch (error) {
      console.error("❌ Tracking update failed:", error.message);
      toast.error("Something went wrong while adding tracking update");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addTrackingUpdate, loading };
};

export default useTrackUpdater;
