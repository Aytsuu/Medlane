import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export const useGetBillingList = (page: number, pageSize: number, search: string) => {
  return useQuery({
    queryKey: ['billing', page, pageSize, search],
    queryFn: async () => {
      try {
        const res = await api.get("api/billing/list/");
        return res.data
      } catch (err) {
        throw err;
      }
    },
    staleTime: 5000,
    retry: false
  })
}