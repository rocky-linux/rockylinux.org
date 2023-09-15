import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/shadcn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-green-500 text-white shadow hover:bg-green-500/90 focus:ring-4 focus:ring-offset-1 focus:ring-opacity-50 focus:ring-green-400",
        destructive:
          "bg-red-500 text-slate-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90 focus:ring-4 focus:ring-offset-1 focus:ring-opacity-50 focus:ring-red-400",
        outline:
          "border border-green-200 bg-transparent shadow-sm hover:bg-green-100 hover:text-green-900 dark:border-green-800 dark:hover:bg-green-800 dark:hover:text-green-50",
        secondary:
          "bg-green-600 text-white shadow hover:bg-green-600/90 focus:ring-4 focus:ring-offset-1 focus:ring-opacity-50 focus:ring-green-400",
        ghost:
          "hover:bg-green-100 hover:text-green-900 dark:hover:bg-green-800 dark:hover:text-green-50 focus:ring-4 focus:ring-offset-1 focus:ring-opacity-50 focus:ring-green-400",
        link: "text-green-600 underline-offset-4 hover:underline dark:text-green-50 focus:ring focus:ring-opacity-50 focus:ring-green-400",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
