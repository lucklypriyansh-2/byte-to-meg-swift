export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-12 px-4 mt-16 border-t border-border/50 bg-gradient-to-b from-transparent to-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/50"></div>
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ByteTomb
            </span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent/50"></div>
          </div>
          
          <p className="text-sm text-muted-foreground font-medium">
            © {currentYear} ByteTomb. Fast, accurate data conversion tools.
          </p>
          
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            ByteTomb provides free, instant conversions between bytes, kilobytes, megabytes, and other data storage units. 
            All conversions are calculated client-side for maximum privacy and speed.
          </p>
          
          <div className="pt-4">
            <p className="text-xs text-muted-foreground/60">
              Made with ❤️ for developers and data enthusiasts
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
