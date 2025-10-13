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
import { profileSchema } from "@/pages/patient/utils/patient-schema";
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
import { calculateAge } from "@/helpers/calculateAge";

const AGE_DESCRIPTION: any = {
  Children: "0 - 14 years",
  Youth: "15 - 24 years",
  Adult: "25 - 64 years",
  Senior: "65 years and over"
}

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
  const groupedAge = data?.reduce((acc: Record<string, any>, patient: Record<string, any>) => {
    const age = +calculateAge(patient.pat_dob);
    if(age <= 14) acc['Children'] += 1
    else if (age <= 24) acc['Youth'] += 1
    else if (age <= 64) acc['Adult'] += 1
    else acc['Senior'] += 1
    return acc
  }, { Children: 0, Youth: 0, Adult: 0, Senior: 0})
  const totalCount = patients?.count || 0;
  const totalPageSize = Math.ceil(totalCount / pageSize);

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
        {Object.entries(groupedAge).map(([key, val], index) => (
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
                {key}
              </CardTitle>
              <CardDescription className="text-black/60">
                {AGE_DESCRIPTION[key]}
              </CardDescription>
            </CardHeader>
            <CardContent className="w-2/3 flex items-center justify-center relative z-10 gap-2">
              <UserRound className="text-primary" />
              <Label
                className="text-3xl font-bold"
                style={{ color: "oklch(0.645 0.246 16.439)" }}
              >
                {String(val)}
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
