import { motion } from 'framer-motion';

interface TabOption {
  id: string;
  label: string;
}

interface SlidingTabsProps {
  options: TabOption[];
  activeId: string;
  onChange: (id: string) => void;
}

export const SlidingTabs = ({ options, activeId, onChange }: SlidingTabsProps) => {
  const activeIndex = options.findIndex((o) => o.id === activeId);

  return (
    <div className="relative flex p-1 mb-5 rounded-full bg-ui-elevated border border-stroke-subtle shadow-detail-sm">
      {/* The Animated Pill */}
      <motion.div
        className="absolute inset-y-1 rounded-full bg-ui-surface shadow-detail-sm border border-stroke-strong/10"
        initial={false}
        animate={{
          x: `calc(${activeIndex * 100}% )`,
          width: `calc(${100 / options.length}% - 0.25rem)`,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 35 }}
      />
      
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          className={`relative z-10 flex-1 py-2 text-sm font-medium transition-colors duration-300 ${
            activeId === option.id ? 'text-content' : 'text-content-muted hover:text-content'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};