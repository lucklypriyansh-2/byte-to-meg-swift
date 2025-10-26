import { useState } from "react";
import { Database, Globe, Lock, Zap, Server, Box, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DesignGuideModal } from "./DesignGuideModal";

interface Guide {
  id: string;
  title: string;
  description: string;
  icon: any;
  step: number;
  gradient: string;
  content: {
    overview: string;
    steps: { title: string; content: string }[];
  };
}

const guides: Guide[] = [
  {
    id: "url-shortener",
    title: "URL Shortener",
    description: "Design a scalable URL shortening service like bit.ly with custom aliases and analytics.",
    icon: Globe,
    step: 1,
    gradient: "from-primary to-accent",
    content: {
      overview: "Learn how to design a URL shortening service that can handle millions of requests per second.",
      steps: [
        {
          title: "Requirements Analysis",
          content: "Understand functional requirements (URL shortening, custom aliases, expiration) and non-functional requirements (high availability, low latency, analytics)."
        },
        {
          title: "API Design",
          content: "Design RESTful endpoints for creating short URLs, redirecting, and managing analytics."
        },
        {
          title: "Database Schema",
          content: "Choose between SQL and NoSQL. Design tables for URLs, users, and analytics with proper indexing."
        },
        {
          title: "Scaling Strategy",
          content: "Implement caching, load balancing, and sharding to handle high traffic."
        }
      ]
    }
  },
  {
    id: "caching",
    title: "Caching Strategies",
    description: "Master caching patterns including cache-aside, write-through, and distributed caching.",
    icon: Zap,
    step: 2,
    gradient: "from-accent to-primary",
    content: {
      overview: "Explore different caching strategies and when to use each pattern for optimal performance.",
      steps: [
        {
          title: "Cache-Aside Pattern",
          content: "Application checks cache first, then loads from database if miss. Best for read-heavy workloads."
        },
        {
          title: "Write-Through Pattern",
          content: "Data written to cache and database simultaneously. Ensures consistency but adds latency."
        },
        {
          title: "Write-Behind Pattern",
          content: "Write to cache immediately, database asynchronously. Best for write-heavy workloads."
        },
        {
          title: "Cache Eviction",
          content: "Implement LRU, LFU, or TTL-based eviction policies based on your use case."
        }
      ]
    }
  },
  {
    id: "message-queue",
    title: "Message Queues",
    description: "Implement asynchronous communication patterns with message queues and pub/sub systems.",
    icon: Server,
    step: 3,
    gradient: "from-primary via-accent to-primary",
    content: {
      overview: "Design reliable message queue systems for decoupling services and handling async operations.",
      steps: [
        {
          title: "Queue vs Pub/Sub",
          content: "Understand the difference between point-to-point queues and publish-subscribe patterns."
        },
        {
          title: "Message Delivery",
          content: "Implement at-least-once, at-most-once, or exactly-once delivery guarantees."
        },
        {
          title: "Dead Letter Queues",
          content: "Handle failed messages with retry logic and dead letter queues for debugging."
        },
        {
          title: "Scaling Consumers",
          content: "Design consumer groups and partition strategies for horizontal scaling."
        }
      ]
    }
  },
  {
    id: "database-sharding",
    title: "Database Sharding",
    description: "Scale databases horizontally with sharding strategies and partition techniques.",
    icon: Database,
    step: 4,
    gradient: "from-accent to-primary",
    content: {
      overview: "Learn how to partition data across multiple databases to handle massive scale.",
      steps: [
        {
          title: "Sharding Strategies",
          content: "Choose between range-based, hash-based, or geo-based sharding for your use case."
        },
        {
          title: "Shard Key Selection",
          content: "Pick the right shard key to ensure even distribution and minimize cross-shard queries."
        },
        {
          title: "Resharding",
          content: "Plan for resharding when adding or removing shards without downtime."
        },
        {
          title: "Cross-Shard Queries",
          content: "Handle queries spanning multiple shards with scatter-gather patterns."
        }
      ]
    }
  },
  {
    id: "api-gateway",
    title: "API Gateway",
    description: "Design API gateways for routing, authentication, rate limiting, and monitoring.",
    icon: Lock,
    step: 5,
    gradient: "from-primary to-accent",
    content: {
      overview: "Build a robust API gateway to manage microservices communication and security.",
      steps: [
        {
          title: "Request Routing",
          content: "Implement dynamic routing based on paths, headers, or service discovery."
        },
        {
          title: "Authentication & Authorization",
          content: "Centralize auth with JWT, OAuth, or API keys at the gateway level."
        },
        {
          title: "Rate Limiting",
          content: "Protect backend services with token bucket or sliding window algorithms."
        },
        {
          title: "Monitoring & Logging",
          content: "Implement distributed tracing and request logging for observability."
        }
      ]
    }
  },
  {
    id: "microservices",
    title: "Microservices Architecture",
    description: "Break down monoliths into scalable, independently deployable microservices.",
    icon: Box,
    step: 6,
    gradient: "from-accent via-primary to-accent",
    content: {
      overview: "Learn patterns and best practices for designing microservices architectures.",
      steps: [
        {
          title: "Service Boundaries",
          content: "Define bounded contexts using domain-driven design principles."
        },
        {
          title: "Communication Patterns",
          content: "Choose between synchronous REST/gRPC and asynchronous message queues."
        },
        {
          title: "Data Management",
          content: "Implement database per service pattern and handle distributed transactions."
        },
        {
          title: "Service Discovery",
          content: "Use service registries and health checks for dynamic service location."
        }
      ]
    }
  }
];

export const DesignGuidesSection = () => {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);

  return (
    <>
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Master System Design
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Learn industry-proven patterns and architectures used by top tech companies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <Card
                key={guide.id}
                className="p-6 hover-lift cursor-pointer group border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedGuide(guide)}
              >
                <div className="space-y-4">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${guide.gradient} p-0.5`}>
                    <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                      <guide.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  {/* Title & Badge */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        Step {guide.step}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {guide.description}
                    </p>
                  </div>

                  {/* CTA */}
                  <Button
                    variant="ghost"
                    className="w-full justify-between group-hover:bg-primary/10 transition-all"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <DesignGuideModal
        guide={selectedGuide}
        open={!!selectedGuide}
        onOpenChange={(open) => !open && setSelectedGuide(null)}
      />
    </>
  );
};
