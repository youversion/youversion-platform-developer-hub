
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-white/70 dark:hover:bg-white/80",
        "filled-brand":
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        stroked:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        "filled-secondary":
          "bg-[#DDDBDB] text-secondary-foreground hover:bg-[#DDDBDB]/80 dark:bg-white/15 dark:text-foreground dark:hover:bg-white/20",
        borderless: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        "filled-contrast": "bg-[#121212] text-white hover:bg-[#121212]/90",
      },
      size: {
        xs: "h-7 rounded-full px-2 text-xs",
        sm: "h-9 rounded-full px-3",
        default: "h-10 px-4 py-2",
        lg: "h-11 rounded-full px-8",
        xl: "h-12 rounded-full px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
