import { Label } from "@/components/ui/label";

export default function Dashboard() {
  // ============= HOOKS & STATES =============
  

  // ============= HANDLERS =============

  // ============= RENDER =============
  return (
    <div className="w-full h-full flex flex-col items-center-safe px-10">
      <header className="w-full mb-6 border-l-3 border-primary px-5">
        <Label className="text-xl">Dashboard</Label>
        <Label className="text-sm font-normal">
          Overview of analytics and summaries of all records
        </Label>
      </header>
      <div className="w-full grid grid-cols-4 gap-4 mb-8">
      </div>
      <div className="w-full flex justify-between mb-8">
        
      </div>

    </div>
  );
}
