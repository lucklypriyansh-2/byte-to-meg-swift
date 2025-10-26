# ByteToMeg - System Design Learning Platform with Byte Converter

A modern, interactive platform for learning system design concepts with step-by-step guides, inspired by ByteByteGo. Convert bytes to MB while mastering system design patterns.

## 🎯 Features

### Tabbed Interface
The platform offers two main sections accessible via tabs:

#### 1. **Learn System Design Tab** 📚
- **6+ Comprehensive System Design Guides** with step-by-step learning paths:
  - Feature Flag System Design
  - Scaling from Zero to Millions of Users
  - OpenSearch Architecture
  - Machine Learning System Design
  - Rate Limiter Implementation
  - Distributed Caching Strategies

- **Interactive Guide Modal**
  - Click any guide card to open an interactive modal
  - Expandable step-by-step instructions with detailed explanations
  - Key considerations and best practices for each step
  - Beautiful gradient-themed UI for each guide topic

#### 2. **Conversion Tools Tab** 🛠️
- **Byte Converter** - Fast and accurate byte to megabyte conversion
  - Support for both decimal (MB) and binary (MiB) conversions
  - Instant results with precision
  - Beautiful gradient-themed interface matching the main platform

- **Conversion Explanation** - Understand how conversions work
  - Detailed breakdown of conversion logic
  - Educational content about byte units

- **Conversion Table** - Reference quick conversions
  - Quick lookup for common byte values
  - Organized by power of 2

### Modern Design
- Beautiful gradient-based UI inspired by ByteByteGo
- Fully responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Dark mode support
- Glassmorphism effects
- Tabbed navigation with icon labels

## 🏗️ Project Structure

```
src/
├── pages/
│   ├── Index.tsx                    # Main landing page with tabbed interface
│   ├── Blogs.tsx                    # Blog page (expandable)
│   ├── Docs.tsx                     # Documentation page (expandable)
│   ├── Newsletter.tsx               # Newsletter page (expandable)
│   └── NotFound.tsx                 # 404 page
├── components/
│   ├── DesignGuidesSection.tsx     # Grid of design guide cards
│   ├── DesignGuideModal.tsx        # Interactive step-by-step modal
│   ├── ByteConverter.tsx            # Byte conversion tool
│   ├── ConversionTable.tsx          # Quick reference table
│   ├── ExplanationPanel.tsx         # Educational content
│   ├── Layout.tsx                   # Main layout with sidebar
│   ├── AppSidebar.tsx               # Navigation sidebar
│   ├── ThemeToggle.tsx              # Dark/light mode toggle
│   ├── Footer.tsx                   # Footer section
│   └── ui/                          # shadcn-ui components
├── hooks/
│   └── use-toast.ts                 # Toast notification hook
├── lib/
│   └── utils.ts                     # Utility functions
└── index.css                        # Global styles and animations
```

## 🎨 Design Features

### Hero Section
- Eye-catching gradient text with animated highlights
- Call-to-action buttons that switch between tabs
- Animated background elements
- Clear value proposition

### Tab Navigation
- Two main tabs: "Learn System Design" and "Conversion Tools"
- Gradient-themed active state
- Icon labels for quick recognition
- Smooth transitions between tabs

### Guide Cards (Learning Tab)
- Colorful gradient icons
- Hover animations and scale effects
- Quick step preview (shows first 2 steps)
- Smooth transitions
- 3-column responsive grid

### Conversion Tools (Tools Tab)
- Byte Converter with gradient theme
- Explanation panel with educational content
- Conversion table for quick reference
- All wrapped in gradient-bordered containers

### Color Scheme
- Primary: Teal to Cyan gradients (`#14b8a6` to `#06b6d4`)
- Secondary: Cyan to Blue gradients
- Tertiary: Purple and Pink accents
- Support for light and dark modes
- Consistent gradient applications across all sections

## 🚀 Getting Started

### Installation

```sh
# Clone the repository
git clone <your-git-url>

# Navigate to project directory
cd byte-to-meg-swift

# Install dependencies
npm install
```

### Development

```sh
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Build for Production

```sh
npm run build

