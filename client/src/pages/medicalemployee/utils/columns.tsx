import type { ColumnDef } from "@tanstack/react-table";
import type { StaffRecord } from "./types";

export const staffColumns: ColumnDef<StaffRecord>[] = [
  {
    accessorKey: "staff_id",
    header: "Staff ID"
  },
  {
    accessorKey: "staff_lname",
    header: "Last Name"
  },
  {
    accessorKey: "staff_fname",
    header: "First Name"
  },
  {
    accessorKey: "staff_mname",
    header: "Middle Name"
  },
  {
    accessorKey: "staff_sex",
    header: "Sex"
  },
  {
    accessorKey: "staff_age",
    header: "Age"
  },
  {
    accessorKey: "staff_dob",
    header: "Birthdate"
  },
  {
    accessorKey: "staff_pos",
    header: "Role"
  },
  {
    accessorKey: "staff_created_at",
    header: "Registered"
  },
]