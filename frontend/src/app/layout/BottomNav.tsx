import { NavItem } from "../../shared/ui/NavItem";
import type { MenuItem } from "../../shared/types/navigation";

export const BottomNav = ({menuItems}: {menuItems: MenuItem[]}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-surface-card border-t border-stroke flex items-center justify-between z-50">
      {menuItems.map((item) => (
            <NavItem
              className="w-full p-2 justify-center items-center"
              key={item.to}  
              to={item.to}
              icon = {item.icon}
            />
          )) }
    </nav>
  );
};