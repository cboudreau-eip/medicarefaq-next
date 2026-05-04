"use client";

import { ArrowRight, Star, MapPin, Users, FileCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import ZipFormModal from "@/components/ZipFormModal";
import { trackCtaClick } from "@/lib/analytics";

const trustItems = [
  { icon: Star, label: "BBB a+ Rated", sublabel: "Since 2015" },
  { icon: MapPin, label: "Licensed in All 50 States", sublabel: "Full National Coverage" },
  { icon: Users, label: "2,000,000+ Americans Helped", sublabel: "Medicare Guidance" },
  { icon: FileCheck, label: "Editorially Reviewed", sublabel: "By Medicare Professionals" },

];

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663444965628/gUNDzJhadva78ZtnmXvVsR/hero-bg-JCwzhz6vF5hshLidyrZztx.webp";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={HERO_BG}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1B2A4A]/95 via-[#1B2A4A]/80 to-[#1B2A4A]/40" />
      </div>
      {/* Content */}
      <div className="container relative z-10 pt-14 pb-6 md:pt-20 md:pb-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0D9488]" />
              Trusted by 2,000,000+ Americans nationwide
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-[50px] font-extrabold text-white leading-[1.15] mb-5"
          >
            Understanding Medicare
            <br />
            <span className="text-[#F5F7FA]/90">Doesn&apos;t Have to be Confusing.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
          >
            Whether you&apos;re approaching 65, still working, or already enrolled, we&apos;ll
            help you understand your options with clear, unbiased guidance.
          </motion.p>
          {/* 3 journey buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="/medicare-101"
              onClick={() => trackCtaClick({ button_label: "I'm New to Medicare", destination: "/medicare-101", page_section: "hero" })}
              className="group inline-flex items-center justify-between gap-3 bg-[#0D9488] hover:bg-[#0B7C72] text-white font-bold px-5 py-3.5 rounded-lg transition-all duration-150 shadow-lg shadow-[#0D9488]/25 text-sm flex-1"
            >
              <div className="flex flex-col">
                <span className="font-bold text-white text-[15px] leading-tight">I&apos;m New to Medicare</span>
                <span className="hidden md:block w-full h-px bg-white/30 my-1" />
                <span className="hidden md:block text-xs text-white font-normal leading-tight">Turning 65 soon</span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>
            <Link
              href="/enrollment/working-past-65"
              onClick={() => trackCtaClick({ button_label: "Working past 65", destination: "/enrollment/working-past-65", page_section: "hero" })}
              className="group inline-flex items-center justify-between gap-3 bg-[#D97706] hover:bg-[#B45309] text-white font-bold px-5 py-3.5 rounded-lg transition-all duration-150 shadow-lg shadow-[#D97706]/25 text-sm flex-1"
            >
              <div className="flex flex-col">
                <span className="font-bold text-white text-[15px] leading-tight">Working Past 65</span>
                <span className="hidden md:block w-full h-px bg-white/30 my-1" />
                <span className="hidden md:block text-xs text-white font-normal leading-tight">Still have employer coverage</span>
              </div>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>
            <ZipFormModal
              coverageType="ms"
              title="Compare Medicare Plans"
              subtitle="Enter your ZIP code to compare plans and rates in your area — free, no obligation."
              buttonLabel="Compare Plans"
              pageSection="hero"
              triggerId="get-started-free-hero"
              trigger={
                <button className="group inline-flex items-center justify-between gap-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-bold px-5 py-3.5 rounded-lg transition-all duration-150 border border-white/20 text-sm flex-1 w-full">
                  <div className="flex flex-col text-left">
                    <span className="font-bold text-white text-[15px] leading-tight">Already Enrolled</span>
                    <span className="hidden md:block w-full h-px bg-white/30 my-1" />
                    <span className="hidden md:block text-xs text-white font-normal leading-tight">Want to compare or switch</span>
                  </div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
                </button>
              }
            />
          </motion.div>
        </div>
      </div>
      {/* Trust bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative z-10 mt-10 bg-[#0F1C35]/80 backdrop-blur-sm border-t border-white/10"
      >
        <div className="container py-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {trustItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.06 }}
                  className="flex items-center gap-2.5"
                >
                  <div className="w-8 h-8 rounded-md bg-white/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#0D9488]" />
                  </div>
                  <div>
                    <span className="font-bold text-white text-xs block leading-tight">
                      {item.label}
                    </span>
                    <span className="text-[10px] text-white/55 block">{item.sublabel}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
