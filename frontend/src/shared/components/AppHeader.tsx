// src/components/sidebar/SidebarHeader.tsx
import { Link } from 'react-router-dom';

export const AppHeader = () => {
  return (
    <div className="flex items-center gap-3 px-6 py-3 w-full bg-surface">
      
      <Link to="/" className="group">
        <h1 className="text-xl font-black  text-content group-hover:text-primary transition-colors">
          ChordOpus
        </h1>
      </Link>
    </div>
  );
};