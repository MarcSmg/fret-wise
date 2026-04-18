import { AppHeader } from "../../../shared/components/AppHeader"

export const TopNav = () => {
  return (
    <div>
        <nav className="flex items-center justify-between top-0 left-0 right-0 bg-ui-surface border-t border-stroke z-50 md:hidden">
            <AppHeader/>
        </nav>
    </div>
  )
}
