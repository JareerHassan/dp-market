'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { users } from '@/lib/dummy-data';

type DashboardSidebarProps = {
  userType: 'buyer' | 'seller';
};

const buyerNav = [
  { href: '/buyer/dashboard', label: 'Dashboard', icon: 'LayoutGrid' },
  { href: '/buyer/dashboard/purchases', label: 'Purchase History', icon: 'Download' },
  { href: '/buyer/dashboard/saved', label: 'Saved Items', icon: 'Heart' },
  { href: '/buyer/dashboard/messages', label: 'Messages', icon: 'MessageSquare' },
  { href: '/buyer/dashboard/settings', label: 'Profile Settings', icon: 'Settings' },
];

const sellerNav = [
  { href: '/seller/dashboard', label: 'Overview', icon: 'BarChart' },
  { href: '/seller/dashboard/products', label: 'My Products', icon: 'Component' },
  { href: '/seller/add-product', label: 'Add Product', icon: 'PlusCircle' },
  { href: '/seller/dashboard/orders', label: 'Orders', icon: 'ShoppingCart' },
  { href: '/seller/dashboard/earnings', label: 'Withdraw Earnings', icon: 'Wallet' },
  { href: '/seller/dashboard/messages', label: 'Messages', icon: 'MessageSquare' },
];

export default function DashboardSidebar({ userType }: DashboardSidebarProps) {
  const pathname = usePathname();
  const navItems = userType === 'seller' ? sellerNav : buyerNav;
  const user = users[0]; // Dummy user

  return (
    <aside className="w-64 flex-shrink-0 border-r border-border/40 bg-card/50 flex flex-col">
      <div className="p-4 border-b border-border/40">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-lg">{user.name}</p>
            <p className="text-sm text-muted-foreground capitalize">{userType} Account</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = Icons[item.icon as keyof typeof Icons] || Icons.Home;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  isActive ? 'text-accent-foreground' : 'text-orange-500'
                )}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 mt-auto border-t border-border/40">
        <Button variant="ghost" className="w-full justify-start text-foreground/70 border text-orange-500">
          <Icons.LogOut className="mr-3 h-5 w-5" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
