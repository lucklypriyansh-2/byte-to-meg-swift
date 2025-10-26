import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, CheckCircle, Users, TrendingUp, Clock } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Update page title and meta description
    document.title = "Engineering Newsletter - System Design Insights & Updates | ByteToMeg";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Subscribe to our engineering newsletter for weekly system design insights, real-world case studies, and industry updates from tech giants.");
    }
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await apiService.subscribeNewsletter(email);
      setIsSubscribed(true);
      setEmail("");
    } catch (error: any) {
      console.error("Newsletter subscription failed:", error);
      // You could add error state handling here
    } finally {
      setLoading(false);
    }
  };

  const newsletterStats = [
    { icon: Users, label: "Subscribers", value: "15,000+" },
    { icon: TrendingUp, label: "Growth Rate", value: "25%" },
    { icon: Clock, label: "Delivery", value: "Weekly" }
  ];

  const recentIssues = [
    {
      title: "Uber's Real-Time Matching: Lessons from 100M+ Rides",
      date: "2024-01-15",
      readTime: "8 min",
      featured: true
    },
    {
      title: "Netflix's Microservices Evolution: From Monolith to Global Scale",
      date: "2024-01-08",
      readTime: "12 min",
      featured: true
    },
    {
      title: "Airbnb's Search Architecture: Finding Perfect Stays",
      date: "2024-01-01",
      readTime: "10 min",
      featured: false
    },
    {
      title: "Twitter's Timeline Generation: Real-Time Social Feeds",
      date: "2023-12-25",
      readTime: "9 min",
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Engineering <span className="text-primary">Newsletter</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Weekly insights on system design, real-world engineering challenges, and industry updates from tech giants like Uber, Netflix, and Airbnb.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {newsletterStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      {React.createElement(IconComponent, { className: "w-6 h-6 text-primary" })}
                    </div>
                    <div className="text-2xl font-bold mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Subscription Form */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-2xl mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Stay Updated</CardTitle>
              <CardDescription>
                Get weekly insights on system design and engineering challenges from industry experts.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                      <Button type="submit" disabled={loading}>
                        {loading ? "Subscribing..." : "Subscribe"}
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Successfully Subscribed!</h3>
                  <p className="text-muted-foreground">
                    Thank you for subscribing. You'll receive our next newsletter on Monday.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Recent Issues */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Recent Issues</h2>
          <div className="space-y-4">
            {recentIssues.map((issue, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        {issue.featured && <Badge variant="default">Featured</Badge>}
                        <Badge variant="outline">{issue.readTime}</Badge>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{issue.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Published on {new Date(issue.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Read Issue
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Get */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">What You'll Get</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Real-World Case Studies</h3>
                <p className="text-muted-foreground">
                  Deep dives into how companies like Uber, Netflix, and Airbnb solved complex engineering challenges at scale.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">System Design Patterns</h3>
                <p className="text-muted-foreground">
                  Learn scalable architecture patterns, microservices design, and distributed system principles.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Industry Insights</h3>
                <p className="text-muted-foreground">
                  Stay updated with the latest trends, tools, and technologies in system design and engineering.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">Practical Tips</h3>
                <p className="text-muted-foreground">
                  Actionable advice and best practices for building robust, scalable systems in production.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;