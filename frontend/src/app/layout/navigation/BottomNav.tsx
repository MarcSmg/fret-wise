import { NavItem } from "../../../shared/ui/NavItem";
import type { MenuItem } from "../../../shared/types/navigation";
import { motion } from "motion/react";

export const BottomNav = ({ menuItems }: { menuItems: MenuItem[] }) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 flex flex-col justify-center">
      <motion.div className="flex items-center justify-between z-50 m-5 mb-15 p-2 bg-ui-surface border border-stroke-subtle rounded-2xl">
        {menuItems.map((item) => (
          <NavItem
            className="w-full p-2 justify-center items-center"
            {...item}
          />
        ))}
      </motion.div>
    </nav>
  );
};