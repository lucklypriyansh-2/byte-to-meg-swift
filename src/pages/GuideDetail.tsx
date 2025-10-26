import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Clock, Users, BookOpen, Code, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

const guideData = {
  "feature-flags": {
    title: "Feature Flag System Design",
    description: "Design a robust feature flag system for safe deployments and A/B testing",
    duration: "45 min read",
    difficulty: "Intermediate",
    steps: [
      {
        title: "Define Requirements",
        content: "Understand scope: boolean flags, multi-variant flags, user targeting, performance SLAs, and consistency requirements.",
        details: [
          "Identify use cases: Canary deployments, A/B testing, emergency rollbacks",
          "Define user segmentation: geography, user type, percentage rollout",
          "Set performance requirements: <10ms evaluation time, 99.9% uptime",
          "Plan consistency model: eventual vs strong consistency"
        ]
      },
      {
        title: "Flag Storage Design",
        content: "Choose storage: database, cache, or feature flag service. Consider consistency, latency, and scalability.",
        details: [
          "Database options: PostgreSQL, MySQL for persistence",
          "Cache layer: Redis for fast reads",
          "Feature flag service: LaunchDarkly, Split.io for managed solution",
          "Consider data volume: millions of flags, billions of evaluations"
        ]
      },
      {
        title: "Evaluation Engine",
        content: "Build the core evaluation logic: rule matching, user segmentation, percentage rollout, and fallback strategies.",
        details: [
          "Rule engine: JSON-based rules for complex conditions",
          "User context: user ID, attributes, environment",
          "Percentage rollout: consistent hashing for stable user assignment",
          "Fallback strategy: default values when evaluation fails"
        ]
      },
      {
        title: "SDK Implementation",
        content: "Create SDKs in different languages for seamless integration into your applications.",
        details: [
          "Client SDKs: JavaScript, Python, Java, Go",
          "Server SDKs: Node.js, .NET, PHP",
          "Mobile SDKs: iOS, Android with offline support",
          "Configuration: polling vs streaming updates"
        ]
      },
      {
        title: "Admin Dashboard",
        content: "Build a UI to manage flags: create, update, delete, and monitor flag usage and impact.",
        details: [
          "Flag management: CRUD operations with validation",
          "User targeting: visual rule builder",
          "Audit trail: track all flag changes",
          "Real-time monitoring: flag evaluation metrics"
        ]
      },
      {
        title: "Analytics & Monitoring",
        content: "Track flag evaluations, user impact, and performance metrics for data-driven decisions.",
        details: [
          "Evaluation metrics: success rate, latency, error rate",
          "Business metrics: conversion rate, user engagement",
          "Alerting: automated alerts for anomalies",
          "Reporting: dashboards for stakeholders"
        ]
      }
    ]
  }
};

export const GuideDetail = () => {
  const { guideId } = useParams<{ guideId: string }>();
  const navigate = useNavigate();
  
  const guide = guideId ? guideData[guideId as keyof typeof guideData] : null;

  if (!guide) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Guide Not Found</h1>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{guide.title}</h1>
              <p className="text-muted-foreground">{guide.description}</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {guide.duration}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {guide.difficulty}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {guide.steps.map((step, index) => (
            <div key={index} className="bg-card border border-border/50 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {step.content}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                      <Lightbulb className="w-4 h-4" />
                      Key Implementation Details:
                    </h4>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start gap-2 text-sm">
                          <span className="text-primary mt-1">•</span>
                          <span className="text-foreground/90">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 p-6 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-2">Ready to implement?</h3>
          <p className="text-muted-foreground mb-4">
            Start building your feature flag system with confidence using this comprehensive guide.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
            >
              Explore More Guides
            </Button>
            <Button
              onClick={() => window.open("https://github.com", "_blank")}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:shadow-lg hover:shadow-teal-500/50"
            >
              View Code Examples
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
