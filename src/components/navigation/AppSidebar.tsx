import { ArrowUpCircleIcon, LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'

export type AppSidebarNavItem = {
  title: string
  url: string
  icon?: React.ComponentType<{ className?: string }>
}

export type AppSidebarProps = {
  navMain?: AppSidebarNavItem[]
  navSecondary?: AppSidebarNavItem[]
  user?: {
    name: string
    email: string
    avatar?: string | null
  }
  onLogout?: () => void
  logoText?: string
  logoHref?: string
  logoIcon?: LucideIcon
  className?: string
  pageTitles?: Record<string, string>
}

export function AppSidebar({
  navMain = [],
  navSecondary = [],
  user,
  onLogout,
  logoText = 'ACS Tracking',
  logoHref = '#',
  logoIcon: LogoIcon = ArrowUpCircleIcon,
  className,
  pageTitles = {},
  ...props
}: AppSidebarProps) {
  return (
    <aside
      className={cn(
        'hidden h-screen w-64 flex-col border-r bg-primary py-6 pl-5 text-white dark:bg-background lg:flex',
        className,
      )}
      {...props}
    >
      <a href={logoHref} className="flex items-center gap-2 text-xl font-semibold">
        <LogoIcon className="h-5 w-5" />
        <span>{logoText}</span>
      </a>

      <nav className="mt-6 flex-1 space-y-6 overflow-y-auto pr-4 text-sm">
        <div>
          <ul className="space-y-1">
            {navMain.map((item) => (
              <li key={item.title}>
                <a
                  href={item.url}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-white/90 hover:bg-white/10 hover:text-white"
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {navSecondary.length > 0 && (
          <div className="border-t border-white/10 pt-4">
            <ul className="space-y-1">
              {navSecondary.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.url}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {user && (
        <div className="mt-4 border-t border-white/10 pt-4 text-xs text-white/80">
          <div className="mb-2 font-semibold">{user.name}</div>
          <div className="mb-2 break-all text-[11px] text-white/60">{user.email}</div>
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="rounded-md border border-white/20 px-3 py-1 text-xs font-medium text-white hover:bg-white/10"
            >
              Log out
            </button>
          )}
        </div>
      )}
    </aside>
  )
}
