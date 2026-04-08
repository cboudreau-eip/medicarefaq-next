import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";

export default function NotFound() {
  return (
    <SiteLayout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-lg mx-auto px-4">
          <h1 className="text-6xl font-bold text-navy-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-slate-700 mb-4">
            Page Not Found
          </h2>
          <p className="text-slate-500 mb-8">
            Sorry, the page you&apos;re looking for doesn&apos;t exist or has
            been moved. Let us help you find what you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Go to Homepage
            </Link>
            <Link
              href="/medicare-101"
              className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Medicare 101
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
