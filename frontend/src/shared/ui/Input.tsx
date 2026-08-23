import type { ComponentPropsWithRef, ReactNode } from "react"

interface InputProps extends ComponentPropsWithRef<"input"> {
    icon?: ReactNode;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
    placeholder,
    type,
    className,
    icon,
    ...props

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
                {...props}
            />

        </div>

    )
}
