import { DataTable } from "@/components/ui/data-table";;
import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import DialogLayout from "@/components/layout/dialog-layout";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateDefaultValues } from "@/helpers/generateDefault";
import { Form } from "@/components/ui/form";
import React from "react";
import { useDebounce } from "@/hooks/use-debounce";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "@/components/ui/toast";
import { toast } from "sonner";
import { staffColumns } from "./utils/columns";
import { useAddStaff } from "./queries/postRequests";
import { useGetStaffs } from "./queries/getRequests";
import StaffCreateForm from "./form/StaffCreateForm";
import { staffSchema } from "@/pages/medicalemployee/utils/employee-schema";
import { Spinner } from "@/components/ui/spinner";

export default function Employee() {
  // ============= HOOKS & STATES =============
  const form = useForm<z.infer<typeof staffSchema>>({
    resolver: zodResolver(staffSchema),
    defaultValues: generateDefaultValues(staffSchema),
  });

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false)

  const debouncedSearch = useDebounce(search, 300);
  const debouncedPageSize = useDebounce(pageSize, 100);
  const {mutateAsync: addStaff} = useAddStaff();
  const {data: staffs, isLoading} = useGetStaffs(currentPage, debouncedPageSize, debouncedSearch)

  const data = staffs?.results || [];
  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / pageSize)

  // ============= HANDLERS =============
  const submit = async () => {
    if (!(await form.trigger())) {
      return;
    }

    const processing = showLoadingToast("Creating...");
    setOpenDialog(false);
    try {
      const values = form.getValues();
      await addStaff(values);
      showSuccessToast("Record added successfully!");
      form.reset()
    } catch (err) {
      showErrorToast("Failed to create. Please try again.");
    } finally {
      toast.dismiss(processing);
    }
  };

  // ============= RENDER =============
  return (
    <div className="w-full h-full flex flex-col items-center-safe px-10">
      <header className="w-full mb-10 border-l-3 border-primary px-5">
        <Label className="text-xl">Staff Profile</Label>
        <Label className="text-sm font-normal">
          Record of staffs' profile and their role
        </Label>
      </header>
      <div className="w-full flex justify-between mb-8">
        <div className="w-full flex gap-3">
          <Input className="max-w-sm" placeholder="Search staff by name..." />
          <Button className="cursor-pointer" type="button"
            onClick={() => setOpenDialog(true)}
          >
            <Plus />
            New Staff
          </Button>
          <DialogLayout
            isOpen={openDialog}
            onOpenChange={() => setOpenDialog((prev) => !prev)}
            title="Staff Profile Form"
            description="Please fill out all required fields"
            mainContent={
              <Form {...form}>
                <form
                  className="grid gap-4 mt-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                  }}
                >
                  
                  <StaffCreateForm form={form} />
                  <div className="w-full flex justify-end-safe mt-4 mb-2">
                    <Button type="submit" className="cursor-pointer">
                      <Check />
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            }
          />
        </div>
      </div>

      {!isLoading && data?.length == 0 && (
        <div className="w-full flex justify-center items-center text-prim">
          No results
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center mt-10">
          <div className="flex flex-col items-center-safe gap-4">
            <Spinner size="lg"/>
            <p>Please wait while we're fetching staff records...</p>
          </div>
        </div>
      )}

      {data?.length > 0 && (
        <DataTable
          columns={staffColumns}
          data={data}
          headerClassName="border-y h-14"
          cellClassName="h-15"
        />
      )}
    </div>
  );
}
