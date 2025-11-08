import type { ColumnDef } from "@tanstack/react-table";
import type { BillingRecord } from "./types";
import { formatDate } from "@/helpers/date";
import { formatCurrency } from "@/helpers/currencyFormat";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export const billingColumns: ColumnDef<BillingRecord>[] = [
  {
    accessorKey: 'bill_id',
    header: 'Billing No.'
  }, 
  {
    accessorKey: 'app',
    header: 'Appointment',
    cell: ({ row }) => (
      `APPOINTMENT #${row.original.app}`
    )
  },
  {
    accessorKey: 'bill_created_at',
    header: 'Date',
    cell: ({ row }) => (
      formatDate(row.original.bill_created_at, 'long')
    )
  },
  {
    accessorKey: 'bill_amount',
    header: 'Amount',
    cell: ({ row }) => (
      formatCurrency(row.original.bill_amount)
    )
  },
  {
    accessorKey: 'bill_status',
    header: 'Status',
    cell: ({ row }) => {
      const status_color: any = {
        PAID: 'bg-green-50 border-green-300 text-green-700 hover:bg-green-50',
        UNPAID: 'bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-50'
      }

      const status = row.original.bill_status
      return (
        <Badge className={`rounded-full border ${status_color[status]}`}>
          {status}
        </Badge>
      )
    }
  },
  {
    accessorKey: 'invoice',
    header: 'Invoice',
    cell: () => (<Button variant={"outline"} className="cursor-pointer"><Download/></Button>)
  }
]