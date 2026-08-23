import { HomeAltSlimHoriz, Search, Bookmark, ProfileCircle } from 'iconoir-react';
import { ThemeProvider } from "../providers/ThemeProvider"
import Sidebar from './navigation/Sidebar'
import { Outlet } from 'react-router-dom'
import { BottomNav } from './navigation/BottomNav';
import { TopNav } from './navigation/TopNav';

const desktopSidebarItems = [
  { to: "/home", label: "Home", icon: <HomeAltSlimHoriz strokeWidth={2} width={20} height={20} />, activeIcon: <HomeAltSlimHoriz strokeWidth={2.5} width={20} height={20} /> },
  { to: "/search", label: "Search", icon: <Search strokeWidth={2} width={20} height={20} />, activeIcon: <Search strokeWidth={2.5} width={20} height={20} /> },
  { to: "/saved-chords", label: "Saved Chords", icon: <Bookmark strokeWidth={2} width={20} height={20} />, activeIcon: <Bookmark strokeWidth={2.5} width={20} height={20} /> },
  { to: "/profile", label: "Profile", icon: <ProfileCircle strokeWidth={2} width={20} height={20} />, activeIcon: <ProfileCircle strokeWidth={2.5} width={20} height={20} /> },
];

const mobileNavbarItems = [
  { to: "/home", label: "Home", icon: <HomeAltSlimHoriz  strokeWidth={2} width={20} height={20} />, activeIcon: <HomeAltSlimHoriz strokeWidth={2.5} width={20} height={20} /> },
  { to: "/search", label: "Search", icon: <Search strokeWidth={2} width={20} height={20} />, activeIcon: <Search strokeWidth={2.5} width={20} height={20} /> },
  { to: "/saved-chords", label: "Saved Chords", icon: <Bookmark strokeWidth={2} width={20} height={20} />, activeIcon: <Bookmark strokeWidth={2.5} width={20} height={20} /> },
  { to: "/profile", label: "Profile", icon: <ProfileCircle strokeWidth={2} width={20} height={20} />, activeIcon: <ProfileCircle strokeWidth={2.5} width={20} height={20} /> },
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
