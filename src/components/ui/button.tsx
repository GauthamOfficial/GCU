import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-300 ease-out cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive relative border-2 transform hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground border-primary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_4px_8px_rgba(0,0,0,0.3)] hover:border-primary/80 active:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.2)]",
        destructive:
          "bg-destructive text-white border-destructive shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.2)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_4px_8px_rgba(0,0,0,0.3)] hover:border-destructive/80 active:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.2)] focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-2 bg-white border-white text-black shadow-[inset_0_1px_0_0_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.2)] hover:bg-white/90 hover:border-white/80 hover:shadow-[inset_0_1px_0_0_rgba(0,0,0,0.15),0_4px_8px_rgba(0,0,0,0.3)] active:shadow-[inset_0_1px_0_0_rgba(0,0,0,0.05),0_1px_2px_rgba(0,0,0,0.2)] dark:bg-white dark:border-white dark:text-black dark:hover:bg-white/90",
        secondary:
          "bg-secondary text-secondary-foreground border-secondary shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_2px_4px_rgba(0,0,0,0.15)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_4px_6px_rgba(0,0,0,0.2)] hover:border-secondary/80 active:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.15)]",
        ghost:
          "border-transparent hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-sm dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline border-transparent transform-none hover:scale-100 hover:translate-y-0",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
