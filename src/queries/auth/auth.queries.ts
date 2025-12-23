import { useQuery } from "@tanstack/react-query";
import { authApi } from "../../api/auth-api";
import { TanstackKeys } from "../../_tanstackKeys/tanstack-keys";

export const useMeQuery = () => {
  return useQuery({
    queryKey: [TanstackKeys.getMe],
    queryFn: authApi.getMe,
    retry: false,
  });
};
