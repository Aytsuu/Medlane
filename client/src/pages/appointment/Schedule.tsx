import { Button } from "@/components/ui/button";
import { Calendar, CalendarPlus, Check, Clock, Home, User } from "lucide-react";
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
import { appointmentSchema } from "./utils/appointment-schema";
import AppointmentSetting from "./form/AppointmentSetting";
import { useCreateAppointment } from "./queries/postRequests";
import { useGetAppointments } from "./queries/getRequests";
import { Card } from "@/components/ui/card";
import { formatDate, formatTime12Hour, formatTimeAgo } from "@/helpers/date";
import { Spinner } from "@/components/ui/spinner";

export default function Schedule() {
  // ============= HOOKS & STATES =============
  const form = useForm<z.infer<typeof appointmentSchema>>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: generateDefaultValues(appointmentSchema),
  });

  const [isSubmitting, setIsSubmitting] = React.useState<boolean>(false);
  const [search, setSearch] = React.useState<string>("");
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const debouncedSearch = useDebounce(search, 300);
  const debouncedPageSize = useDebounce(pageSize, 100);

  const { mutateAsync: createAppointment } = useCreateAppointment();
  const { data: appointments, isLoading } = useGetAppointments(
    currentPage,
    debouncedPageSize,
    debouncedSearch
  );

  const data = appointments?.results || [];
  const totalCount = appointments?.count || 0;
  const totalPageSize = Math.ceil(totalCount / pageSize);

  console.log(data);

  // ============= HANDLERS =============
  const submit = async () => {
    if (!(await form.trigger())) {
      return;
    }

    const processing = showLoadingToast("Creating...");
    setOpenDialog(false);
    try {
      const values = form.getValues();
      const { pat, staff, ...restVal } = values;
      await createAppointment({
        ...restVal,
        pat: pat.value,
        staff: staff.value,
      });

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
        <Label className="text-xl">Scheduled Appointments</Label>
        <Label className="text-sm font-normal">
          Manage appointments and available schedules
        </Label>
      </header>
      <div className="w-full flex justify-between mb-8">
        <div className="w-full flex gap-3">
          <Input
            className="max-w-sm"
            placeholder="Search appointment by patient or doctor's name..."
          />
          <Button
            className="cursor-pointer"
            type="button"
            onClick={() => setOpenDialog(true)}
          >
            <CalendarPlus />
            Set an Appointment
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
                  <AppointmentSetting form={form} />
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

      {isLoading && (
        <div className="flex justify-center mt-10">
          <div className="flex flex-col items-center-safe gap-4">
            <Spinner size="lg" />
            <p>Please wait while we're fetching appointment records...</p>
          </div>
        </div>
      )}

      <main className="w-full flex gap-6">
        {data?.map((appointment: Record<string, any>) => (
          <Card className="p-4 flex flex-col justify-between hover:shadow-md transition-shadow w-full max-w-[320px]">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Appointment #{appointment.app_id}
                  </p>
                  <h3 className="font-semibold text-md">
                    {appointment.patient.name}
                  </h3>
                </div>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    appointment.app_status === "SCHEDULED"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {appointment.app_status}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-foreground">
                    {formatDate(appointment.app_date, "long")}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span className="text-foreground">
                    {formatTime12Hour(appointment.app_start_time)} -{" "}
                    {formatTime12Hour(appointment.app_end_time)}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Home className="w-4 h-4" />
                  <span className="text-foreground">
                    Room {appointment.app_room}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span className="text-foreground">
                    {appointment.staff.name} ({appointment.staff.role})
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t text-xs text-muted-foreground text-right">
              Created {formatTimeAgo(appointment.app_created_at)}
            </div>
          </Card>
        ))}
      </main>
    </div>
  );
}
