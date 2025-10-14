import { useState } from "react";
import { ArrowLeftRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export const ByteConverter = () => {
  const [inputValue, setInputValue] = useState("");
  const [isReversed, setIsReversed] = useState(false);
  const [copiedMB, setCopiedMB] = useState(false);
  const [copiedMiB, setCopiedMiB] = useState(false);

  const formatNumber = (num: number): string => {
    if (isNaN(num) || !isFinite(num)) return "0";
    return num.toLocaleString("en-US", { maximumFractionDigits: 10 });
  };

  const parseInput = (value: string): number => {
    const cleanValue = value.replace(/,/g, "").trim();
    return parseFloat(cleanValue) || 0;
  };

  const calculateConversions = () => {
    const numValue = parseInput(inputValue);
    
    if (isReversed) {
      // MB to Bytes
      const bytes = numValue * 1000000;
      const mibToBytes = numValue * 1048576;
      return {
        mb: formatNumber(numValue),
        mib: formatNumber(numValue),
        bytes: formatNumber(bytes),
        mibBytes: formatNumber(mibToBytes),
      };
    } else {
      // Bytes to MB
      const mb = numValue / 1000000;
      const mib = numValue / 1048576;
      return {
        mb: formatNumber(mb),
        mib: formatNumber(mib),
        bytes: formatNumber(numValue),
        mibBytes: formatNumber(numValue),
      };
    }
  };

  const results = calculateConversions();

  const handleCopy = async (text: string, type: "mb" | "mib") => {
    await navigator.clipboard.writeText(text);
    if (type === "mb") {
      setCopiedMB(true);
      setTimeout(() => setCopiedMB(false), 2000);
    } else {
      setCopiedMiB(true);
      setTimeout(() => setCopiedMiB(false), 2000);
    }
  };

  const handleSwap = () => {
    setIsReversed(!isReversed);
    setInputValue("");
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 md:p-8 shadow-converter bg-card">
      <div className="space-y-6">
        {/* Input Section */}
        <div className="space-y-2">
          <label htmlFor="converter-input" className="text-sm font-medium text-muted-foreground">
            {isReversed ? "Megabytes (MB)" : "Bytes"}
          </label>
          <Input
            id="converter-input"
            type="text"
            placeholder={isReversed ? "Enter megabytes..." : "Enter bytes..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="h-14 text-lg font-medium"
            autoComplete="off"
          />
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleSwap}
            variant="outline"
            size="icon"
            className="rounded-full h-10 w-10 transition-smooth hover:rotate-180"
            aria-label="Swap conversion direction"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {/* Decimal MB Result */}
          <div className="p-4 rounded-xl bg-[hsl(var(--result-bg))] border border-border transition-smooth">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {isReversed ? "Bytes (Decimal)" : "Megabytes (MB) - Decimal"}
                </p>
                <p className="text-2xl md:text-3xl font-bold text-[hsl(var(--result-highlight))] truncate">
                  {isReversed ? results.bytes : results.mb}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  1 MB = 1,000,000 bytes
                </p>
              </div>
              <Button
                onClick={() => handleCopy(isReversed ? results.bytes : results.mb, "mb")}
                variant="ghost"
                size="icon"
                className="shrink-0 transition-smooth"
                aria-label="Copy to clipboard"
              >
                {copiedMB ? (
                  <Check className="h-5 w-5 text-accent" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Binary MiB Result */}
          <div className="p-4 rounded-xl bg-[hsl(var(--result-bg))] border border-border transition-smooth">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-muted-foreground mb-1">
                  {isReversed ? "Bytes (Binary)" : "Mebibytes (MiB) - Binary"}
                </p>
                <p className="text-2xl md:text-3xl font-bold text-[hsl(var(--result-highlight))] truncate">
                  {isReversed ? results.mibBytes : results.mib}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  1 MiB = 1,048,576 bytes
                </p>
              </div>
              <Button
                onClick={() => handleCopy(isReversed ? results.mibBytes : results.mib, "mib")}
                variant="ghost"
                size="icon"
                className="shrink-0 transition-smooth"
                aria-label="Copy to clipboard"
              >
                {copiedMiB ? (
                  <Check className="h-5 w-5 text-accent" />
                ) : (
                  <Copy className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
