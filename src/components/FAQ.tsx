import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect } from "react";

const faqs = [
  {
    question: "Is MB the same as MiB?",
    answer:
      "No, MB (megabyte) and MiB (mebibyte) are different. 1 MB = 1,000,000 bytes (decimal system), while 1 MiB = 1,048,576 bytes (binary system). MiB is more accurate for computer memory and storage.",
  },
  {
    question: "Why does my storage size differ from what's advertised?",
    answer:
      "Manufacturers typically use decimal MB (1 MB = 1,000,000 bytes), while operating systems often display binary MiB (1 MiB = 1,048,576 bytes). This creates a ~4.86% difference, making a advertised 1 GB drive show as approximately 0.931 GiB in your OS.",
  },
  {
    question: "How do I convert bytes to MB in Python?",
    answer:
      "In Python, divide bytes by 1,000,000 for decimal MB: `mb = bytes / 1_000_000`, or divide by 1,048,576 for binary MiB: `mib = bytes / 1_048_576`.",
  },
  {
    question: "How do I convert bytes to MB in JavaScript?",
    answer:
      "In JavaScript, use: `const mb = bytes / 1000000` for decimal MB, or `const mib = bytes / 1048576` for binary MiB. You can format the result with `toFixed(2)` for two decimal places.",
  },
  {
    question: "What is the formula for bytes to megabytes?",
    answer:
      "For decimal megabytes (MB): divide bytes by 1,000,000. For binary mebibytes (MiB): divide bytes by 1,048,576. Example: 5,000,000 bytes = 5 MB or 4.768 MiB.",
  },
  {
    question: "Which unit should I use: MB or MiB?",
    answer:
      "Use MB for file sizes, network speeds, and general data transfer. Use MiB for RAM, cache, and internal computer storage where binary accuracy matters. Most modern documentation prefers using MiB for clarity.",
  },
];

export const FAQ = () => {
  useEffect(() => {
    // Add FAQ schema for SEO
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 md:p-8 shadow-xl shadow-primary/5 bg-card border-primary/10 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border border-primary/10 rounded-lg px-4 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:shadow-primary/10 data-[state=open]:border-primary/40 data-[state=open]:shadow-lg data-[state=open]:shadow-primary/10"
          >
            <AccordionTrigger className="text-left font-semibold hover:text-primary transition-colors duration-300">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
};
