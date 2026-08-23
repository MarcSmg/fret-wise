import { motion } from "motion/react";

interface MenuActionProps {
    icon: React.ReactNode;
    label?: string;
    variants: any;
    onClick?: () => void; // The callback function
}

export const MenuAction = ({ icon, label, variants, onClick }: MenuActionProps) => (
    <motion.button
        variants={variants}
        whileTap={{ scale: 0.98 }}
        onClick={(e) => {
            onClick && onClick();
            e.stopPropagation()
        }}
        className="flex justify-center items-center gap-3 size-10 px-3 py-2 text-sm text-content cursor-pointer hover:bg-ui-elevated rounded-full transition-colors group"
    >
        {icon && <span className="text-content-muted group-hover:text-primary transition-colors">
            {icon}
        </span>}
        {label && <span className="font-medium">{label}</span>}
    </motion.button>
);