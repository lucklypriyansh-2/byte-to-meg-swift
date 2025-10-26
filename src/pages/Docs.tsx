import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Code, Database, Zap, Brain, GitBranch, Flag, BarChart3 } from "lucide-react";
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

const Docs = () => {
  const navigate = useNavigate();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Update page title and meta description
    document.title = "System Design Documentation - Complete Technical Guides | ByteToMeg";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Complete system design documentation with real-world examples from Uber, Netflix, Airbnb. Learn scalable architecture patterns and best practices.");
    }

    loadGuides();
  }, []);

  const loadGuides = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getGuides();
      setGuides(data.filter((guide: Guide) => guide.published));
    } catch (error: any) {
      console.error("Failed to load guides:", error);
      setError("Failed to load guides. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Flag, BarChart3, Database, Brain, Zap, GitBranch, BookOpen, Code
    };
    return icons[iconName] || BookOpen;
  };

  const getDifficultyFromSteps = (steps: string[]) => {
    const count = steps.length;
    if (count <= 3) return "Beginner";
    if (count <= 5) return "Intermediate";
    return "Advanced";
  };

  const getEstimatedTime = (steps: string[]) => {
    const count = steps.length;
    return `${count * 8}-${count * 10} min`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              System Design <span className="text-primary">Documentation</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete technical guides and documentation for building scalable systems. Learn from real-world examples and industry best practices.
            </p>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Documentation Sections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="w-10 h-10 bg-muted rounded-lg mb-3"></div>
                    <div className="h-6 bg-muted rounded mb-2"></div>
                    <div className="h-4 bg-muted rounded"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-4 bg-muted rounded w-32"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Error State */}
      {error && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-destructive mb-4">{error}</p>
            <button 
              onClick={loadGuides}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
            >
              Try Again
            </button>
          </div>
        </section>
      )}

      {/* Documentation Sections */}
      {!loading && !error && (
        <>
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Documentation Sections</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guides.map((guide) => {
                  const IconComponent = getIconComponent(guide.icon);
                  return (
                    <Card 
                      key={guide.id} 
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => navigate(`/guide/${guide.guide_id}`)}
                    >
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            {React.createElement(IconComponent, { className: "w-5 h-5 text-primary" })}
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary">{guide.company}</Badge>
                            <Badge variant="outline">{getDifficultyFromSteps(guide.steps)}</Badge>
                          </div>
                        </div>
                        <CardTitle className="text-xl">{guide.title}</CardTitle>
                        <CardDescription className="text-base">{guide.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>Estimated time: {getEstimatedTime(guide.steps)}</span>
                          <span className="text-primary font-medium">Read More →</span>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Quick Start Guide */}
          <section className="py-16 bg-muted/30">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Quick Start Guide</h2>
              <div className="space-y-6">
                {guides.slice(0, 3).map((guide, index) => (
                  <Card 
                    key={guide.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => navigate(`/guide/${guide.guide_id}`)}
                  >
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-3">{index + 1}. {guide.title}</h3>
                      <p className="text-muted-foreground mb-4">
                        {guide.description}
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="outline">{guide.company}</Badge>
                        <Badge variant="outline">{guide.users} users</Badge>
                        <Badge variant="outline">{guide.steps.length} steps</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Docs;