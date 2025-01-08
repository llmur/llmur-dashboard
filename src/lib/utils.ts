import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertTimestampToDateTime(timestamp?: number): Date | null {
  if (timestamp === undefined || timestamp === null) {
    return null; // Return null if the timestamp is not provided
  }
  // Convert the seconds-based timestamp to milliseconds
  return new Date(timestamp * 1000);
}