import { AnimatePresence, motion } from "motion/react"
import type { ComponentPropsWithRef, ReactNode } from "react"
import { NavLink } from "react-router-dom"

interface NavItemProps extends ComponentPropsWithRef<"div"> {
  to: string,
  label?: string,
  icon?: ReactNode,
  activeIcon?: ReactNode,
  isMenuExtended?: boolean
}

export const NavItem = ({ to, label, activeIcon, icon, className, isMenuExtended }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
        flex items-center rounded-xl px-3 py-2
        ${className || ""} 
        ${isActive ? "md:text-content md:bg-accent-soft" : "hover:bg-accent-soft/40 transition-colors duration-200"}
      `}
    >
      {({ isActive }) => (<>
        <span key="icon" className={`shrink-0 ${isActive ? "text-primary" : "text-content-muted"}`}>
          {isActive ? activeIcon : icon}
        </span>
        <AnimatePresence>
          {isMenuExtended &&
            <motion.span
              key="label"
              initial={{ opacity: 0, width: 0, marginLeft: 0 }}
              animate={{ opacity: 1, width: "auto", marginLeft: 12 }}
              exit={{ opacity: 0, width: 0, marginLeft: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden whitespace-nowrap font-heading font-medium text-nav"
            >
              {label}
            </motion.span>
          }
        </AnimatePresence>
      </>
      )}
    </NavLink>
  )
}