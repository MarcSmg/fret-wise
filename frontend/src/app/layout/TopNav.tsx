import { SidebarHeader } from "../../shared/components/SidebarHeader"

export const TopNav = () => {
  return (
    <div>
        <nav className="md:hidden top-0 left-0 right-0 h-16 bg-surface-card border-t border-stroke flex items-center justify-between z-50">
            <SidebarHeader/>
        </nav>
    </div>
  )
}