# Preview production build
npm run preview
```

## 📚 System Design Guides

### Feature Flag System
Learn to design a production-grade feature flag system:
1. Define Requirements
2. Flag Storage Design
3. Evaluation Engine
4. SDK Implementation
5. Admin Dashboard
6. Analytics & Monitoring

### Scaling from Zero to Millions
Master the journey of scaling systems:
1. Single Server Setup
2. Database Optimization
3. Horizontal Scaling
4. Load Balancing
5. Caching Layer
6. Distributed System Patterns

### OpenSearch Architecture
Build powerful search engines:
1. Understanding Search Basics
2. Index Design
3. Query Optimization
4. Cluster Architecture
5. Replication & Recovery
6. Performance Tuning

### Machine Learning System Design
Design end-to-end ML systems:
1. Problem Definition
2. Data Pipeline
3. Feature Engineering
4. Model Training
5. Model Serving
6. Monitoring & Retraining

### Rate Limiter
Protect your APIs with smart rate limiting:
1. Requirements Analysis
2. Algorithm Selection
3. Distributed Rate Limiting
4. State Management
5. Configuration Management
6. Monitoring

### Distributed Caching
Master high-performance caching strategies:
1. Caching Basics
2. Eviction Policies
3. Consistency Issues
4. Multi-level Caching
5. Cache Invalidation
6. Performance Optimization

## 🛠️ Technologies Used

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-ui
- **Icons**: Lucide React
- **Animations**: CSS animations with Tailwind
- **Router**: React Router
- **State Management**: React Hooks
- **Tabs**: Radix UI Tabs

## 🎨 Customization

### Adding New Guides

Edit `src/components/DesignGuidesSection.tsx`:

```typescript
const guides: Guide[] = [
  {
    id: "your-guide-id",
    title: "Your Guide Title",
    description: "Brief description",
    icon: <YourIcon className="w-6 h-6" />,
    color: "from-teal-500 to-cyan-500",
    steps: ["Step 1", "Step 2", ...],
    details: "Detailed overview text",
  },
  // ... more guides
];
```

Then add corresponding step details in `src/components/DesignGuideModal.tsx`:

```typescript
const stepDetails: Record<string, Record<string, string>> = {
  "your-guide-id": {
    "Step 1": "Details for step 1",
    "Step 2": "Details for step 2",
    // ...
  },
};
```

### Adding New Pages

Create a new page in `src/pages/` and add a route in `src/App.tsx`:

```typescript
import YourPage from "./pages/YourPage";

// In the Routes component:
<Route path="/your-page" element={<YourPage />} />
```

Update the sidebar in `src/components/AppSidebar.tsx` to include the new route.

### Modifying Colors

Edit `src/index.css` to adjust:
- Primary colors (currently teal-cyan)
- Gradient configurations
- Animation speeds
- Theme variables

### Tab Styling

Modify `src/pages/Index.tsx` to customize the tab appearance:

```typescript
<TabsList className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/30 p-2">
  <TabsTrigger 
    value="learn"
    className="gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
  >
    <BookOpen className="w-4 h-4" />
    Learn System Design
  </TabsTrigger>
  // ... more tabs
</TabsList>
```

## 📱 Responsive Design

The platform is fully responsive:
- **Mobile**: Single column layout, optimized touch targets, accessible tabs
- **Tablet**: Two-column grid in learning tab, full-width tools
- **Desktop**: Three-column grid in learning tab, organized tools section

## 🌙 Dark Mode Support

Dark mode is automatically applied based on system preferences. Toggle using theme switcher in the header (top-right corner).

## 📊 Stats Section

The learning tab displays impressive statistics:
- 50+ System Design Concepts
- 100+ Step-by-Step Guides
- 1M+ Engineers Learning
- 24/7 Updated Content

## 🔐 Best Practices

- TypeScript for type safety
- Component-based architecture
- Responsive design patterns
- Accessible color contrasts
- Keyboard navigation support
- Tab-based content organization

## 📖 How to Use

1. **Landing Page**: Explore the beautiful hero section
2. **Switch Tabs**: Use the tab navigation to switch between learning and tools
3. **Learn System Design**:
   - Browse the guide cards grid
   - Click any guide card to open the interactive modal
   - Expand steps to read detailed explanations
4. **Use Conversion Tools**:
   - Enter a byte value to convert instantly
   - Read explanations to understand conversions
   - Use the conversion table as a quick reference
5. **Navigate**: Use the sidebar to explore other pages (Blog, Docs, Newsletter)
6. **Toggle Theme**: Use the theme switcher in the header for dark/light mode

## 🤝 Contributing

Feel free to:
- Add more system design guides
- Create new pages (Blog, Docs, etc.)
- Improve existing guide content
- Enhance the UI/UX
- Fix bugs and improve performance
- Add new features

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by [ByteByteGo](https://www.bytebytego.com/) by Alex Xu and Sahn Lam
- Built with [shadcn-ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Powered by [Vite](https://vitejs.dev/) and [React](https://react.dev/)
- Tab component from [Radix UI](https://www.radix-ui.com/)

---

**Happy Learning! Master system design one step at a time.** 🚀

## 📋 Recent Updates

### Version 2.0 - Tabbed Interface
- ✨ Added tabbed navigation between Learning and Tools sections
- 🎨 Enhanced visual theme consistency across all sections
- 🧹 Cleaned up unused components (Header.tsx removed)
- 📱 Improved responsive layout for all screen sizes
- 🎯 Better organization of content with semantic tab structure
- 🚀 Maintained ConversionTable, ExplanationPanel, and ByteConverter in Tools tab
