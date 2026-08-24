import { Home, Search, Bookmark, BookmarkSolid, User } from 'iconoir-react';
import { ThemeProvider } from "../providers/ThemeProvider"
import Sidebar from './navigation/Sidebar'
import { Outlet } from 'react-router-dom'
import { BottomNav } from './navigation/BottomNav';
import { TopNav } from './navigation/TopNav';

const desktopSidebarItems = [
  { to: "/home", label: "Home", icon: <Home strokeWidth={1.5} width={20} height={20} />, activeIcon: <Home strokeWidth={2.5} width={20} height={20} /> },
  { to: "/search", label: "Search", icon: <Search strokeWidth={1.5} width={20} height={20} />, activeIcon: <Search strokeWidth={2.5} width={20} height={20} /> },
  { to: "/favorites", label: "Favorites", icon: <Bookmark strokeWidth={1.5} width={20} height={20} />, activeIcon: <BookmarkSolid width={20} height={20} /> },
  { to: "/profile", label: "Profile", icon: <User strokeWidth={1.5} width={20} height={20} />, activeIcon: <User strokeWidth={2.5} width={20} height={20} /> },
];

const mobileNavbarItems = [
  { to: "/home", label: "Home", icon: <Home strokeWidth={1.5} width={20} height={20} />, activeIcon: <Home strokeWidth={2.5} width={20} height={20} /> },
  { to: "/search", label: "Search", icon: <Search strokeWidth={1.5} width={20} height={20} />, activeIcon: <Search strokeWidth={2.5} width={20} height={20} /> },
  { to: "/favorites", label: "Favorites", icon: <Bookmark strokeWidth={1.5} width={20} height={20} />, activeIcon: <BookmarkSolid width={20} height={20} /> },
  { to: "/profile", label: "Profile", icon: <User strokeWidth={1.5} width={20} height={20} />, activeIcon: <User strokeWidth={2.5} width={20} height={20} /> },
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
