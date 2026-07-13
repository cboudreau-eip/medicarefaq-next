export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  date: string;
  author: string;
  reviewer: string;
  readTime: string;
  featured?: boolean;
  image: string;
}

export interface ArticleSection {
  id: string;
  title: string;
  level: number;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "going-back-to-work-on-medicare",
    title: "What Happens to Your Medicare When You Go Back to Work?",
    excerpt:
      "Already on Medicare and heading back to work? Learn how employer size, Part B, Medigap, and coordination of benefits all change when you return to the workforce.",
    category: "Medicare Basics",
    categoryColor: "#1B2A4A",
    date: "July 13, 2026",
    author: "David Haass",
    reviewer: "Ashlee Zareczny",
    readTime: "10 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1758612898691-afe3e1d08a0a?auto=format&fit=crop&w=800&h=500&q=80",
  },
  {
    slug: "part-d-penalty-waived",
    title: "How to Get Your Medicare Part D Penalty Waived",
    excerpt:
      "Thousands pay the Medicare Part D late enrollment penalty unnecessarily. Find out how to get your Part D penalty waived, reduced, or appealed in 2026.",
    category: "Medicare Costs",
    categoryColor: "#C41230",
    date: "July 10, 2026",
    author: "David Haass",
    reviewer: "Ashlee Zareczny",
    readTime: "11 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1758691031749-607d43c14f63?auto=format&fit=crop&w=800&h=500&q=80",
  },
  {
    slug: "aep-prep-checklist",
    title: "2026 AEP Prep Checklist: Get Ready for 2027 Changes",
    excerpt:
      "The Medicare Annual Enrollment Period runs October 15 through December 7. Use this step-by-step checklist to review your current plan, compare 2027 options, and make confident coverage decisions before the deadline.",
    category: "Enrollment",
    categoryColor: "#D97706",
    date: "July 8, 2026",
    author: "David Haass",
    reviewer: "Ashlee Zareczny",
    readTime: "10 min read",
    featured: true,
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop",
  },
  {
    slug: "medicare-at-65-month-by-month-timeline",
    title: "Medicare at 65: A Month-by-Month Timeline of What to Do and When",
    excerpt:
      "Turning 65 triggers a cascade of Medicare decisions - each with its own deadline. This month-by-month timeline tells you exactly what to do and when, from 12 months before your birthday through your first year of coverage.",
    category: "Enrollment",
    categoryColor: "#F59E0B",
    date: "May 15, 2026",
    author: "David Haass",
    reviewer: "Ashlee Zareczny",
    readTime: "12 min read",
    featured: true,
    image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=500&fit=crop",
  },
  {
    slug: "finding-your-best-medigap-plan",
    title: "Best Medigap Plan for 2026: How to Choose the Right Medicare Supplement",
    excerpt:
      "Choosing the best Medigap plan comes down to understanding your health needs, your budget, and how different plans are structured. This article walks you through Plan G, Plan N, enrollment timing, and carrier comparison.",
    category: "Medicare Supplement",
    categoryColor: "#4F46E5",
    date: "May 15, 2026",
    author: "David Haass",
    reviewer: "Ashlee Zareczny",
    readTime: "11 min read",
    featured: true,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
  },
  {
    slug: "medicare-part-b-annual-deductible-explained-what-youll-pay",
    title: "Medicare Part B Annual Deductible Explained: What You'll Pay",
    excerpt:
      "Understanding the Part B deductible is one of the most important steps in protecting your retirement savings. Learn how the $283 deductible works in 2026.",
    category: "Medicare Costs",
    categoryColor: "#C41230",
    date: "March 12, 2026",
    author: "David Haass",
    reviewer: "Ashlee Zareczny",
    readTime: "12 min read",
    featured: true,
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=500&fit=crop",
  },
  {
    slug: "medicare-supplement-and-pre-existing-conditions-what-you-need-to-know",
    title: "Medicare Supplement and Pre-Existing Conditions: What You Need to Know",
    excerpt:
      "Learn everything you need to know about Medicare Supplement plans and pre-existing conditions. Discover enrollment timing, waiting periods, and guaranteed issue rights.",
    category: "Medicare Supplement",
    categoryColor: "#4F46E5",
    date: "March 10, 2026",
    author: "David Haass",
    reviewer: "Ashlee Zareczny",
    readTime: "10 min read",
    featured: false,
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&h=500&fit=crop",
  }];

export const articleTableOfContents: ArticleSection[] = [
  { id: "how-deductible-works", title: "How the Part B Deductible Works", level: 2 },
  { id: "after-meeting-deductible", title: "What Happens after Meeting the Deductible", level: 2 },
  { id: "deductible-vs-premium", title: "Deductible vs Premium vs Coinsurance", level: 2 },
  { id: "premium-key-differences", title: "Part B Premiums vs. Deductible: Key Differences", level: 2 },
  { id: "services-that-count", title: "Services that Count toward the Deductible", level: 2 },
  { id: "preventive-services", title: "Preventive Services You Don't Pay For", level: 2 },
  { id: "deductible-changes", title: "Deductible Changes by Year", level: 2 },
  { id: "out-of-pocket-costs", title: "How the Deductible Affects Out-of-Pocket Costs", level: 2 },
  { id: "tips-managing-costs", title: "Tips for Managing Part B Costs", level: 2 },
  { id: "who-this-is-for", title: "Who This Is For / Who This Isn't For", level: 2 },
  { id: "final-thoughts", title: "Final Thoughts", level: 2 },
  { id: "faqs", title: "Frequently Asked Questions", level: 2 }];

export const categories = [
  { name: "All Posts", color: "#1B2A4A" },
  { name: "Medicare Costs", color: "#C41230" },
  { name: "Enrollment", color: "#D97706" },
  { name: "Medicare Plans", color: "#1B2A4A" },
  { name: "Medicare Supplement", color: "#4F46E5" },
  { name: "Getting Started", color: "#0D9488" }];
