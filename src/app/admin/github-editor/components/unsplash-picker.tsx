"use client";

import { useState } from "react";
import {
  Search,
  ImageIcon,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Camera,
  X,
} from "lucide-react";

interface UnsplashPhoto {
  id: string;
  width: number;
  height: number;
  description: string;
  url: string;
  thumb: string;
  photographer: string;
  photographerUrl: string;
  unsplashUrl: string;
}

interface UnsplashPickerProps {
  onSelect: (url: string, alt: string) => void;
  onClose: () => void;
  password: string;
}

export default function UnsplashPicker({ onSelect, onClose, password }: UnsplashPickerProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UnsplashPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const searchPhotos = async (searchPage = 1) => {
    if (!query.trim()) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        `/api/cms/unsplash?query=${encodeURIComponent(query)}&page=${searchPage}&per_page=12`,
        {
          headers: { "x-cms-password": password },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Search failed");

      setResults(data.results);
      setTotalPages(data.totalPages);
      setTotal(data.total);
      setPage(searchPage);
      setHasSearched(true);
    } catch (err) {
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchPhotos(1);
    }
  };

  const handleSelect = (photo: UnsplashPhoto) => {
    // Use the regular URL (1080px) for the article
    const alt = photo.description || `Photo by ${photo.photographer} on Unsplash`;
    onSelect(photo.url, alt);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Camera className="w-5 h-5 text-teal-600" />
            <h2 className="text-lg font-semibold text-gray-900">Search Unsplash Photos</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for photos... (e.g., medicare, senior health, doctor)"
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                autoFocus
              />
            </div>
            <button
              onClick={() => searchPhotos(1)}
              disabled={loading || !query.trim()}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              Search
            </button>
          </div>
          {/* Quick suggestions */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {["medicare", "senior health", "doctor patient", "healthcare", "prescription medicine", "hospital"].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => { setQuery(suggestion); }}
                className="text-xs px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full hover:bg-teal-50 hover:text-teal-700 transition-colors"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="px-6 py-3 bg-red-50 border-b border-red-100">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Results */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!hasSearched && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <ImageIcon className="w-12 h-12 mb-3" />
              <p className="text-sm">Search for free, high-quality photos from Unsplash</p>
            </div>
          )}

          {hasSearched && results.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <Search className="w-12 h-12 mb-3" />
              <p className="text-sm">No photos found. Try a different search term.</p>
            </div>
          )}

          {loading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            </div>
          )}

          {!loading && results.length > 0 && (
            <>
              <p className="text-xs text-gray-400 mb-4">
                {total.toLocaleString()} photos found — click to select
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {results.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => handleSelect(photo)}
                    className="group relative rounded-lg overflow-hidden border-2 border-transparent hover:border-teal-500 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <img
                      src={photo.thumb}
                      alt={photo.description}
                      className="w-full h-40 object-cover"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-end">
                      <div className="w-full p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white text-[10px] truncate">
                          Photo by{" "}
                          <span className="font-semibold">{photo.photographer}</span>
                        </p>
                      </div>
                    </div>
                    {/* Selection indicator */}
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-bold">+</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => searchPhotos(page - 1)}
              disabled={page <= 1 || loading}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            <span className="text-xs text-gray-400">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => searchPhotos(page + 1)}
              disabled={page >= totalPages || loading}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Attribution footer */}
        <div className="px-6 py-2 border-t border-gray-100 bg-gray-50">
          <p className="text-[10px] text-gray-400 text-center">
            Photos provided by{" "}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
              Unsplash
            </a>
            . Free to use under the{" "}
            <a href="https://unsplash.com/license" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">
              Unsplash License
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
