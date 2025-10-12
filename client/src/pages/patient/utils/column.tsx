import type { ColumnDef } from "@tanstack/react-table";
import type { PatientProfile } from "./types";
import { formatDate } from "@/helpers/date";
import { calculateAge } from "@/helpers/calculateAge";

export const profileColumns: ColumnDef<PatientProfile>[] = [
  {
    accessorKey: "pat_id",
    header: "Patient ID"
  },
  {
    accessorKey: "pat_lname",
    header: "Last Name"
  },
  {
    accessorKey: "pat_fname",
    header: "First Name"
  },
  {
    accessorKey: "pat_mname",
    header: "Middle Name"
  },
  {
    accessorKey: "pat_sex",
    header: "Sex"
  },
  {
    accessorKey: "age",
    header: "Age",
    cell: ({ row }) => (
      calculateAge(row.original.pat_dob)
    )
  },
  {
    accessorKey: "pat_dob",
    header: "Birthdate",
    cell: ({ row }) => (
      formatDate(row.original.pat_dob, "short")
    )
  },
]