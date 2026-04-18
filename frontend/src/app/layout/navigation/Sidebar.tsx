import { NavItem } from "../../../shared/ui/NavItem";
import { AppHeader } from "../../../shared/components/AppHeader";
import type { MenuItem } from "../../../shared/types/navigation";

const Sidebar = ({menuItems}: {menuItems: MenuItem[]}) => {

  return (
    <aside
        className=" hidden sticky h-full w-70 p-5 overflow-y-auto bg-surface-card md:block no-scrollbar"
        >
      <AppHeader/>
      <nav className="w-full">
          {menuItems.map((item) => (
            <NavItem
            className={`w-full px-5 py-3 rounded-full mb-2`}
            key={item.to} {...item} 
            />  
          )) }
      </nav>
    </aside>
  )
}

export default Sidebar