import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#3C9CFC] disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        primary: "bg-[#044C9C] text-white hover:bg-[#115092] shadow-md shadow-blue-900/10",
        secondary: "bg-[#FBB343] text-[#044C9C] hover:bg-[#fba218] shadow-md shadow-amber-500/20 font-bold",
        outline: "border border-white/30 bg-transparent text-white hover:bg-white/10 backdrop-blur-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-[#449CFC] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-14 rounded-md px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
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
