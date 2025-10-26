import { useState } from "react";
import { ChevronRight, Zap, Database, Brain, Flag, GitBranch, Settings, BarChart3 } from "lucide-react";
import { DesignGuideModal } from "./DesignGuideModal";

interface Guide {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  steps: string[];
  details: string;
}

const guides: Guide[] = [
  {
    id: "feature-flags",
    title: "Feature Flag System",
    description: "Design a robust feature flag system for safe deployments and A/B testing",
    icon: <Flag className="w-6 h-6" />,
    color: "from-teal-500 to-cyan-500",
    steps: [
      "Define Requirements",
      "Flag Storage Design",
      "Evaluation Engine",
      "SDK Implementation",
      "Admin Dashboard",
      "Analytics & Monitoring",
    ],
    details:
      "A feature flag system allows you to enable/disable features without redeploying. Learn how to design a production-grade system that handles millions of evaluations per second.",
  },
  {
    id: "scaling",
    title: "Scale From Zero to Millions",
    description: "Learn techniques to scale systems from 1 user to millions of concurrent users",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "from-cyan-500 to-blue-500",
    steps: [
      "Single Server Setup",
      "Database Optimization",
      "Horizontal Scaling",
      "Load Balancing",
      "Caching Layer",
      "Distributed System Patterns",
    ],
    details:
      "Scaling is a journey that requires continuous refinement. Start with a simple setup, monitor, identify bottlenecks, and scale incrementally.",
  },
  {
    id: "opensearch",
    title: "OpenSearch Architecture",
    description: "Build a powerful search engine with OpenSearch for millions of documents",
    icon: <Database className="w-6 h-6" />,
    color: "from-blue-500 to-purple-500",
    steps: [
      "Understanding Search Basics",
      "Index Design",
      "Query Optimization",
      "Cluster Architecture",
      "Replication & Recovery",
      "Performance Tuning",
    ],
    details:
      "OpenSearch is a distributed search and analytics suite. Design an architecture that handles complex queries on massive datasets while maintaining low latency.",
  },
  {
    id: "machine-learning",
    title: "Machine Learning System",
    description: "Design end-to-end ML systems for production deployment and serving",
    icon: <Brain className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    steps: [
      "Problem Definition",
      "Data Pipeline",
      "Feature Engineering",
      "Model Training",
      "Model Serving",
      "Monitoring & Retraining",
    ],
    details:
      "ML systems are complex. Learn how to design data pipelines, train models at scale, and serve predictions in production with low latency.",
  },
  {
    id: "rate-limiter",
    title: "Rate Limiter",
    description: "Design a scalable rate limiting system for API protection",
    icon: <Zap className="w-6 h-6" />,
    color: "from-pink-500 to-red-500",
    steps: [
      "Requirements Analysis",
      "Algorithm Selection",
      "Distributed Rate Limiting",
      "State Management",
      "Configuration Management",
      "Monitoring",
    ],
    details:
      "Rate limiting protects your API from abuse. Design a system that accurately tracks usage across distributed servers.",
  },
  {
    id: "caching",
    title: "Distributed Caching",
    description: "Master caching strategies for high-performance distributed systems",
    icon: <GitBranch className="w-6 h-6" />,
    color: "from-red-500 to-orange-500",
    steps: [
      "Caching Basics",
      "Eviction Policies",
      "Consistency Issues",
      "Multi-level Caching",
      "Cache Invalidation",
      "Performance Optimization",
    ],
    details:
      "Caching is crucial for performance. Learn different strategies, trade-offs, and how to avoid common pitfalls.",
  },
];

export const DesignGuidesSection = () => {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGuideClick = (guide: Guide) => {
    setSelectedGuide(guide);
    setIsModalOpen(true);
  };

  return (
    <>
      <section className="relative px-4 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              System Design <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">Interactive Guides</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn system design with step-by-step guides, visualizations, and best practices
            </p>
          </div>

          {/* Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <div
                key={guide.id}
                onClick={() => handleGuideClick(guide)}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-card/50 to-card/30 border border-border/50 hover:border-border p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-foreground/10 hover:scale-105"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${guide.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10`} />

                {/* Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${guide.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {guide.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-teal-500 group-hover:to-cyan-500 group-hover:bg-clip-text transition-all">
                  {guide.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {guide.description}
                </p>

                {/* Steps Preview */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {guide.steps.slice(0, 2).map((step, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                    >
                      {step}
                    </span>
                  ))}
                  {guide.steps.length > 2 && (
                    <span className="text-xs text-muted-foreground px-2 py-1">
                      +{guide.steps.length - 2} more
                    </span>
                  )}
                </div>

                {/* Arrow Icon */}
                <div className="flex items-center text-sm font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                  Start Guide
                  <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div className="mt-16 pt-16 border-t border-border/50">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  50+
                </div>
                <p className="text-muted-foreground text-sm mt-2">System Design Concepts</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                  100+
                </div>
                <p className="text-muted-foreground text-sm mt-2">Step-by-Step Guides</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  1M+
                </div>
                <p className="text-muted-foreground text-sm mt-2">Engineers Learning</p>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  24/7
                </div>
                <p className="text-muted-foreground text-sm mt-2">Updated Content</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedGuide && (
        <DesignGuideModal
          guide={selectedGuide}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedGuide(null);
          }}
        />
      )}
    </>
  );
};
