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

export default function Schedule() {
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
        <Label className="text-xl">Scheduled Appointments</Label>
        <Label className="text-sm font-normal">
          Manage appointments and available schedules
        </Label>
      </header>
      <div className="w-full grid grid-cols-4 gap-4 mb-8">
        {/* {ageGroupCards.map((item, index) => (
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
        ))} */}
      </div>
      <div className="w-full flex justify-between mb-8">
        <div className="w-full flex gap-3">
          <Input className="max-w-sm" placeholder="Search appointment by patient or doctor's name..." />
          <Button className="cursor-pointer" type="button"
            onClick={() => setOpenDialog(true)}
          >
            <CalendarPlus />
            Schedule an Appointment
          </Button>
          <DialogLayout
            isOpen={openDialog}
            onOpenChange={() => setOpenDialog((prev) => !prev)}
            title="Appointment Form"
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

    </div>
  );
}
