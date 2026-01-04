import { cn } from '../../lib/utils';
import { Dispatch, SetStateAction, ComponentType } from 'react';
import { NavLink } from 'react-router-dom';
import { Icons } from '../ui/icons';

export type NavItem = {
  href: string;
  label: string;
  icon?: keyof typeof Icons | ComponentType<any>;
  isShow?: boolean;
};

export type DashboardNavProps = {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  className?: string;
};

export type DashboardNavItemProps = {
  item: NavItem;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  className?: string;
};

const DashboardNavItem = ({ item, setOpen }: DashboardNavItemProps) => {
  const Icon = 
    typeof item.icon === 'string' 
      ? Icons[item.icon] || Icons.arrowRight
      : item.icon || Icons.arrowRight;

  return (
    <div
      className="space-y-3"
      key={item.href}
      onClickCapture={() => {
        if (setOpen) {
          setOpen(false);
        }
      }}
    >
      <NavLink
        className={({ isActive }) =>
          cn(
            'flex transform items-center rounded-full px-3 py-2 text-gray-200 transition-colors duration-300 hover:bg-gray-50 hover:text-primary hover:dark:text-black ',
            isActive && 'bg-gray-50 text-primary dark:text-black'
          )
        }
        to={item.href}
        end
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
        <span className="mx-2 text-sm font-medium">{item.label}</span>
      </NavLink>
    </div>
  );
};

export const DashboardNav = ({ items, setOpen, className }: DashboardNavProps) => {
  if (!items?.length) {
    return null;
  }

  return (
    <nav className={cn('-mx-3 space-y-6', className)}>
      {items
        .filter((item) => item.isShow !== false)
        .map((item) => (
          <DashboardNavItem key={item.href} item={item} setOpen={setOpen} />
        ))}
    </nav>
  );
};
