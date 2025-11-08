import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import React from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useGetBillingList } from "./queries/getRequests";
import { DataTable } from "@/components/ui/data-table";
import { billingColumns } from "./utils/columns";
import { Spinner } from "@/components/ui/spinner";

export default function Management() {
  // ============= HOOKS & STATES =============

  const [search, setSearch] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);

  const debouncedSearch = useDebounce(search, 300);
  const debouncedPageSize = useDebounce(pageSize, 100);

  const { data: billing, isLoading } = useGetBillingList(
    currentPage,
    debouncedPageSize,
    debouncedSearch
  );

  const data = billing?.results || [];
  const totalCount = billing?.count || 0;

  // ============= RENDER =============
  return (
    <div className="w-full h-full flex flex-col items-center-safe px-10">
      <header className="w-full mb-6 border-l-3 border-primary px-5">
        <Label className="text-xl">Billing</Label>
        <Label className="text-sm font-normal">Manage billing records</Label>
      </header>
      <div className="w-full grid grid-cols-4 gap-4 mb-8"></div>
      <div className="w-full flex justify-between mb-8">
        <Input
          className="max-w-sm"
          placeholder="Search billing by patient..."
        />
      </div>
      {!isLoading && data?.length == 0 && (
        <div className="w-full flex justify-center items-center text-prim">
          No results
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center mt-10">
          <div className="flex flex-col items-center-safe gap-4">
            <Spinner size="lg" />
            <p>Please wait while we're fetching billing records...</p>
          </div>
        </div>
      )}

      {data?.length > 0 && (
        <DataTable
          columns={billingColumns}
          data={data}
          headerClassName="border-y h-14"
          cellClassName="h-15"
        />
      )}
    </div>
  );
}
