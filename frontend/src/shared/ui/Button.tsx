import type { ComponentPropsWithRef, ReactNode } from "react"
import { motion, type Transition } from "motion/react"

interface ButtonProps extends ComponentPropsWithRef<"button"> {
    variant?: "primary" | "secondary";
    type?: "submit";
    icon?: ReactNode;
}

export const Button = ({
    variant,
    children,
    className,
    icon
}: ButtonProps) => {

    const baseStyles = `flex justify-center gap-2 rounded-full p-3 font-semibold hover:scale-100`;
    const primaryStyles = `
        bg-gradient-to-r from-primary to-accent-bold text-white shadow-detail-md
    `
    const secondaryStyles = `
        bg-ui-card text-accent-secondary border-2 border-accent-secondary hover:bg-accent-secondary-soft
    `;

    const transition: Transition = {
        type: "tween",
        stiffness: 400,
        duration: 0.3,
        delay: (variant === "primary") ? 0.1 : 0,
        ease: [0, 0.71, 0.2, 1.01],
    }

    return (
        <motion.button
            initial={{
                // boxShadow: "0px 5px 15px rgba(0,0,0,0.2)"
            }}
            whileHover={{
                y: -2,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.2)"
            }}
            transition={transition}
            className={`
            ${className}
            ${baseStyles}
            ${variant === "primary" && primaryStyles}
            ${variant === "secondary" && secondaryStyles}
            `}
        >
            {icon && <span>{icon}</span> }
            {children}
        </motion.button>
    )
}
