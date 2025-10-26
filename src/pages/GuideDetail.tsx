import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Clock, Users, BookOpen, Code, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { apiService } from "@/services/api";

interface Guide {
  id: number;
  guide_id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  steps: string[];
  details: string;
  company: string;
  users: string;
  published: boolean;
}

export const GuideDetail = () => {
  const { guideId } = useParams<{ guideId: string }>();
  const navigate = useNavigate();
  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuide = async () => {
      if (!guideId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await apiService.getGuide(guideId);
        setGuide(data);
        
        // Update page title and meta description based on guide
        document.title = `${data.title} - Complete System Design Guide | ByteToMeg`;
        
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute("content", `${data.description} Learn step-by-step implementation with real-world examples and best practices.`);
        }
      } catch (err: any) {
        console.error("Failed to fetch guide:", err);
        setError(err.message || "Failed to load guide");
      } finally {
        setLoading(false);
      }
    };

    fetchGuide();
  }, [guideId]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading guide...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-destructive">Error Loading Guide</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <div className="flex gap-4 justify-center">
            <Button onClick={() => navigate("/")}>Back to Home</Button>
            <Button onClick={() => window.location.reload()} variant="outline">Try Again</Button>
          </div>
        </div>
      </div>
    );
  }

  // Not found state
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
              {guide.company && (
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  {guide.company}
                </div>
              )}
              {guide.users && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {guide.users}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Overview */}
        {guide.details && (
          <div className="mb-8 p-6 bg-card border border-border/50 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-foreground leading-relaxed">{guide.details}</p>
          </div>
        )}

        {/* Steps */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Step-by-Step Guide</h2>
          <div className="space-y-6">
            {guide.steps.map((step, index) => (
              <div key={index} className="bg-card border border-border/50 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3">{step}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Follow this step to implement {step.toLowerCase()} in your system.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-12 p-6 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 rounded-xl text-center">
          <h3 className="text-xl font-semibold mb-2">Ready to implement?</h3>
          <p className="text-muted-foreground mb-4">
            Start building your system with confidence using this comprehensive guide from {guide.company || 'real-world'} architecture.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
            >
              Explore More Guides
            </Button>
            <Button
              onClick={() => navigate("/docs")}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:shadow-lg hover:shadow-teal-500/50"
            >
              View Documentation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
