import type { ComponentPropsWithRef, ReactNode } from "react"
import { NavLink } from "react-router-dom"

interface NavItemProps extends ComponentPropsWithRef<"div">{
    to: string,
    label?: string,
    icon?: ReactNode
}

export const NavItem = ({to, label, icon, className}: NavItemProps) => {
  return (
      <NavLink
        to={to}
        className={ ({ isActive }) => `flex gap-3 ${className} ${isActive ? "md:text-white md:bg-primary" : "" }`}
      >
          <span>{icon}</span>
          <span>{label}</span>
      </NavLink>      
  )
}
