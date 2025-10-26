import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ChevronDown } from "lucide-react";

interface Guide {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  steps: string[];
  details: string;
}

interface DesignGuideModalProps {
  guide: Guide;
  isOpen: boolean;
  onClose: () => void;
}

const stepDetails: Record<string, Record<string, string>> = {
  "feature-flags": {
    "Define Requirements":
      "Understand scope: boolean flags, multi-variant flags, user targeting, performance SLAs, and consistency requirements.",
    "Flag Storage Design": "Choose storage: database, cache, or feature flag service. Consider consistency, latency, and scalability.",
    "Evaluation Engine": "Build the core evaluation logic: rule matching, user segmentation, percentage rollout, and fallback strategies.",
    "SDK Implementation": "Create SDKs in different languages for seamless integration into your applications.",
    "Admin Dashboard": "Build a UI to manage flags: create, update, delete, and monitor flag usage and impact.",
    "Analytics & Monitoring": "Track flag evaluations, user impact, and performance metrics for data-driven decisions.",
  },
  scaling: {
    "Single Server Setup":
      "Start simple: web server, application, and database on a single machine. Monitor bottlenecks.",
    "Database Optimization":
      "Use indexes, query optimization, denormalization when needed. Consider read replicas for scaling reads.",
    "Horizontal Scaling": "Add load balancers to distribute traffic across multiple servers. Use session management strategies.",
    "Load Balancing":
      "Implement layer 4 (TCP/UDP) or layer 7 (HTTP) load balancing. Consider sticky sessions for stateful apps.",
    "Caching Layer": "Add Redis or Memcached to reduce database load. Implement cache invalidation strategies.",
    "Distributed System Patterns":
      "Master consistency models, consensus protocols, and distributed tracing for reliable systems at scale.",
  },
  opensearch: {
    "Understanding Search Basics": "Learn how full-text search works: tokenization, stemming, relevance scoring, and query parsing.",
    "Index Design": "Understand shards, replicas, and mappings. Design indexes for your use case: time-series, documents, or logs.",
    "Query Optimization": "Write efficient queries: filters, aggregations, and caching. Understand query DSL and search best practices.",
    "Cluster Architecture":
      "Design multi-node clusters: master nodes, data nodes, and client nodes. Plan for high availability.",
    "Replication & Recovery":
      "Implement replication for fault tolerance. Design backup and recovery procedures.",
    "Performance Tuning": "Monitor metrics, optimize heap, tune refresh intervals, and use bulk APIs for ingestion.",
  },
  "machine-learning": {
    "Problem Definition": "Clearly define: objective, success metrics, constraints, and data requirements before building.",
    "Data Pipeline": "Build robust pipelines: data ingestion, cleaning, validation, and versioning. Handle skewed data.",
    "Feature Engineering":
      "Create meaningful features from raw data. Balance feature richness with computational efficiency.",
    "Model Training": "Train models at scale using distributed frameworks. Handle hyperparameter tuning and cross-validation.",
    "Model Serving": "Deploy models with low-latency inference. Use model servers like TensorFlow Serving or TorchServe.",
    "Monitoring & Retraining":
      "Monitor model performance, detect data drift, and retrain periodically. Build feedback loops.",
  },
  "rate-limiter": {
    "Requirements Analysis":
      "Define limits: per user, per IP, per endpoint. Understand precision vs. memory trade-offs.",
    "Algorithm Selection":
      "Choose algorithm: Token Bucket, Sliding Window, or Leaky Bucket. Understand trade-offs.",
    "Distributed Rate Limiting":
      "Handle rate limiting across distributed servers. Use Redis for centralized state.",
    "State Management": "Store rate limit state efficiently. Handle edge cases: retries, race conditions.",
    "Configuration Management": "Make limits configurable without redeployment. Support dynamic updates.",
    "Monitoring": "Track rate limit violations and their impact. Alert on unusual patterns.",
  },
  caching: {
    "Caching Basics": "Understand cache hit/miss, cache sizes, and different caching patterns: aside, write-through, write-back.",
    "Eviction Policies":
      "Learn LRU, LFU, FIFO, and other policies. Choose based on your workload characteristics.",
    "Consistency Issues":
      "Understand cache invalidation challenges. Handle stale data and synchronization issues.",
    "Multi-level Caching":
      "Implement caches at different levels: CDN, application, database. Design coherence strategies.",
    "Cache Invalidation":
      "Master invalidation techniques: TTL, event-based, versioning. Handle cache stampede.",
    "Performance Optimization": "Profile cache performance. Optimize hit rates and reduce memory usage.",
  },
};

export const DesignGuideModal = ({
  guide,
  isOpen,
  onClose,
}: DesignGuideModalProps) => {
  const [expandedStep, setExpandedStep] = useState<string | null>(guide.steps[0]);
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className={`relative p-8 bg-gradient-to-r ${guide.color} text-white`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
              {guide.icon}
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-2">{guide.title}</h2>
              <p className="text-white/90 text-lg">{guide.description}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Overview */}
          <div className="mb-8 p-4 bg-muted/50 rounded-xl border border-border/50">
            <p className="text-foreground leading-relaxed">{guide.details}</p>
          </div>

          {/* Steps */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-6">Step-by-Step Guide</h3>

            <div className="space-y-4">
              {guide.steps.map((step, index) => {
                const stepKey = `${guide.id}-${step}`;
                const isExpanded = expandedStep === step;
                const details =
                  stepDetails[guide.id]?.[step] ||
                  `Learn more about ${step} and its implementation details.`;

                return (
                  <div
                    key={stepKey}
                    className="border border-border/50 rounded-xl overflow-hidden hover:border-border/100 transition-colors"
                  >
                    <button
                      onClick={() =>
                        setExpandedStep(isExpanded ? null : step)
                      }
                      className="w-full p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-bold flex items-center justify-center">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{step}</h4>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-muted-foreground transition-transform ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-0 border-t border-border/50 bg-muted/30">
                        <p className="text-foreground/90 leading-relaxed">
                          {details}
                        </p>

                        {/* Step-specific tips */}
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <p className="text-sm font-semibold text-muted-foreground mb-2">
                            Key Considerations:
                          </p>
                          <ul className="space-y-1 text-sm text-foreground/80">
                            <li className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>Focus on the fundamentals before optimizing</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>
                                Consider trade-offs: simplicity vs. performance
                              </span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>Test thoroughly before production deployment</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4 pt-8 border-t border-border/50">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-border rounded-lg font-semibold hover:bg-muted/50 transition-colors"
            >
              Close
            </button>
            <button 
              onClick={() => {
                onClose(); // Close the modal first
                navigate(`/guide/${guide.id}`); // Navigate to the full guide page
              }}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-teal-500/50 transition-all"
            >
              View Full Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
