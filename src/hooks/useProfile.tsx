import authServices from "@/service/auth.service";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook untuk mengambil profile user
 */
const useProfile = () => {
  // Query function untuk fetch profile
  const fetchProfile = async () => {
    const { data } = await authServices.getProfile();
    return data.data;
  };

  const {
    data: dataProfile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["Profile"],
    queryFn: fetchProfile,
    // Hanya jalan di client-side
    enabled: typeof window !== "undefined",
  });

  return {
    dataProfile,
    isLoading,
    isError,
  };
};

export default useProfile;
