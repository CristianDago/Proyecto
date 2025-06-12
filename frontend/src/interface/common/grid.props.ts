import { ReactNode } from "react";

export default interface GridProps {
  children: ReactNode;
  justifyContent?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around";
  alignItems?: "flex-start" | "center" | "flex-end" | "stretch";
  gap?: string;
  rows?: string;
  columns?: string; // Custom columns via inline style
  className?: string; // Allows for external CSS classes
}
