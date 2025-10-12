import { z } from 'zod'

export const staffSchema = z.object({
  staff_lname: z.string().min(1, "This field is required"),
  staff_fname: z.string().min(1, "This field is required"),
  staff_mname: z.string(),
  staff_sex: z.string().min(1, "This field is required"),
  staff_dob: z.string().min(1, "Select birthdate"),
  staff_pos: z.string().min(1, "Select a role"),
})