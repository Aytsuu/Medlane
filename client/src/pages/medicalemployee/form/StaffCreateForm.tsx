import { FormInput } from '@/components/form/form-input'
import { FormSelect } from '@/components/form/form-select'
import { FormDateTime } from '@/components/form/form-date-time'
import type { UseFormReturn } from 'react-hook-form'
import type z from 'zod'
import type { staffSchema } from '@/pages/medicalemployee/utils/employee-schema'

const SEX_OPTIONS = [
  {id: "FEMALE", name: "FEMALE"},
  {id: "MALE", name: "MALE"}
]

const ROLES = [
  {id: "DOCTOR", name: "DOCTOR"},
  {id: "NURSE", name: "NURSE"},
  {id: "DENTIST", name: "DENTIST"},
  {id: "PSYCHIATRIST", name: "PSYCHIATRIST"},
  {id: "PHARMACIST", name: "PHARMACIST"},
]

export default function StaffCreateForm({form} : {
  form: UseFormReturn<z.infer<typeof staffSchema>>
}) {
  return (
    <>
      <FormInput control={form.control} name='staff_lname' label='Last Name' placeholder='Enter Last Name' upper={true}/>
      <FormInput control={form.control} name='staff_fname' label='First Name' placeholder='Enter First Name' upper={true}/>
      <FormInput control={form.control} name='staff_mname' label='Middle Name' placeholder='Enter Middle Name (Optional)' upper={true}/>
      <FormSelect control={form.control} name='staff_sex' label='Sex' options={SEX_OPTIONS}/>
      <FormDateTime control={form.control} name='staff_dob' type='date' label='Date of Birth' /> 
      <FormSelect control={form.control} name='staff_pos' label='Role' options={ROLES}/>
    </>
  )
}