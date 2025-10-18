import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query"

export const useGetAppointments = (page: number, pageSize: number = 10, search: string) => {
  return useQuery({
    queryKey: ['appointments', page, pageSize, search],
    queryFn: async () => {
      try {
        const res = await api.get('api/appointment/list/', {
          params: {
            page,
            page_size: pageSize,
            search
          }
        })
        return res.data
      } catch (err) {
        throw err;
      }
    },
    staleTime: 5000
  })
}