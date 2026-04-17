import type { ComponentPropsWithRef, ReactNode } from "react"

interface ButtonProps extends ComponentPropsWithRef<"button"> {
    variant?: "primary" | "secondary",
}

export const Button = ({
    variant = "secondary", 
    children,
    ...props
}: ButtonProps) => {

    
    return (
    <button 
        className=""
        {...props}
    >
        {children}
    </button>
  )
}
