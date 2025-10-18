import { api } from "@/api/api";
import { useQuery } from "@tanstack/react-query"

export const useGetPatients = (page: number, pageSize: number, search: string) => {
  return useQuery({
    queryKey: ['patients', page, pageSize, search],
    queryFn: async () => {
      try {
        const res = await api.get('api/patient/list/table/', {
          params: {
            page,
            page_size: pageSize,
            search
          }
        });
        return res.data;
      } catch (err) {
        throw err;
      }
    },
    staleTime: 5000
  })
}

export const useSearchPatient = (search: string) => {
  return useQuery({
    queryKey: ['searchedPatients', search],
    queryFn: async () => {
      try {
        const res = await api.get('api/patient/search/', {
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