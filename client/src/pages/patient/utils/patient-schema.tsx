import { z } from 'zod'

export const profileSchema = z.object({
  pat_lname: z.string().min(1, "This field is required"),
  pat_fname: z.string().min(1, "This field is required"),
  pat_mname: z.string(),
  pat_sex: z.string().min(1, "This field is required"),
  pat_dob: z.string().min(1, "Select birthdate")
})