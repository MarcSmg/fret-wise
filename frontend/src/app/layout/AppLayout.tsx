import { GoHeart, GoHeartFill, GoHomeFill } from 'react-icons/go';
import { ThemeProvider } from '../../context/ThemeContext'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { FaUser } from 'react-icons/fa';
import { BottomNav } from './BottomNav';
import { TopNav } from './TopNav';

const desktopSidebarItems = [
  { to: "/", label: "Home", icon: <GoHomeFill size={20} /> },
  { to: "/favorites", label: "Favorites", icon: <GoHeartFill size={20} /> },
  { to: "/profile", label: "Profile", icon: <FaUser size={20} /> },
];

const mobileNavbarItems = [
  { to: "/", label: "Home", icon: <GoHomeFill size={20} /> },
  { to: "/favorites", label: "Favorites", icon: <GoHeart strokeWidth={1} size={20} /> },
  { to: "/profile", label: "Profile", icon: <FaUser size={20} /> },
];

export const AppLayout = () => {
  return (
    <ThemeProvider>
      <div 
        className="md:flex w-full min-h-scree"
      >
          <Sidebar menuItems={desktopSidebarItems} />
          <TopNav/>
          <BottomNav menuItems={mobileNavbarItems} />
          <main>
              <Outlet />
          </main>
      </div>
    </ThemeProvider>
  )
}
