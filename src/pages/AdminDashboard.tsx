import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  LogOut, 
  BookOpen, 
  FileText,
  Settings,
  BarChart3,
  Database,
  Brain,
  Zap,
  GitBranch,
  Flag
} from "lucide-react";
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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("guides");
  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication
    const adminToken = localStorage.getItem("adminToken");
    if (!adminToken) {
      navigate("/admin/login");
      return;
    }
    setToken(adminToken);

    // Load initial data
    loadGuides(adminToken);
    loadBlogs(adminToken);
  }, [navigate]);

  const loadGuides = async (authToken: string) => {
    try {
      const data = await apiService.getAdminGuides(authToken);
      setGuides(data);
    } catch (error) {
      console.error("Failed to load guides:", error);
    }
  };

  const loadBlogs = async (authToken: string) => {
    try {
      const data = await apiService.getAdminBlogs(authToken);
      setBlogs(data);
    } catch (error) {
      console.error("Failed to load blogs:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  const handleSaveGuide = async (guideData: Partial<Guide>) => {
    if (!token) return;
    
    setLoading(true);
    try {
      if (editingGuide) {
        // Update existing guide
        await apiService.updateGuide(editingGuide.id, guideData, token);
        await loadGuides(token);
      } else {
        // Add new guide
        await apiService.createGuide(guideData, token);
        await loadGuides(token);
      }
      setEditingGuide(null);
      setShowForm(false);
    } catch (error) {
      console.error("Failed to save guide:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteGuide = async (id: number) => {
    if (!token) return;
    
    try {
      await apiService.deleteGuide(id, token);
      await loadGuides(token);
    } catch (error) {
      console.error("Failed to delete guide:", error);
    }
  };

  const getIconComponent = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Flag, BarChart3, Database, Brain, Zap, GitBranch, BookOpen
    };
    return icons[iconName] || BookOpen;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage guides and blog content</p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="guides" className="gap-2">
              <BookOpen className="w-4 h-4" />
              System Guides
            </TabsTrigger>
            <TabsTrigger value="blogs" className="gap-2">
              <FileText className="w-4 h-4" />
              Blog Posts
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Guides Tab */}
          <TabsContent value="guides">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">System Architecture Guides</h2>
                <Button onClick={() => setShowForm(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Guide
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guides.map((guide) => {
                  const IconComponent = getIconComponent(guide.icon);
                  return (
                    <Card key={guide.id}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            {React.createElement(IconComponent, { className: "w-5 h-5 text-primary" })}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{guide.title}</CardTitle>
                            <CardDescription>{guide.company}</CardDescription>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={guide.published ? "default" : "secondary"}>
                            {guide.published ? "Published" : "Draft"}
                          </Badge>
                          <Badge variant="outline">{guide.users} users</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {guide.description}
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="gap-1">
                            <Eye className="w-3 h-3" />
                            View
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="gap-1"
                            onClick={() => {
                              setEditingGuide(guide);
                              setShowForm(true);
                            }}
                          >
                            <Edit className="w-3 h-3" />
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="gap-1 text-destructive hover:text-destructive"
                            onClick={() => handleDeleteGuide(guide.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                            Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* Blogs Tab */}
          <TabsContent value="blogs">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Blog Posts</h2>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Post
                </Button>
              </div>

              <div className="space-y-4">
                {blogs.map((blog) => (
                  <Card key={blog.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                          <p className="text-muted-foreground mb-3">{blog.excerpt}</p>
                          <div className="flex gap-2">
                            <Badge variant={blog.published ? "default" : "secondary"}>
                              {blog.published ? "Published" : "Draft"}
                            </Badge>
                            <Badge variant="outline">{blog.views} views</Badge>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="outline" className="text-destructive">Delete</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Guides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{guides.length}</div>
                    <p className="text-sm text-muted-foreground">Published guides</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Total Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">12,450</div>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">2,340</div>
                    <p className="text-sm text-muted-foreground">Last 30 days</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Guide Form Modal */}
      {(showForm || editingGuide) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>{editingGuide ? "Edit Guide" : "Add New Guide"}</CardTitle>
            </CardHeader>
            <CardContent>
              <GuideForm 
                guide={editingGuide} 
                onSave={handleSaveGuide}
                onCancel={() => {
                  setShowForm(false);
                  setEditingGuide(null);
                }}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

// Guide Form Component
const GuideForm = ({ guide, onSave, onCancel }: { 
  guide: Guide | null; 
  onSave: (data: Partial<Guide>) => void;
  onCancel: () => void;
}) => {
  const [formData, setFormData] = useState({
    guide_id: guide?.guide_id || "",
    title: guide?.title || "",
    description: guide?.description || "",
    company: guide?.company || "",
    users: guide?.users || "",
    details: guide?.details || "",
    icon: guide?.icon || "BookOpen",
    color: guide?.color || "#6366f1",
    steps: guide?.steps || [],
    published: guide?.published || false
  });

  const [currentStep, setCurrentStep] = useState("");

  const iconOptions = [
    { value: "Flag", label: "Flag" },
    { value: "BarChart3", label: "Bar Chart" },
    { value: "Database", label: "Database" },
    { value: "Brain", label: "Brain" },
    { value: "Zap", label: "Zap" },
    { value: "GitBranch", label: "Git Branch" },
    { value: "BookOpen", label: "Book" },
    { value: "Code", label: "Code" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addStep = () => {
    if (currentStep.trim()) {
      setFormData({
        ...formData,
        steps: [...formData.steps, currentStep.trim()]
      });
      setCurrentStep("");
    }
  };

  const removeStep = (index: number) => {
    setFormData({
      ...formData,
      steps: formData.steps.filter((_, i) => i !== index)
    });
  };

  const generateGuideId = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => {
              const newTitle = e.target.value;
              setFormData({
                ...formData, 
                title: newTitle,
                guide_id: guide ? formData.guide_id : generateGuideId(newTitle)
              });
            }}
            required
          />
        </div>
        <div>
          <Label htmlFor="guide_id">Guide ID *</Label>
          <Input
            id="guide_id"
            value={formData.guide_id}
            onChange={(e) => setFormData({...formData, guide_id: e.target.value})}
            placeholder="e.g., netflix-streaming"
            required
            disabled={!!guide}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="company">Company *</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
            placeholder="e.g., Netflix"
            required
          />
        </div>
        <div>
          <Label htmlFor="users">Users Served *</Label>
          <Input
            id="users"
            value={formData.users}
            onChange={(e) => setFormData({...formData, users: e.target.value})}
            placeholder="e.g., 100M+"
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Brief description of the guide"
          required
          rows={2}
        />
      </div>

      <div>
        <Label htmlFor="details">Detailed Description *</Label>
        <Textarea
          id="details"
          value={formData.details}
          onChange={(e) => setFormData({...formData, details: e.target.value})}
          placeholder="Comprehensive overview of the system design"
          rows={4}
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="icon">Icon</Label>
          <select
            id="icon"
            value={formData.icon}
            onChange={(e) => setFormData({...formData, icon: e.target.value})}
            className="w-full px-3 py-2 border border-border rounded-md bg-background"
          >
            {iconOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="color">Color</Label>
          <Input
            id="color"
            type="color"
            value={formData.color}
            onChange={(e) => setFormData({...formData, color: e.target.value})}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="steps">Steps *</Label>
        <div className="flex gap-2 mb-2">
          <Input
            id="steps"
            value={currentStep}
            onChange={(e) => setCurrentStep(e.target.value)}
            placeholder="Enter a step (e.g., Define Requirements)"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addStep())}
          />
          <Button type="button" onClick={addStep} size="sm">
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {formData.steps.map((step, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-md">
              <span className="flex-1 text-sm">{index + 1}. {step}</span>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => removeStep(index)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </div>
          ))}
          {formData.steps.length === 0 && (
            <p className="text-sm text-muted-foreground">No steps added yet. Add at least one step.</p>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="published"
          checked={formData.published}
          onChange={(e) => setFormData({...formData, published: e.target.checked})}
          className="rounded"
        />
        <Label htmlFor="published">Publish this guide</Label>
      </div>

      <div className="flex gap-2 pt-4 border-t">
        <Button type="submit" className="flex-1" disabled={formData.steps.length === 0}>
          {guide ? "Update Guide" : "Create Guide"}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AdminDashboard;
