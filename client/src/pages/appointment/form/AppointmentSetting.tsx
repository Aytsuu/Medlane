import type { UseFormReturn } from "react-hook-form";
import type z from "zod";
import type { appointmentSchema } from "../utils/appointment-schema";
import { FormDateTime } from "@/components/form/form-date-time";
import { FormSelect } from "@/components/form/form-select";
import { Combobox } from "@/components/ui/combobox";
import React from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchPatient } from "@/pages/patient/queries/getRequest";
import { formatPatients, formatStaffs } from "../utils/formatting";
import { useSearchStaff } from "@/pages/medicalemployee/queries/getRequests";
import { Label } from "@/components/ui/label";

export default function AppointmentSetting({
  form,
}: {
  form: UseFormReturn<z.infer<typeof appointmentSchema>>;
}) {
  const [searchPatient, setSearchPatient] = React.useState<string>("");
  const [searchStaff, setSearchStaff] = React.useState<string>("");
  const debouncedSearchPatient = useDebounce(searchPatient, 300);
  const debouncedSearchStaff = useDebounce(searchStaff, 300);
  const { data: searchedPatients, isLoading: isLoadingPatients } =
    useSearchPatient(debouncedSearchPatient);
  const { data: searchedStaffs, isLoading: isLoadingStaffs } =
    useSearchStaff(debouncedSearchStaff);

  const formattedPatients = formatPatients(searchedPatients);
  const formattedStaffs = formatStaffs(searchedStaffs);

  const pat = form.watch("pat");
  const staff = form.watch("staff");

  React.useEffect(() => {
    if (staff) {
      setSearchStaff(staff.value);
    }

    if (pat) {
      setSearchPatient(pat.value);
    }
  }, [staff, pat]);

  return (
    <>
      <div>
        <Label className="text-black/70 mb-2">Patient</Label>
        <Combobox
          list={formattedPatients}
          value={pat.label}
          onChange={(item) => form.setValue("pat", item as any)}
          onSearchChange={(value) => setSearchPatient(value)}
          searchPlaceholder="Search patient by name"
        />
      </div>

      <div>
        <Label className="text-black/70 mb-2">Medical Specialist</Label>
        <Combobox
          list={formattedStaffs}
          value={staff.label}
          onChange={(item) => form.setValue("staff", item as any)}
          onSearchChange={(value) => setSearchStaff(value)}
          searchPlaceholder="Search staff by name"
        />
      </div>

      <FormDateTime
        control={form.control}
        name="app_date"
        type="date"
        label="Select Date"
      />
      <FormDateTime
        control={form.control}
        name="app_start_time"
        type="time"
        label="Start Time"
      />
      <FormDateTime
        control={form.control}
        name="app_end_time"
        type="time"
        label="End Time"
      />
      <FormSelect
        control={form.control}
        name="app_room"
        label="Room"
        options={[
          { id: "1", name: "Room 1" },
          { id: "2", name: "Room 2" },
          { id: "3", name: "Room 3" },
          { id: "4", name: "Room 4" },
          { id: "5", name: "Room 5" },
        ]}
      />
    </>
  );
}
