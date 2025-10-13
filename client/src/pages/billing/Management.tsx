;
import { Button } from "@/components/ui/button";
import { CalendarPlus, Check } from "lucide-react";
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
import { staffSchema } from "@/pages/medicalemployee/utils/employee-schema";

export default function Management() {
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

  // ============= HANDLERS =============
  const submit = async () => {
    if (!(await form.trigger())) {
      return;
    }

    const processing = showLoadingToast("Creating...");
    setOpenDialog(false);
    try {
      const values = form.getValues();

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
      <header className="w-full mb-6 border-l-3 border-primary px-5">
        <Label className="text-xl">Billing</Label>
        <Label className="text-sm font-normal">
          Manage billing records
        </Label>
      </header>
      <div className="w-full grid grid-cols-4 gap-4 mb-8">
      </div>
      <div className="w-full flex justify-between mb-8">
        <div className="w-full flex gap-3">
          <Input className="max-w-sm" placeholder="Search billing by patient..." />
        </div>
      </div>

    </div>
  );
}
