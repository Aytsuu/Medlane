import { api } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useAddStaff = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Record<string, any>) => {
      try {
        const res = await api.post("medicalemployee/add/", data);
        return res.data;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['staffs']})
    }
  })
}