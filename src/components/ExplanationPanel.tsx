import { Card } from "@/components/ui/card";
import { Calculator, Binary, Info } from "lucide-react";

export const ExplanationPanel = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto p-6 md:p-8 shadow-converter bg-card">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">
        Understanding Bytes and Megabytes
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Decimal MB */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Decimal MB</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            The decimal system uses base-10 (powers of 1000). This is the standard used by storage manufacturers and in most consumer contexts.
          </p>
          <div className="p-3 rounded-lg bg-muted/50 font-mono text-sm">
            <p className="font-semibold mb-1">Formula:</p>
            <p>MB = Bytes ÷ 1,000,000</p>
            <p className="text-xs text-muted-foreground mt-2">
              Example: 5,000,000 bytes = 5 MB
            </p>
          </div>
        </div>

        {/* Binary MiB */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-accent/10">
              <Binary className="h-5 w-5 text-accent" />
            </div>
            <h3 className="text-lg font-semibold">Binary MiB</h3>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            The binary system uses base-2 (powers of 1024). This is more accurate for computer memory, RAM, and file systems.
          </p>
          <div className="p-3 rounded-lg bg-muted/50 font-mono text-sm">
            <p className="font-semibold mb-1">Formula:</p>
            <p>MiB = Bytes ÷ 1,048,576</p>
            <p className="text-xs text-muted-foreground mt-2">
              Example: 5,000,000 bytes ≈ 4.768 MiB
            </p>
          </div>
        </div>
      </div>

      {/* Key Difference */}
      <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <div className="flex gap-3">
          <div className="shrink-0">
            <Info className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Key Difference</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The ~4.86% difference between MB and MiB is why a "1 TB" hard drive shows as approximately 931 GB in your operating system. Manufacturers use decimal MB, while most OS use binary MiB for calculations.
            </p>
          </div>
        </div>
      </div>

      {/* Common Conversions */}
      <div className="mt-6">
        <h4 className="font-semibold mb-3">Common Conversions</h4>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="p-3 rounded-lg bg-muted/30">
            <span className="font-mono text-primary">1 KB</span> = 1,000 bytes
          </div>
          <div className="p-3 rounded-lg bg-muted/30">
            <span className="font-mono text-accent">1 KiB</span> = 1,024 bytes
          </div>
          <div className="p-3 rounded-lg bg-muted/30">
            <span className="font-mono text-primary">1 MB</span> = 1,000,000 bytes
          </div>
          <div className="p-3 rounded-lg bg-muted/30">
            <span className="font-mono text-accent">1 MiB</span> = 1,048,576 bytes
          </div>
          <div className="p-3 rounded-lg bg-muted/30">
            <span className="font-mono text-primary">1 GB</span> = 1,000,000,000 bytes
          </div>
          <div className="p-3 rounded-lg bg-muted/30">
            <span className="font-mono text-accent">1 GiB</span> = 1,073,741,824 bytes
          </div>
        </div>
      </div>
    </Card>
  );
};
