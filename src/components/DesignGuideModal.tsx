import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, CheckCircle2 } from "lucide-react";

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

interface DesignGuideModalProps {
  guide: Guide | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DesignGuideModal = ({ guide, open, onOpenChange }: DesignGuideModalProps) => {
  const [expandedSteps, setExpandedSteps] = useState<number[]>([0]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  if (!guide) return null;

  const progress = (completedSteps.length / guide.content.steps.length) * 100;

  const toggleStep = (index: number) => {
    setExpandedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const toggleComplete = (index: number) => {
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader className={`pb-6 border-b bg-gradient-to-r ${guide.gradient} bg-clip-text`}>
          <div className="flex items-start gap-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${guide.gradient} p-0.5 shrink-0`}>
              <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
                <guide.icon className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">Step {guide.step}</Badge>
                <Badge variant="outline">{completedSteps.length}/{guide.content.steps.length} Complete</Badge>
              </div>
              <DialogTitle className="text-2xl font-bold text-transparent">
                {guide.title}
              </DialogTitle>
              <DialogDescription className="mt-2">
                {guide.description}
              </DialogDescription>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-primary">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </DialogHeader>

        {/* Overview */}
        <div className="py-6 border-b">
          <h3 className="text-lg font-semibold mb-3">Overview</h3>
          <p className="text-muted-foreground leading-relaxed">
            {guide.content.overview}
          </p>
        </div>

        {/* Steps */}
        <div className="py-6 space-y-3">
          <h3 className="text-lg font-semibold mb-4">Learning Steps</h3>
          {guide.content.steps.map((step, index) => (
            <Collapsible
              key={index}
              open={expandedSteps.includes(index)}
              onOpenChange={() => toggleStep(index)}
            >
              <div className="border rounded-lg overflow-hidden transition-all duration-200 hover:border-primary/40">
                <CollapsibleTrigger className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleComplete(index);
                      }}
                      className="shrink-0"
                    >
                      <CheckCircle2
                        className={`w-5 h-5 transition-all ${
                          completedSteps.includes(index)
                            ? "text-primary fill-primary/20"
                            : "text-muted-foreground"
                        }`}
                      />
                    </button>
                    <span className="font-medium text-left">{step.title}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 ${
                      expandedSteps.includes(index) ? "rotate-180" : ""
                    }`}
                  />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4 pt-2 animate-accordion-down">
                  <p className="text-muted-foreground leading-relaxed ml-8">
                    {step.content}
                  </p>
                </CollapsibleContent>
              </div>
            </Collapsible>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 pt-6 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
            Close
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
            onClick={() => {
              setCompletedSteps(guide.content.steps.map((_, i) => i));
            }}
          >
            Mark All Complete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
