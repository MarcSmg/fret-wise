import { GoHeart, GoHeartFill, GoHomeFill } from 'react-icons/go';
import { ThemeProvider } from "../providers/ThemeProvider"
import Sidebar from './navigation/Sidebar'
import { Outlet } from 'react-router-dom'
import { FaUser } from 'react-icons/fa';
import { BottomNav } from './navigation/BottomNav';
import { TopNav } from './navigation/TopNav';
import { BiSearch } from 'react-icons/bi';

const desktopSidebarItems = [
  { to: "/home", label: "Home", icon: <GoHomeFill size={20} /> },
  { to: "/search", label: "Search a chord", icon: <BiSearch strokeWidth={1} size={20}/>},
  { to: "/favorites", label: "Favorites", icon: <GoHeartFill size={20} /> },
  { to: "/profile", label: "Profile", icon: <FaUser size={20} /> },
];

const mobileNavbarItems = [
  { to: "/home", label: "Home", icon: <GoHomeFill size={20} /> },
  { to: "/search", label: "Search a chord", icon: <BiSearch strokeWidth={1} size={20}/>},
  { to: "/favorites", label: "Favorites", icon: <GoHeart strokeWidth={1} size={20} /> },
  { to: "/profile", label: "Profile", icon: <FaUser size={20} /> },
];

export const AppLayout = () => {
  return (
    <ThemeProvider>
      <div 
        className="w-full h-screen overflow-hidden md:flex"
      >
          <Sidebar menuItems={desktopSidebarItems} />
          <main className='w-full h-full overflow-y-auto'>
            <TopNav/>
            <Outlet />
            <BottomNav menuItems={mobileNavbarItems} />
          </main>
      </div>
    </ThemeProvider>
  )
}
