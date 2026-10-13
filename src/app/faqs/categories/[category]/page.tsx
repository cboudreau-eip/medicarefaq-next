import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteLayout from "@/components/SiteLayout";
import FAQIndex from "../../PageContent";
import { FAQ_CATEGORIES, getFaqCategoryBySlug } from "@/lib/faq-categories";

const BASE_URL = "https://www.medicarefaq.com";
type PageProps = { params: Promise<{ category: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return FAQ_CATEGORIES.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getFaqCategoryBySlug(slug);
  if (!category) notFound();
  const url = `${BASE_URL}/faqs/categories/${slug}/`;
  return {
    title: category.heading,
    description: category.description,
    alternates: { canonical: url },
    openGraph: {
      title: category.heading,
      description: category.description,
      url,
      type: "website",
      images: [{ url: `${BASE_URL}/images/medicarefaq-cover.jpg` }],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { category: slug } = await params;
  const category = getFaqCategoryBySlug(slug);
  if (!category) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: category.heading,
        description: category.description,
        url: `${BASE_URL}/faqs/categories/${slug}/`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Medicare FAQs", item: `${BASE_URL}/faqs/` },
          { "@type": "ListItem", position: 3, name: category.label },
        ],
      },
    ],
  };
  return (
    <SiteLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <FAQIndex categorySlug={slug} />
    </SiteLayout>
  );
}
