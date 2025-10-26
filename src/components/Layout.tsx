import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { ThemeToggle } from "./ThemeToggle";
import { Sparkles } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative">
        {/* Background gradient decoration */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border/50 glass-effect sticky top-0 z-50 flex items-center px-6 transition-smooth">
            <div className="flex items-center gap-4 w-full">
              <SidebarTrigger className="hover:bg-primary/10 transition-smooth rounded-lg p-2 hover:scale-105" />
              
              <div className="flex items-center gap-3 ml-auto">
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 transition-all duration-300 hover:shadow-md hover:shadow-primary/10">
                  <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
                  <span className="text-xs font-medium text-primary">Fast & Accurate</span>
                </div>
                <ThemeToggle />
              </div>
            </div>
          </header>
          
          <main className="flex-1 transition-smooth">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
