import type { ComponentPropsWithRef, ReactNode } from "react"

interface InputProps extends ComponentPropsWithRef<"input"> {
    icon?: ReactNode;
}

export const Input = ({
    placeholder,
    type,
    className,
    icon
}: InputProps) => {
  return (
    <div
        className={`
            flex items-center
        `}
    >
        {icon}
        <input 
            type={type}
            placeholder={placeholder}
            className={`
                ${className}
            `}
        />

    </div>

  )
}
