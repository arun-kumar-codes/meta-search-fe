import { type HTMLAttributes } from "react"

export type BadgeVariant = "default" | "primary" | "success" | "error" | "agency"

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-muted text-foreground",
  primary: "bg-primary text-primary-foreground",
  success: "bg-green-500 text-white",
  error: "bg-[#ED264D] text-white",
  agency: "bg-[#ED264D] text-white",
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export default function Badge({ variant = "default", className = "", ...props }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
