
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/shared/Logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { BarChart3, History, LayoutDashboard, LogOut } from 'lucide-react';

const menuItems = [
  { href: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/teacher/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/teacher/dashboard/history', label: 'History', icon: History },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton asChild isActive={pathname === item.href}>
                  <a>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <div className="flex items-center gap-3 p-2">
          <Avatar>
            <AvatarImage src="https://picsum.photos/seed/teacher/100/100" alt="Teacher" />
            <AvatarFallback>T</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="font-semibold truncate">Salma Gharbi</p>
            <p className="text-xs text-muted-foreground truncate">teacher@ahlan.com</p>
          </div>
        </div>
        <Link href="/" legacyBehavior passHref>
           <Button variant="ghost" className="w-full justify-start">
             <LogOut className="mr-2 h-4 w-4" />
             Logout
           </Button>
        </Link>
      </SidebarFooter>
    </>
  );
}
