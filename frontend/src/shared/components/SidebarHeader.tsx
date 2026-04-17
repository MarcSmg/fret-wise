// src/components/sidebar/SidebarHeader.tsx
import { Link } from 'react-router-dom';

export const SidebarHeader = () => {
  return (
    <div className="flex items-center gap-3 px-6 py-8 w-full bg-surface">
      <div className="size-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
        {/* Logo stays here */}
      </div>
      
      <Link to="/" className="group">
        <h1 className="text-xl font-black tracking-tight text-content group-hover:text-primary transition-colors">
          Fretwise
        </h1>
      </Link>
    </div>
  );
};