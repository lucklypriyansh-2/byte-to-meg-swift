import { Calculator, FileText, Mail, Book, Home } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Converter", url: "/", icon: Home },
  { title: "Blog", url: "/blog", icon: FileText },
  { title: "Docs", url: "/docs", icon: Book },
  { title: "Newsletter", url: "/newsletter", icon: Mail },
];

export function AppSidebar() {
  const { open } = useSidebar();

  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    `transition-all duration-300 ease-in-out ${
      isActive 
        ? "bg-gradient-to-r from-primary/15 to-accent/10 text-primary font-semibold border-l-4 border-primary shadow-sm" 
        : "hover:bg-muted/70 hover:translate-x-1 hover:shadow-sm"
    }`;

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarContent className="bg-card/50 backdrop-blur-sm">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg font-bold flex items-center gap-3 px-4 py-6 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-accent shadow-lg transition-transform duration-300 hover:scale-110">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            {open && (
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in">
                ByteTomb
              </span>
            )}
          </SidebarGroupLabel>
          
          <SidebarGroupContent className="px-2">
            <SidebarMenu className="space-y-1">
              {menuItems.map((item, index) => (
                <SidebarMenuItem 
                  key={item.title}
                  className="animate-slide-in-left"
                  style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
                >
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavClass}
                    >
                      <item.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                      <span className="transition-all duration-300">{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Decorative gradient at bottom */}
        {open && (
          <div className="mt-auto px-4 py-4 animate-fade-in">
            <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
              <p className="text-xs text-muted-foreground">
                ✨ Convert bytes to MB/MiB with precision
              </p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
