export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-8 px-4 mt-16 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} ByteTomb. Fast, accurate data conversion tools.
          </p>
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            ByteTomb provides free, instant conversions between bytes, kilobytes, megabytes, and other data storage units. 
            All conversions are calculated client-side for maximum privacy and speed.
          </p>
        </div>
      </div>
    </footer>
  );
};
