import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";

// Sample blog posts - you can easily add more here
const blogPosts = [
  {
    id: 1,
    title: "Understanding MB vs MiB: Why Your Storage Shows Different Sizes",
    excerpt: "Ever wondered why your 1TB hard drive shows as 931GB? Learn the difference between decimal and binary storage units.",
    date: "2024-03-15",
    readTime: "5 min read",
    category: "Education",
  },
  {
    id: 2,
    title: "Converting Bytes to MB in Python: A Complete Guide",
    excerpt: "A comprehensive tutorial on handling data size conversions in Python with practical examples and best practices.",
    date: "2024-03-10",
    readTime: "8 min read",
    category: "Tutorial",
  },
  {
    id: 3,
    title: "Data Storage Units Explained: From Bytes to Terabytes",
    excerpt: "A beginner-friendly guide to understanding all data storage units and how they relate to each other.",
    date: "2024-03-05",
    readTime: "6 min read",
    category: "Education",
  },
  {
    id: 4,
    title: "JavaScript Data Conversion: Best Practices for File Sizes",
    excerpt: "Learn how to format and display file sizes in your web applications with clean, readable code.",
    date: "2024-02-28",
    readTime: "7 min read",
    category: "Tutorial",
  },
];

const Blogs = () => {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">Blog</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Articles, tutorials, and insights about data conversion, storage optimization, and development best practices.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="p-6 hover:shadow-lg transition-smooth">
              <div className="space-y-4">
                {/* Category Badge */}
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {post.category}
                </span>

                {/* Title */}
                <h2 className="text-2xl font-bold leading-tight">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-muted-foreground">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Read More Button */}
                <Button variant="ghost" className="group p-0 h-auto font-semibold">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State Message */}
        <Card className="p-8 text-center bg-muted/30">
          <p className="text-muted-foreground">
            More articles coming soon! Subscribe to our newsletter to get notified when we publish new content.
          </p>
          <Button className="mt-4" asChild>
            <a href="/newsletter">Subscribe to Newsletter</a>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Blogs;
