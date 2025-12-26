import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function convertToHourMinuteString(hours: number) {
  const wholeHours = Math.floor(hours);
  const fractionalPart = hours - wholeHours;
  const minutes = Math.round(fractionalPart * 60);

  return `${wholeHours}:${minutes < 10 ? '0' + minutes : minutes}`;
}

export function formatErrorToList(str: string[] | string) {
  if (typeof str === "string") {
    return (
      '<ul>' +
      '<li style="list-style: circle">' + str + '</li>' +
      '</ul>'
    )
  } else {
    return (
      '<ul>' +
      str.map(s => '<li style="list-style: circle">' + s + '</li>').join('') +
      '</ul>'
    )
  }
}

export function formatDate(date: Date | string, formatStr: string = 'yyyy-MM-dd'): string {
  // Basic date formatting - you can enhance this or use date-fns
  const d = typeof date === 'string' ? new Date(date) : date;
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return formatStr
    .replace('yyyy', String(year))
    .replace('MM', month)
    .replace('dd', day);
}

export function appendFormData(data: Record<string, any>): FormData {
  const formData = new FormData();
  
  for (const key in data) {
    if (['file', 'image', 'photo', 'classImage', 'certificate'].includes(key)) {
      if (data[key] && typeof data[key] === "object") {
        formData.append(key, data[key]);
      }
    } else {
      formData.append(key, data[key]);
    }
  }
  
  return formData;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
