import { ComponentProps } from 'react';
import { ArrowUpCircleIcon } from 'lucide-react';
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
import { NavSecondary } from '../layout/NavSecondary';
import { NavUser, NavUserData } from '../layout/NavUser';
import { useAuth } from '../../providers';

export type SidebarProps = ComponentProps<typeof ShadcnSidebar> & {
  navMain?: NavMainItem[];
  navSecondary?: Array<{ title: string; url: string; icon: any }>;
  user?: NavUserData;
  onLogout?: () => void;
  logoText?: string;
  logoHref?: string;
  logoIcon?: any;
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
  const auth= useAuth();
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
          <NavUser user={user} onLogout={()=>{
            auth.setAuthData(null,null);
            auth.setOtherData(null);
            if(onLogout){
              onLogout();
            }
            
          }} />
        </SidebarFooter>
      )}
    </ShadcnSidebar>
  );
};
