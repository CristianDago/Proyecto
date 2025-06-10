// src/hooks/useFormatDateForInput.ts
import { DateTime } from "luxon";

export const useFormatDateForInput = () => {
  const formatDateForInput = (date: string | Date | undefined): string => {
    if (!date) return "";

    if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }

    if (date instanceof Date) {
      return DateTime.fromJSDate(date).toFormat("yyyy-MM-dd");
    }

    if (DateTime.fromISO(date as string).isValid) {
      return DateTime.fromISO(date as string).toFormat("yyyy-MM-dd");
    }

    return "";
  };

  return { formatDateForInput };
};
