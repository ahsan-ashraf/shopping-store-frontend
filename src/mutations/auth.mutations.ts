import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth-api";
import { TanstackKeys } from "../_tanstackKeys/tanstack-keys";

export const useLoginMutation = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [TanstackKeys.getMe] });
    },
  });
};

export const useLogoutMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      qc.removeQueries({ queryKey: [TanstackKeys.getMe] });
    },
  });
};
