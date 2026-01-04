import { ComponentProps } from 'react';
import { ArrowUpCircleIcon, LucideIcon } from 'lucide-react';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '../ui/sidebar';
import { NavMain, NavMainItem } from '../layout/NavMain';
import { NavSecondary, NavSecondaryItem } from '../layout/NavSecondary';
import { NavUser, NavUserData } from '../layout/NavUser';

export type SidebarProps = ComponentProps<typeof ShadcnSidebar> & {
  navMain?: NavMainItem[];
  navSecondary?: NavSecondaryItem[];
  user?: NavUserData;
  onLogout?: () => void;
  logoText?: string;
  logoHref?: string;
  logoIcon?: LucideIcon;
};

export const Sidebar = ({
  navMain = [],
  navSecondary = [],
  user,
  onLogout,
  logoText = 'ACS Tracking',
  logoHref = '#',
  logoIcon: LogoIcon = ArrowUpCircleIcon,
  className,
  ...props
}: SidebarProps) => {
  return (
    <ShadcnSidebar collapsible="offcanvas" {...props} className={className}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href={logoHref}>
                <LogoIcon className="h-5 w-5" />
                <span className="text-base font-semibold">{logoText}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      {user && (
        <SidebarFooter>
          <NavUser user={user} onLogout={onLogout} />
        </SidebarFooter>
      )}
    </ShadcnSidebar>
  );
};
