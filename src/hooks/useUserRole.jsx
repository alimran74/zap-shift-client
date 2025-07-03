import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: roleData,
    isLoading: roleLoading,
    error,
  } = useQuery({
    enabled: !!user?.email && !authLoading,
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role?email=${user.email}`);
      return res.data?.role || "user"; // fallback role
    },
  });

  return [roleData, roleLoading, error];
};

export default useUserRole;
