import { useEffect } from "react";
import { Header } from "@/components/Header";
import { ByteConverter } from "@/components/ByteConverter";
import { ExplanationPanel } from "@/components/ExplanationPanel";
import { ConversionTable } from "@/components/ConversionTable";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Add SoftwareApplication schema for SEO
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "ByteTomb - Byte to MB Converter",
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
        "Fast and accurate byte to megabyte converter supporting both decimal MB and binary MiB conversions with instant results.",
    });
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="bg-background">
      <div className="w-full px-4 pb-12">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center py-8 md:py-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Byte to MB Converter
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Convert bytes to megabytes instantly. Supports both decimal (MB) and binary (MiB) conversions with precision.
          </p>
        </section>

        {/* Converter */}
        <section className="mb-12 md:mb-16">
          <ByteConverter />
        </section>

        {/* Explanation */}
        <section className="mb-12 md:mb-16">
          <ExplanationPanel />
        </section>

        {/* Conversion Table */}
        <section className="mb-12 md:mb-16">
          <ConversionTable />
        </section>

        {/* FAQ */}
        <section className="mb-12 md:mb-16">
          <FAQ />
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
