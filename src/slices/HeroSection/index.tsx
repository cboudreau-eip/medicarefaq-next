import { FC } from "react";
import { SliceComponentProps, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { SharedSlice, SharedSliceVariation, ImageField, RichTextField } from "@prismicio/client";

type HeroSectionSlicePrimary = {
  title: RichTextField;
  description: RichTextField;
  background_image: ImageField;
};

type HeroSectionSlice = SharedSlice<
  "hero_section",
  SharedSliceVariation<"default", HeroSectionSlicePrimary>
>;

/**
 * Props for `HeroSection`.
 */
export type HeroSectionProps = SliceComponentProps<HeroSectionSlice>;

/**
 * Component for "HeroSection" Slices.
 */
const HeroSection: FC<HeroSectionProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden bg-slate-900"
    >
      {/* Background Image */}
      {slice.primary.background_image?.url && (
        <div className="absolute inset-0 z-0">
          <PrismicNextImage
            field={slice.primary.background_image}
            fill
            className="object-cover opacity-30"
            alt=""
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center text-white">
        <div className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          <PrismicRichText field={slice.primary.title} />
        </div>
        <div className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          <PrismicRichText field={slice.primary.description} />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
