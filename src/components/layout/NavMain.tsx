"use client"

import { type LucideIcon } from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar"
import { useLocation, useNavigate } from "react-router-dom"
import { ForwardRefExoticComponent } from "react"
import { IconProps } from "@radix-ui/react-icons/dist/types"




export function NavMain({ items, pageTitles = {} }: {
    items: {
        title: string
        url: string
        icon?: LucideIcon | ForwardRefExoticComponent<IconProps & React.SVGAttributes<SVGElement>> | undefined
    }[],
    pageTitles?: Record<string, string>,
    children?: React.ReactNode
}) {
    const location = useLocation();
    const navigate = useNavigate();



    // Get the title based on the current route
    const title = pageTitles[location.pathname] || 'Default Title';

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title} className={title == item.title ? "font-bold bg-white rounded-lg shadow-md" : ""}>
                            <SidebarMenuButton tooltip={item.title} onClick={() => {
                                navigate(item.url)
                            }}>
                                {item.icon && <item.icon />}
                                <span >{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
