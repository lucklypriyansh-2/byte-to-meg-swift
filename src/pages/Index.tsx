import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ByteConverter } from "@/components/ByteConverter";
import { ConversionTable } from "@/components/ConversionTable";
import { ExplanationPanel } from "@/components/ExplanationPanel";
import { DesignGuidesSection } from "@/components/DesignGuidesSection";
import { Footer } from "@/components/Footer";
import { BookOpen, Wrench } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("learn");

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
        "Master system design with interactive guides for Feature Flags, Scaling, OpenSearch, Machine Learning and more. Convert bytes to MB with instant precision.",
    });
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative px-4 py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 -z-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-500/5 to-blue-500/5 rounded-full blur-3xl -z-10" />
        
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 animate-fade-in">
            <div className="px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border border-teal-500/30">
              <span className="text-sm font-semibold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                ⚡ Master System Design & Data Conversions
              </span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
            Ace <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">Every Stage</span> of Your <span className="bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent">Technical Interview</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Learn system design patterns with step-by-step interactive guides. Convert bytes instantly. Built by engineers for engineers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setActiveTab("learn")}
              className="px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-105">
              Start Learning Today
            </button>
            <button 
              onClick={() => setActiveTab("tools")}
              className="px-8 py-4 border-2 border-teal-500/30 text-foreground font-semibold rounded-full hover:bg-teal-500/10 transition-all duration-300">
              Explore Tools
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="px-4 py-12 md:py-16">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <TabsList className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 p-2">
                <TabsTrigger 
                  value="learn"
                  className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                >
                  <BookOpen className="w-4 h-4" />
                  Learn System Design
                </TabsTrigger>
                <TabsTrigger 
                  value="tools"
                  className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                >
                  <Wrench className="w-4 h-4" />
                  Conversion Tools
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Learning Tab */}
            <TabsContent value="learn" className="animate-in fade-in duration-300">
              <DesignGuidesSection />
            </TabsContent>

            {/* Tools Tab */}
            <TabsContent value="tools" className="animate-in fade-in duration-300">
              <div className="space-y-16">
                {/* Converter Section */}
                <div className="bg-gradient-to-br from-card/50 to-card/30 border border-border/50 rounded-2xl p-8 md:p-12">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                      Byte Converter
                    </h2>
                    <p className="text-muted-foreground text-lg">Convert bytes to MB with precision instantly</p>
                  </div>
                  <ByteConverter />
                </div>

                {/* Explanation */}
                <div className="bg-gradient-to-br from-card/50 to-card/30 border border-border/50 rounded-2xl p-8 md:p-12">
                  <ExplanationPanel />
                </div>

                {/* Conversion Table */}
                <div className="bg-gradient-to-br from-card/50 to-card/30 border border-border/50 rounded-2xl p-8 md:p-12">
                  <ConversionTable />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
