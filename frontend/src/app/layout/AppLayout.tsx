import { GoHomeFill } from 'react-icons/go';
import { ThemeProvider } from "../providers/ThemeProvider"
import Sidebar from './navigation/Sidebar'
import { Outlet } from 'react-router-dom'
import { BottomNav } from './navigation/BottomNav';
import { TopNav } from './navigation/TopNav';
import { BiBookmark, BiSearch, BiSolidBookmark, BiSolidSearch, BiSolidUser, BiUser } from 'react-icons/bi';
import { GoHome } from 'react-icons/go';

const desktopSidebarItems = [
  { to: "/home", label: "Home", icon: <GoHome strokeWidth={0.5} size={20} />,activeIcon: <GoHomeFill size={20} /> },
  { to: "/search", label: "Search", icon: <BiSearch strokeWidth={0.5} size={20}/>, activeIcon: <BiSolidSearch size={20}/>},
  { to: "/favorites", label: "Favorites", icon: <BiBookmark strokeWidth={0.5} size={20} />, activeIcon: <BiSolidBookmark size={20}/>},
  { to: "/profile", label: "Profile", icon: <BiUser strokeWidth={0.5} size={20} />, activeIcon: <BiSolidUser size={20}/> },
];

const mobileNavbarItems = [
  { to: "/home", label: "Home", icon: <GoHome strokeWidth={0.5} size={20} />, activeIcon: <GoHomeFill size={20} /> },
  { to: "/search", label: "Search", icon: <BiSearch strokeWidth={0.5} size={20}/>, activeIcon: <BiSolidSearch size={20}/>},
  { to: "/favorites", label: "Favorites", icon: <BiBookmark strokeWidth={0.5} size={20} />, activeIcon: <BiSolidBookmark size={20}/> },
  { to: "/profile", label: "Profile", icon: <BiUser strokeWidth={0.5} size={20} />, activeIcon: <BiSolidUser size={20}/> },
];

export const AppLayout = () => {
  return (
    <ThemeProvider>
      <div 
        className="w-full h-screen overflow-hidden md:flex"
      >
          <Sidebar menuItems={desktopSidebarItems} />
          <main className='flex-1 h-full overflow-y-auto'>
            <TopNav/>
            <Outlet />
            <BottomNav menuItems={mobileNavbarItems} />
          </main>
      </div>
    </ThemeProvider>
  )
}
