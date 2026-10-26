import { blogPosts } from './blog-data';
import { blogArticles } from './blog-articles-data';
import { blogPageCount } from './blog-pagination';

/** One published, deduplicated inventory for server metadata and visible pagination. */
export function getBlogListing() {
  const allPosts = [
    ...blogPosts.map(p => ({ ...p, dateUpdated: undefined })),
    ...blogArticles.filter(a => !a.draft).map(a => ({
      slug: a.slug, title: a.title, excerpt: a.excerpt,
      category: a.category, categoryColor: a.categoryColor,
      date: a.date, dateUpdated: a.dateUpdated, author: a.author,
      reviewer: a.reviewer, readTime: a.readTime, featured: a.featured,
      image: a.image, imageAlt: a.imageAlt,
    })),
  ];
  // Preserve the existing precedence of static posts over articles with the same slug.
  const unique = allPosts.filter((post,i,self) => self.findIndex(p => p.slug === post.slug) === i);
  const timestamp = (date: string) => {
    const value = new Date(date).getTime();
    return Number.isNaN(value) ? 0 : value;
  };
  const allSorted = unique.sort((a,b) => timestamp(b.dateUpdated || b.date)-timestamp(a.dateUpdated || a.date));
  return { allSorted, totalPages: blogPageCount(allSorted.map(p => p.slug)) };
}
