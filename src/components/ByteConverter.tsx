import { useState } from "react";
import { ArrowLeftRight, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ConversionType = "byte-mb" | "byte-kb" | "byte-gb" | "kb-mb" | "kb-gb" | "mb-gb" | "gb-tb";

interface ConversionConfig {
  label: string;
  fromUnit: string;
  toUnit: string;
  toUnitBinary: string;
  decimalFactor: number;
  binaryFactor: number;
  decimalLabel: string;
  binaryLabel: string;
}

const conversionConfigs: Record<ConversionType, ConversionConfig> = {
  "byte-mb": {
    label: "Bytes ↔ MB",
    fromUnit: "Bytes",
    toUnit: "Megabytes (MB)",
    toUnitBinary: "Mebibytes (MiB)",
    decimalFactor: 1000000,
    binaryFactor: 1048576,
    decimalLabel: "1 MB = 1,000,000 bytes",
    binaryLabel: "1 MiB = 1,048,576 bytes",
  },
  "byte-kb": {
    label: "Bytes ↔ KB",
    fromUnit: "Bytes",
    toUnit: "Kilobytes (KB)",
    toUnitBinary: "Kibibytes (KiB)",
    decimalFactor: 1000,
    binaryFactor: 1024,
    decimalLabel: "1 KB = 1,000 bytes",
    binaryLabel: "1 KiB = 1,024 bytes",
  },
  "byte-gb": {
    label: "Bytes ↔ GB",
    fromUnit: "Bytes",
    toUnit: "Gigabytes (GB)",
    toUnitBinary: "Gibibytes (GiB)",
    decimalFactor: 1000000000,
    binaryFactor: 1073741824,
    decimalLabel: "1 GB = 1,000,000,000 bytes",
    binaryLabel: "1 GiB = 1,073,741,824 bytes",
  },
  "kb-mb": {
    label: "KB ↔ MB",
    fromUnit: "Kilobytes (KB)",
    toUnit: "Megabytes (MB)",
    toUnitBinary: "Mebibytes (MiB)",
    decimalFactor: 1000,
    binaryFactor: 1024,
    decimalLabel: "1 MB = 1,000 KB",
    binaryLabel: "1 MiB = 1,024 KiB",
  },
  "kb-gb": {
    label: "KB ↔ GB",
    fromUnit: "Kilobytes (KB)",
    toUnit: "Gigabytes (GB)",
    toUnitBinary: "Gibibytes (GiB)",
    decimalFactor: 1000000,
    binaryFactor: 1048576,
    decimalLabel: "1 GB = 1,000,000 KB",
    binaryLabel: "1 GiB = 1,048,576 KiB",
  },
  "mb-gb": {
    label: "MB ↔ GB",
    fromUnit: "Megabytes (MB)",
    toUnit: "Gigabytes (GB)",
    toUnitBinary: "Gibibytes (GiB)",
    decimalFactor: 1000,
    binaryFactor: 1024,
    decimalLabel: "1 GB = 1,000 MB",
    binaryLabel: "1 GiB = 1,024 MiB",
  },
  "gb-tb": {
    label: "GB ↔ TB",
    fromUnit: "Gigabytes (GB)",
    toUnit: "Terabytes (TB)",
    toUnitBinary: "Tebibytes (TiB)",
    decimalFactor: 1000,
    binaryFactor: 1024,
    decimalLabel: "1 TB = 1,000 GB",
    binaryLabel: "1 TiB = 1,024 GiB",
  },
};

const Converter = ({ type }: { type: ConversionType }) => {
  const [inputValue, setInputValue] = useState("");
  const [isReversed, setIsReversed] = useState(false);
  const [copiedDecimal, setCopiedDecimal] = useState(false);
  const [copiedBinary, setCopiedBinary] = useState(false);

  const config = conversionConfigs[type];

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
      // Reverse conversion (e.g., MB to Bytes)
      const decimalResult = numValue * config.decimalFactor;
      const binaryResult = numValue * config.binaryFactor;
      return {
        decimal: formatNumber(decimalResult),
        binary: formatNumber(binaryResult),
      };
    } else {
      // Forward conversion (e.g., Bytes to MB)
      const decimalResult = numValue / config.decimalFactor;
      const binaryResult = numValue / config.binaryFactor;
      return {
        decimal: formatNumber(decimalResult),
        binary: formatNumber(binaryResult),
      };
    }
  };

  const results = calculateConversions();

  const handleCopy = async (text: string, type: "decimal" | "binary") => {
    await navigator.clipboard.writeText(text);
    if (type === "decimal") {
      setCopiedDecimal(true);
      setTimeout(() => setCopiedDecimal(false), 2000);
    } else {
      setCopiedBinary(true);
      setTimeout(() => setCopiedBinary(false), 2000);
    }
  };

  const handleSwap = () => {
    setIsReversed(!isReversed);
    setInputValue("");
  };

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="space-y-2">
        <label htmlFor={`converter-input-${type}`} className="text-sm font-medium text-muted-foreground">
          {isReversed ? config.toUnit.split(" (")[0] : config.fromUnit}
        </label>
        <Input
          id={`converter-input-${type}`}
          type="text"
          placeholder={`Enter ${isReversed ? config.toUnit.split(" (")[0].toLowerCase() : config.fromUnit.toLowerCase()}...`}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="h-14 text-lg font-medium transition-all duration-300 focus:scale-[1.01] focus:shadow-lg focus:shadow-primary/10 border-primary/20 focus:border-primary/40"
          autoComplete="off"
        />
      </div>

      {/* Swap Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleSwap}
          variant="outline"
          size="icon"
          className="rounded-full h-12 w-12 transition-all duration-500 hover:rotate-180 hover:scale-110 hover:shadow-lg hover:shadow-primary/20 border-primary/30 hover:border-primary hover:bg-primary/5"
          aria-label="Swap conversion direction"
        >
          <ArrowLeftRight className="h-5 w-5 text-primary" />
        </Button>
      </div>

      {/* Results Section */}
      <div className="space-y-4">
        {/* Decimal Result */}
        <div className="group p-5 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02] hover:border-primary/40">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-primary/80 mb-2 flex items-center gap-2">
                {isReversed ? `${config.fromUnit} (Decimal)` : `${config.toUnit} - Decimal`}
                <span className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary">Decimal</span>
              </p>
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent truncate transition-transform duration-300 group-hover:scale-105">
                {results.decimal}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {config.decimalLabel}
              </p>
            </div>
            <Button
              onClick={() => handleCopy(results.decimal, "decimal")}
              variant="ghost"
              size="icon"
              className="shrink-0 transition-all duration-300 hover:bg-primary/10 hover:scale-110"
              aria-label="Copy to clipboard"
            >
              {copiedDecimal ? (
                <Check className="h-5 w-5 text-accent animate-scale-in" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Binary Result */}
        <div className="group p-5 rounded-xl bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/20 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10 hover:scale-[1.02] hover:border-accent/40">
          <div className="flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-accent/80 mb-2 flex items-center gap-2">
                {isReversed ? `${config.fromUnit} (Binary)` : `${config.toUnitBinary} - Binary`}
                <span className="px-2 py-0.5 text-xs rounded-full bg-accent/10 text-accent">Binary</span>
              </p>
              <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent truncate transition-transform duration-300 group-hover:scale-105">
                {results.binary}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {config.binaryLabel}
              </p>
            </div>
            <Button
              onClick={() => handleCopy(results.binary, "binary")}
              variant="ghost"
              size="icon"
              className="shrink-0 transition-all duration-300 hover:bg-accent/10 hover:scale-110"
              aria-label="Copy to clipboard"
            >
              {copiedBinary ? (
                <Check className="h-5 w-5 text-accent animate-scale-in" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ByteConverter = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto p-6 md:p-8 shadow-xl shadow-primary/5 bg-card border-primary/10 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
      <Tabs defaultValue="byte-mb" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 mb-6 bg-muted/50 p-1">
          <TabsTrigger value="byte-mb" className="text-xs transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-md">B ↔ MB</TabsTrigger>
          <TabsTrigger value="byte-kb" className="text-xs transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-md">B ↔ KB</TabsTrigger>
          <TabsTrigger value="byte-gb" className="text-xs transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-md">B ↔ GB</TabsTrigger>
          <TabsTrigger value="kb-mb" className="text-xs transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-md">KB ↔ MB</TabsTrigger>
          <TabsTrigger value="kb-gb" className="text-xs transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-md">KB ↔ GB</TabsTrigger>
          <TabsTrigger value="mb-gb" className="text-xs transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-md">MB ↔ GB</TabsTrigger>
          <TabsTrigger value="gb-tb" className="text-xs transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white data-[state=active]:shadow-md">GB ↔ TB</TabsTrigger>
        </TabsList>
        
        <TabsContent value="byte-mb">
          <Converter type="byte-mb" />
        </TabsContent>
        <TabsContent value="byte-kb">
          <Converter type="byte-kb" />
        </TabsContent>
        <TabsContent value="byte-gb">
          <Converter type="byte-gb" />
        </TabsContent>
        <TabsContent value="kb-mb">
          <Converter type="kb-mb" />
        </TabsContent>
        <TabsContent value="kb-gb">
          <Converter type="kb-gb" />
        </TabsContent>
        <TabsContent value="mb-gb">
          <Converter type="mb-gb" />
        </TabsContent>
        <TabsContent value="gb-tb">
          <Converter type="gb-tb" />
        </TabsContent>
      </Tabs>
    </Card>
  );
};
