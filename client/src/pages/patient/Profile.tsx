import { DataTable } from "@/components/ui/data-table";
import { profileColumns } from "./utils/column";
import { Button } from "@/components/ui/button";
import { Check, Plus, UserRound } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DialogLayout from "@/components/layout/dialog-layout";
import PatientCreateForm from "./form/PatientCreateForm";
import { profileSchema } from "@/schema/patient-schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { generateDefaultValues } from "@/helpers/generateDefault";
import { Form } from "@/components/ui/form";
import React from "react";
import { useAddPatient } from "./queries/postRequest";
import { useGetPatients } from "./queries/getRequest";
import { useDebounce } from "@/hooks/use-debounce";
import {
  showErrorToast,
  showLoadingToast,
  showSuccessToast,
} from "@/components/ui/toast";
import { toast } from "sonner";

export default function Profile() {
  // ============= HOOKS & STATES =============
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: generateDefaultValues(profileSchema),
  });

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false)
  const { mutateAsync: addPatient } = useAddPatient();

  const debouncedSearch = useDebounce(search, 300);
  const debouncedPageSize = useDebounce(pageSize, 100);
  const { data: patients, isLoading } = useGetPatients(
    currentPage,
    debouncedPageSize,
    debouncedSearch
  );

  const data = patients?.results || [];
  const totalCount = patients?.count || 0;
  const totalPageSize = Math.ceil(totalCount / pageSize);

  const ageGroupCards = [
    {
      group: "Children",
      description: "0 - 14 years",
      total: "0",
    },
    {
      group: "Youth",
      description: "15 - 24 years",
      total: "0",
    },
    {
      group: "Adult",
      description: "25 - 64 years",
      total: "0",
    },
    {
      group: "Senior",
      description: "65 years and over",
      total: "0",
    },
  ];

  // ============= HANDLERS =============
  const submit = async () => {
    if (!(await form.trigger())) {
      return;
    }

    const processing = showLoadingToast("Creating...");
    setOpenDialog(false);
    try {
      const values = form.getValues();
      await addPatient(values);
      showSuccessToast("Record added successfully!");
      form.reset();
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
        <Label className="text-xl">Patient Profile</Label>
        <Label className="text-sm font-normal">
          Record of patients' profile
        </Label>
      </header>
      <div className="w-full grid grid-cols-4 gap-4 mb-8">
        {ageGroupCards.map((item, index) => (
          <Card
            key={index}
            className="flex-row border-1 relative overflow-hidden"
            style={{
              borderColor: "oklch(0.645 0.246 16.439)",
              background:
                "linear-gradient(135deg, oklch(0.645 0.246 16.439 / 0.08) 0%, oklch(0.645 0.246 16.439 / 0.02) 100%)",
            }}
          >
            <CardHeader className="w-full relative z-10">
              <CardTitle style={{ color: "oklch(0.645 0.246 16.439)" }}>
                {item.group}
              </CardTitle>
              <CardDescription className="text-black/60">
                {item.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="w-2/3 flex items-center justify-center relative z-10 gap-2">
              <UserRound className="text-primary" />
              <Label
                className="text-3xl font-bold"
                style={{ color: "oklch(0.645 0.246 16.439)" }}
              >
                {item.total}
              </Label>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="w-full flex justify-between mb-8">
        <div className="w-full flex gap-3">
          <Input className="max-w-sm" placeholder="Search patient by name..." />
          <Button className="cursor-pointer" type="button"
            onClick={() => setOpenDialog(true)}
          >
            <Plus />
            New Patient
          </Button>
          <DialogLayout
            isOpen={openDialog}
            onOpenChange={() => setOpenDialog((prev) => !prev)}
            title="Patient Profile Form"
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
                  <PatientCreateForm form={form} />
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

      {data?.length > 0 && (
        <DataTable
          columns={profileColumns}
          data={data}
          headerClassName="border-y h-14"
          cellClassName="h-15"
        />
      )}
    </div>
  );
}
