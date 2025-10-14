import { Card } from "@/components/ui/card";
import { Code, BookOpen, Calculator, Lightbulb } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Docs = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Documentation</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Complete guide to using ByteTomb's conversion tools, understanding data units, and implementing conversions in your code.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-6 space-y-3 hover:shadow-lg transition-smooth cursor-pointer">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Calculator className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Getting Started</h3>
            <p className="text-sm text-muted-foreground">
              Learn the basics of data conversion
            </p>
          </Card>

          <Card className="p-6 space-y-3 hover:shadow-lg transition-smooth cursor-pointer">
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Code className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-semibold">Code Examples</h3>
            <p className="text-sm text-muted-foreground">
              Implement conversions in your projects
            </p>
          </Card>

          <Card className="p-6 space-y-3 hover:shadow-lg transition-smooth cursor-pointer">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold">Reference</h3>
            <p className="text-sm text-muted-foreground">
              Complete unit conversion tables
            </p>
          </Card>

          <Card className="p-6 space-y-3 hover:shadow-lg transition-smooth cursor-pointer">
            <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-accent" />
            </div>
            <h3 className="font-semibold">Best Practices</h3>
            <p className="text-sm text-muted-foreground">
              Tips for accurate conversions
            </p>
          </Card>
        </div>

        {/* Documentation Sections */}
        <Card className="p-6 md:p-8">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="basics">
              <AccordionTrigger className="text-xl font-semibold">
                Understanding Data Units
              </AccordionTrigger>
              <AccordionContent className="space-y-4 text-muted-foreground">
                <p>
                  Data storage units measure the amount of digital information. There are two systems:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Decimal (SI)</strong>: Uses base-10 (powers of 1000) - KB, MB, GB, TB</li>
                  <li><strong>Binary (IEC)</strong>: Uses base-2 (powers of 1024) - KiB, MiB, GiB, TiB</li>
                </ul>
                <p className="mt-4">
                  Example: 1 MB = 1,000,000 bytes (decimal) vs 1 MiB = 1,048,576 bytes (binary)
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="python">
              <AccordionTrigger className="text-xl font-semibold">
                Python Implementation
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p className="text-muted-foreground">Convert bytes to megabytes in Python:</p>
                <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`# Decimal MB conversion
def bytes_to_mb(bytes):
    return bytes / 1_000_000

# Binary MiB conversion
def bytes_to_mib(bytes):
    return bytes / 1_048_576

# Example usage
file_size = 5_000_000
print(f"{bytes_to_mb(file_size):.2f} MB")
print(f"{bytes_to_mib(file_size):.2f} MiB")`}</pre>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="javascript">
              <AccordionTrigger className="text-xl font-semibold">
                JavaScript Implementation
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p className="text-muted-foreground">Convert bytes to megabytes in JavaScript:</p>
                <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`// Decimal MB conversion
function bytesToMB(bytes) {
  return (bytes / 1000000).toFixed(2);
}

// Binary MiB conversion
function bytesToMiB(bytes) {
  return (bytes / 1048576).toFixed(2);
}

// Example usage
const fileSize = 5000000;
console.log(\`\${bytesToMB(fileSize)} MB\`);
console.log(\`\${bytesToMiB(fileSize)} MiB\`);`}</pre>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="formulas">
              <AccordionTrigger className="text-xl font-semibold">
                Conversion Formulas
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Decimal (SI) System</h4>
                    <ul className="space-y-1 text-sm font-mono">
                      <li>1 KB = 1,000 bytes</li>
                      <li>1 MB = 1,000 KB = 1,000,000 bytes</li>
                      <li>1 GB = 1,000 MB = 1,000,000,000 bytes</li>
                      <li>1 TB = 1,000 GB = 1,000,000,000,000 bytes</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Binary (IEC) System</h4>
                    <ul className="space-y-1 text-sm font-mono">
                      <li>1 KiB = 1,024 bytes</li>
                      <li>1 MiB = 1,024 KiB = 1,048,576 bytes</li>
                      <li>1 GiB = 1,024 MiB = 1,073,741,824 bytes</li>
                      <li>1 TiB = 1,024 GiB = 1,099,511,627,776 bytes</li>
                    </ul>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="best-practices">
              <AccordionTrigger className="text-xl font-semibold">
                Best Practices
              </AccordionTrigger>
              <AccordionContent className="space-y-4 text-muted-foreground">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use <strong>MB</strong> for file sizes, network speeds, and storage devices</li>
                  <li>Use <strong>MiB</strong> for RAM, cache, and internal computer storage</li>
                  <li>Always specify which system you're using to avoid confusion</li>
                  <li>Round results appropriately based on context (2-3 decimal places is usually sufficient)</li>
                  <li>Be aware of the ~4.86% difference between MB and MiB when working with large files</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
    </div>
  );
};

export default Docs;
