import { NavItem } from "../../shared/ui/NavItem";
import { SidebarHeader } from "../../shared/components/SidebarHeader";
import type { MenuItem } from "../../shared/types/navigation";

const Sidebar = ({menuItems}: {menuItems: MenuItem[]}) => {
  return (
    <aside
        className=" hidden md:block h-screen w-[20%] bg-surface-card"
        >
      <SidebarHeader/>
      <nav className="w-full h-full">
          {menuItems.map((item) => (
            <NavItem
              className="w-full p-2"
              key={item.to} {...item} 
            />
          )) }
      </nav>
    </aside>
  )
}

export default Sidebar