"use client";

import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getRandomReviews, type GoogleReview } from "@/lib/google-reviews";

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);

  useEffect(() => {
    // Pick 3 random reviews on every page load (client-side to avoid hydration mismatch)
    setReviews(getRandomReviews(6));
  }, []);

  return (
    <section className="bg-[#F5F7FA] py-16 md:py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 text-[#C41230] font-semibold text-sm mb-3">
            <span className="w-6 h-px bg-[#C41230]" />
            REAL STORIES
            <span className="w-6 h-px bg-[#C41230]" />
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-[34px] font-extrabold text-[#1B2A4A] mb-4">
            What Our Clients Say
          </h2>
          <p className="text-sm text-[#6B7280] flex items-center justify-center gap-1.5">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Verified Google Reviews — Elite Insurance Partners
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name + index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className="bg-white rounded-xl p-6 border border-[#E5E7EB] relative flex flex-col"
            >
              <Quote className="w-8 h-8 text-[#E5E7EB] absolute top-5 right-5" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
                ))}
              </div>
              <p className="text-[#4B5563] text-[15px] leading-relaxed mb-5 italic flex-1">
                &ldquo;{review.text.length > 220 ? review.text.slice(0, 220).trimEnd() + "\u2026" : review.text}&rdquo;
              </p>
              <div className="flex items-center justify-between mt-auto">
                <span className="font-bold text-[#1B2A4A] text-sm">{review.name}</span>
                <span className="flex items-center gap-1 text-xs text-[#6B7280]">
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google Review
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
