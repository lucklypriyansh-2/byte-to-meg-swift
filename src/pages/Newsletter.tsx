import { useState } from "react";
import { Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Here you would integrate with your email service
    setIsSubmitted(true);
    toast.success("Successfully subscribed to newsletter!");
    setEmail("");
    
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex p-3 rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Newsletter</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get the latest tips, tricks, and updates about data conversion, storage optimization, and developer tools.
          </p>
        </div>

        {/* Subscribe Form */}
        <Card className="p-8 shadow-converter">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email Address
              </label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12"
                  disabled={isSubmitted}
                />
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitted}
                  className="px-8"
                >
                  {isSubmitted ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Subscribed
                    </>
                  ) : (
                    "Subscribe"
                  )}
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              We'll send you helpful articles about data conversion, storage tips, and development best practices. Unsubscribe anytime.
            </p>
          </form>
        </Card>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 space-y-3">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Weekly Tips</h3>
            <p className="text-muted-foreground text-sm">
              Receive expert insights on data conversion and storage optimization every week.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <Check className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-lg">No Spam</h3>
            <p className="text-muted-foreground text-sm">
              Only valuable content. No promotional emails or third-party sharing.
            </p>
          </Card>

          <Card className="p-6 space-y-3">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Early Access</h3>
            <p className="text-muted-foreground text-sm">
              Be the first to know about new features, tools, and updates.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
