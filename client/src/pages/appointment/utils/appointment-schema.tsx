import z from "zod";

export const appointmentSchema = z.object({
  app_date: z.string(),
  app_start_time: z.string(),
  app_end_time: z.string(),
  app_room: z.string(),
  pat: z.object({}),
  staff: z.object({}),
})