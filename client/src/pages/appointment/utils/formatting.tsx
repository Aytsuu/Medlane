
export const formatPatients = (patients: any[]) => {
  if(!patients || patients.length == 0) return [];

  return patients.map((p: any) => ({
    value: p.pat_id,
    label: `${p.pat_lname}, ${p.pat_fname}`
  }))
}

export const formatStaffs = (staffs: any[]) => {
  if(!staffs || staffs.length == 0) return [];

  return staffs.map((s: any) => ({
    value: String(s.staff_id),
    label: `${s.staff_lname}, ${s.staff_fname}`
  }))
}