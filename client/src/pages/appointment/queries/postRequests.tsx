import { api } from "@/api/api";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateAppointment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: Record<string, any>) => {
      try {
        const res = await api.post('api/appointment/create/', data);
        return res.data
      } catch (err) {
        console.error(err)
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments']})
      queryClient.invalidateQueries({ queryKey: ['billing']})
    }
  })
}