import { AnimatePresence, motion, type Variants } from "motion/react"
import { memo, type ComponentPropsWithRef } from "react";
import { BiHeart } from "react-icons/bi"
import { HiDotsHorizontal } from "react-icons/hi"
import { LuDownload, LuShare2 } from "react-icons/lu"
import { MenuAction } from "../../../shared/ui/MenuAction";

interface ChordMenuProps extends ComponentPropsWithRef<"div"> {
    isActive: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: -8 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.2,
            ease: "easeOut",
            staggerChildren: 0.05,
            delayChildren: 0.02,
        },
    },
    exit: { opacity: 0, scale: 0.95, y: -8 },
};

const itemsVariants: Variants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 16 }
    }
}

export const ChordMenu = memo(({ isActive, onOpen, onClose, className }: ChordMenuProps) => {

    return (
        <div className={` ${className} relative flex flex-col size-5 w-fit`} >
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation(); // Stop click from triggering row actions
                    isActive ? onClose() : onOpen();
                }}
                className={`p-1 rounded-md transition-colors ${isActive ? 'text-primary bg-ui-elevated' : 'text-content-muted hover:text-content'}`}
            >
                <HiDotsHorizontal className="size-5" />
            </button>

            <AnimatePresence>
                {isActive && (
                    <>
                        <motion.div
                            initial={{ opacity: 0, filter: 'blur(4px)' }}
                            animate={{ opacity: 0.5, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, filter: 'blur(4px)' }}
                            className="fixed inset-0 z-60 bg-black blur-glass"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                        />

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute right-0 bottom-8 z-70 mt-2 flex flex-col gap-2 p-1.5 py-2 rounded-xl bg-ui-card border border-stroke-strong/20 shadow-detail-md backdrop-blur-glass"
                        >
                            <MenuAction variants={itemsVariants} icon={<BiHeart size={18} />} />
                            <MenuAction variants={itemsVariants} icon={<LuDownload size={18} />} />
                            <MenuAction variants={itemsVariants} icon={<LuShare2 size={18} />} />

                        </motion.div>
                    </>
                )}

            </AnimatePresence>
        </div>
    )
}, (prev, next) => {
    return prev.isActive === next.isActive;
});
