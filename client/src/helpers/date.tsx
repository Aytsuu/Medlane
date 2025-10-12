// Format date (YYYY-MM-DD) or (July 10, 2025)
export const formatDate = (date: string | Date, type?: string) => {
  if (!date) return null;
  const d = new Date(date);

  switch (type) {
    case 'short':
      return d.toLocaleDateString("en-PH", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    case 'long':
      return d.toLocaleDateString("en-PH", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    default:
      // Format YYYY-MM-DD in local time
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
  }
};