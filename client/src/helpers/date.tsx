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

interface TimeAgoOptions {
  detailed?: boolean;
  includeWeeks?: boolean;
}

export const formatTimeAgo = (
  timestamp: string | Date, 
  options: TimeAgoOptions = {}
): string => {
  const { detailed = false, includeWeeks = false } = options;
  
  if (!timestamp) return 'Unknown';
  
  const now = new Date();
  const past = new Date(timestamp);
  const diffInMs = now.getTime() - past.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  
  // Just now
  if (diffInSeconds < 10) {
    return detailed ? 'Just now' : 'Now';
  }
  
  // Seconds
  if (diffInSeconds < 60) {
    if (detailed) {
      return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
    }
    return `${diffInSeconds}s ago`;
  }
  
  // Minutes
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    if (detailed) {
      return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
    }
    return `${diffInMinutes}m ago`;
  }
  
  // Hours
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    if (detailed) {
      return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
    }
    return `${diffInHours}h ago`;
  }
  
  // Days
  const diffInDays = Math.floor(diffInHours / 24);
  if (!includeWeeks || diffInDays < 7) {
    if (detailed) {
      return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
    }
    return `${diffInDays}d ago`;
  }
  
  // Weeks (optional)
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    if (detailed) {
      return `${diffInWeeks} week${diffInWeeks !== 1 ? 's' : ''} ago`;
    }
    return `${diffInWeeks}w ago`;
  }
  
  // Months
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    if (detailed) {
      return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''} ago`;
    }
    return `${diffInMonths}mo ago`;
  }
  
  // Years
  const diffInYears = Math.floor(diffInDays / 365);
  if (detailed) {
    return `${diffInYears} year${diffInYears !== 1 ? 's' : ''} ago`;
  }
  return `${diffInYears}y ago`;
};

export function formatTime12Hour(time24: string): string {
  // time24 format: "05:42:00" or "17:30:00"
  const [hours, minutes] = time24.split(':');
  const hour = parseInt(hours, 10);
  const minute = minutes.padStart(2, '0');
  
  const period = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12; // Convert 0 to 12
  
  return `${hour12}:${minute} ${period}`;
}