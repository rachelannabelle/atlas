import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Filter out Figma Make internal props (_fg*) that leak through
 * Radix Slot chains onto DOM elements.
 */
export function filterFigmaProps<T extends Record<string, unknown>>(props: T): T {
  const filtered: Record<string, unknown> = {};
  for (const key in props) {
    if (!key.startsWith("_fg") && !key.startsWith("_FG")) {
      filtered[key] = props[key];
    }
  }
  return filtered as T;
}
