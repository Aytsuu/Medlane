import { FormInput } from '@/components/form/form-input'
import { FormSelect } from '@/components/form/form-select'
import { FormDateTime } from '@/components/form/form-date-time'
import type { profileSchema } from '@/pages/patient/utils/patient-schema'
import type { UseFormReturn } from 'react-hook-form'
import type z from 'zod'

const SEX_OPTIONS = [
  {id: "FEMALE", name: "FEMALE"},
  {id: "MALE", name: "MALE"}
]

export default function PatientCreateForm({form} : {
  form: UseFormReturn<z.infer<typeof profileSchema>>
}) {
  return (
    <>
      <FormInput control={form.control} name='pat_lname' label='Last Name' placeholder='Enter Last Name' upper={true}/>
      <FormInput control={form.control} name='pat_fname' label='First Name' placeholder='Enter First Name' upper={true}/>
      <FormInput control={form.control} name='pat_mname' label='Middle Name' placeholder='Enter Middle Name (Optional)' upper={true}/>
      <FormSelect control={form.control} name='pat_sex' label='Sex' options={SEX_OPTIONS}/>
      <FormDateTime control={form.control} name='pat_dob' type='date' label='Date of Birth' /> 
    </>
  )
}