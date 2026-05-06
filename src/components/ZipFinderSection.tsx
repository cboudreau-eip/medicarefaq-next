"use client";

import { MapPin, ArrowRight, Phone } from "lucide-react";
import { motion } from "framer-motion";
import ZipFormModal from "@/components/ZipFormModal";
import { trackPhoneClick } from "@/lib/analytics";

const ZIP_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663444965628/gUNDzJhadva78ZtnmXvVsR/zip-finder-bg-gNTJcKEjmhG5w7ALCC56EK.webp";

export default function ZipFinderSection() {
  return (
    <section className="relative overflow-hidden py-16 md:py-20">
      <div className="absolute inset-0">
        <img src={ZIP_BG} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#1B2A4A]/85" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 text-[#0D9488] font-semibold text-sm mb-3">
            <span className="w-6 h-px bg-[#0D9488]" />
            LOCAL PLANS
            <span className="w-6 h-px bg-[#0D9488]" />
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-[34px] font-extrabold text-white mb-4">
            Find Plans Available in Your Area
          </h2>
          <p className="text-white/70 text-lg mb-8">
            Enter your ZIP code to see Medicare plans, costs, and coverage options
            specific to where you live.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ZipFormModal
              coverageType="ms"
              title="Find Plans in Your Area"
              subtitle="Enter your ZIP code to see Medicare plans, costs, and coverage options specific to where you live."
              buttonLabel="Find Plans"
              pageSection="zip_finder_section"
              triggerId="compare-plans-zip-finder"
              trigger={
                <button id="find-plans" className="inline-flex items-center gap-2.5 bg-[#C41230] hover:bg-[#A30F28] text-white font-bold px-8 py-4 rounded-lg transition-all duration-150 shadow-lg shadow-[#C41230]/25 text-base">
                  <MapPin className="w-5 h-5" />
                  Find Plans in Your Area
                  <ArrowRight className="w-4 h-4" />
                </button>
              }
            />
            <a
              href="tel:+18883358996" id="callInNum" data-invoca-phone-number="18883358996"
              onClick={() => trackPhoneClick({ phone_number: "(888) 335-8996", page_section: "zip_finder_section" })}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white font-semibold text-sm transition-colors"
            >
              <Phone className="w-4 h-4" />
              or call (888) 335-8996
            </a>
          </div>

          <p className="text-white/50 text-sm mt-5">
            No obligation. No spam. Just plan information for your area.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
