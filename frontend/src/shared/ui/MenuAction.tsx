import { motion } from "motion/react";

export const MenuAction = ({ icon, label, variants }: { icon?: React.ReactNode; label?: string, variants?: any }) => (
    <motion.button
        variants={variants}
        whileTap={{ scale: 0.98 }}
        onClick={(e) => e.stopPropagation()}
        className="flex items-center gap-3 w-full px-3 py-2 text-sm text-content hover:bg-ui-elevated rounded-lg transition-colors group"
    >
        {icon && <span className="text-content-muted group-hover:text-primary transition-colors">
            {icon}
        </span>}
        {label && <span className="font-medium">{label}</span>}
    </motion.button>
);