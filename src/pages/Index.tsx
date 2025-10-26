import { useEffect, useState } from "react";
import { ByteConverter } from "@/components/ByteConverter";
import { ConversionTable } from "@/components/ConversionTable";
import { ExplanationPanel } from "@/components/ExplanationPanel";
import { DesignGuidesSection } from "@/components/DesignGuidesSection";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BookOpen, Calculator } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  useEffect(() => {
    // Add SoftwareApplication schema for SEO
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "ByteToMeg - System Design Guide & Byte Converter",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "1523",
      },
      description:
        "Master system design with interactive guides. Convert bytes to MB with instant precision.",
    });
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section - Above the fold */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Floating orbs background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] animate-float" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/10 blur-[120px] animate-float-delay" />
        </div>

        <div className="container mx-auto px-6 text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <Badge 
            variant="outline" 
            className="px-4 py-2 text-sm border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5 hover:from-primary/10 hover:to-accent/10 transition-all duration-300"
          >
            <Sparkles className="w-4 h-4 mr-2 text-primary" />
            System Design + Tools
          </Badge>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
            <span className="block mb-2">Learn System Design.</span>
            <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Convert Bytes Instantly.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-in-up animate-delay-100">
            Master industry-proven system design patterns while using powerful conversion tools.
            From URL shorteners to distributed caching — learn by doing.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-in-up animate-delay-200">
            <Button 
              size="lg"
              className="px-8 h-14 text-lg bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg shadow-primary/25"
              onClick={() => document.getElementById('guides')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Start Learning
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 h-14 text-lg border-2 border-primary/30 hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:scale-105"
              onClick={() => document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Calculator className="w-5 h-5 mr-2" />
              Try Converter
            </Button>
          </div>
        </div>
      </section>

      {/* Learning Navigation Tabs */}
      <section className="py-12 border-y bg-muted/30 backdrop-blur-sm sticky top-16 z-40">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="guides" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 h-14 bg-background/50 backdrop-blur-sm">
              <TabsTrigger value="guides" className="text-sm md:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white">
                Guides
              </TabsTrigger>
              <TabsTrigger value="patterns" className="text-sm md:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white">
                Patterns
              </TabsTrigger>
              <TabsTrigger value="tools" className="text-sm md:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white">
                Tools
              </TabsTrigger>
              <TabsTrigger value="quiz" className="text-sm md:text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-accent data-[state=active]:text-white">
                Quiz
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Design Guides Section */}
      <div id="guides">
        <DesignGuidesSection />
      </div>

      {/* Converter Tool Section */}
      <section id="converter" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Byte Converter Tool
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Convert between bytes, kilobytes, megabytes, gigabytes, and terabytes with both decimal and binary calculations
            </p>
          </div>
          <div className="animate-scale-in animate-delay-200">
            <ByteConverter />
          </div>
        </div>
      </section>

      {/* Explanation Panel */}
      <section className="py-20 px-6">
        <div className="container mx-auto animate-slide-in-up">
          <ExplanationPanel />
        </div>
      </section>

      {/* Conversion Table */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto animate-slide-in-up">
          <ConversionTable />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto animate-fade-in">
          <FAQ />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
