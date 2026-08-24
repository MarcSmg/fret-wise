import { NavItem } from "../../../shared/ui/NavItem";
import type { MenuItem } from "../../../shared/types/navigation";
import { motion } from "motion/react";
import { Menu } from "iconoir-react";
import { useState } from "react";

const Sidebar = ({ menuItems }: { menuItems: MenuItem[] }) => {
  const [isExtended, setIsExtended] = useState(false);

  const toggleMenu = () => {
    setIsExtended((prev) => !prev);
  }

  return (
    <aside
      className={"hidden sticky top-0 h-screen p-5 overflow-y-auto md:block no-scrollbar shrink-0"}
      style={{ width: "fit-content" }}
    >
      <motion.nav
        animate={{ width: isExtended ? 250 : 76 }}
        initial={{ width: 76 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative h-full py-5 border border-stroke-subtle rounded-2xl overflow-hidden flex flex-col"
        style={{
          boxShadow: "rgba(0, 1, 0, 0.1) 0px 8px 24px"
        }}
      >
        <div className="px-4 mb-10 mt-2">
          <div 
            className="size-11 rounded-xl cursor-pointer flex items-center justify-center hover:bg-accent-soft/40 transition-colors duration-200" 
            onClick={toggleMenu}
          >
            <Menu className="text-content-muted" width={22} height={22} />
          </div>
        </div>
        <div className="flex flex-col gap-2 px-4 w-full">
          {menuItems.map((item) => (
            <NavItem
              key={item.to}
              {...item} 
              isMenuExtended={isExtended}
            />
          ))}
        </div>
      </motion.nav>
    </aside>
  )
}

export default Sidebar