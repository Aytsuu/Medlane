import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query"

export const useGetStaffs = (page: number, pageSize: number, search: string) => {
  return useQuery({
    queryKey: ['staffs', page, pageSize, search],
    queryFn: async () => {
      try {
        const res = await api.get('api/medicalemployee/list/table/', {
          params: {
            page,
            page_size: pageSize,
            search
          }
        });
        
        return res.data
      } catch (err) {
        throw err;
      }
    },
    staleTime: 5000,
    retry: false
  })
}

export const useSearchStaff = (search: string) => {
  return useQuery({
    queryKey: ['searchedStaffs', search],
    queryFn: async () => {
      try {
        const res = await api.get('api/medicalemployee/search/', {
          params: {
            search
          }
        })
        return res.data;
      } catch (err) {
        throw err;
      }
    },
    staleTime: 5000
  })
}