"use client";

import { ArrowRight, Star, MapPin, Users, FileCheck, BookOpen } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const trustItems = [
  { icon: Star, label: "BBB A+ Rated", sublabel: "Since 2015" },
  { icon: MapPin, label: "Licensed in All 50 States", sublabel: "Full national coverage" },
  { icon: Users, label: "60,000+ Clients Helped", sublabel: "Medicare guidance" },
  { icon: FileCheck, label: "Editorially Reviewed", sublabel: "By Medicare professionals" },
  { icon: BookOpen, label: "600+ Pages of Content", sublabel: "Comprehensive library" },
];

export default function HeroSection() {
  return (
    <section className="relative bg-[#1B2A4A] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B2A4A] via-[#1B2A4A] to-[#0F1C35]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
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
              Trusted by 60,000+ clients nationwide
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.15] mb-5"
          >
            Understanding Medicare
            <br />
            <span className="text-[#F5F7FA]/90">doesn&apos;t have to be confusing.</span>
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
              className="group inline-flex items-center gap-2 bg-[#0D9488] hover:bg-[#0B7C72] text-white font-bold px-4 py-3 rounded-lg transition-all duration-150 shadow-lg shadow-[#0D9488]/25 whitespace-nowrap text-sm"
            >
              I&apos;m New to Medicare
              <span className="text-xs text-white/70 font-normal hidden md:inline">
                Turning 65 soon
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>
            <Link
              href="/enrollment/working-past-65"
              className="group inline-flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white font-bold px-4 py-3 rounded-lg transition-all duration-150 shadow-lg shadow-[#D97706]/25 whitespace-nowrap text-sm"
            >
              Working Past 65
              <span className="text-xs text-white/70 font-normal hidden md:inline">
                Still have employer coverage
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>
            <Link
              href="/compare-rates"
              className="group inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-bold px-4 py-3 rounded-lg transition-all duration-150 border border-white/20 whitespace-nowrap text-sm"
            >
              Already Enrolled
              <span className="text-xs text-white/70 font-normal hidden md:inline">
                Want to compare or switch
              </span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform shrink-0" />
            </Link>
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
