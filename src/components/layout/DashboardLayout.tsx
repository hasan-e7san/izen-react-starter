import { SidebarInset, SidebarProvider } from "../ui/sidebar"
import { SiteHeader, SiteHeaderProps } from "./SiteHeader"
import { cn } from "../../lib/utils"
import { AppSidebar, AppSidebarProps } from "../navigation"
import { Overlay } from "../overlay"
import { useOverlay } from "../../providers"

export type DashboardLayoutProps = {
  children: React.ReactNode
  sidebarProps?: AppSidebarProps
  headerProps?: SiteHeaderProps
  defaultOpen?: boolean
  className?: string
}

export function DashboardLayout({
  children,
  sidebarProps,
  headerProps,
  defaultOpen = true,
  className,
}: DashboardLayoutProps) {
  const { showOverlay } = useOverlay()
  
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar {...sidebarProps} />
      <SidebarInset>
        <SiteHeader {...headerProps} />
        <div className={cn("flex flex-1 flex-col gap-4 p-4 md:gap-6 md:p-6", className)}>
          {children}
          <Overlay show={showOverlay} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
