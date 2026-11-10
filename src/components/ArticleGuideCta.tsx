"use client";
import GuideCta from "./GuideCta";

// Explicit rollout list: shared templates do not opt other articles in automatically.
export const ARTICLE_GUIDE_CTAS:Record<string,{variant:"advantage"|"medigap"|"medicare";description:string}>={
  "/faqs/medicare-grocery-allowance/":{variant:"advantage",description:"Comparing Medicare Advantage options? Enter your ZIP code to explore plans in your area. Benefits and eligibility vary by plan."},
  "/faqs/switch-medicare-advantage-to-medicare-supplement/":{variant:"medigap",description:"Considering a switch to Medicare Supplement coverage? Enter your ZIP code to explore your options. Enrollment and eligibility requirements apply."},
  "/blog/90-essential-facts-about-the-90-medicare-part-b-rebate/":{variant:"medicare",description:"Reviewing your Medicare coverage options? Enter your ZIP code to explore plans in your area. This form is for plan comparisons, not rebate applications."},
  "/faqs/irmaa/":{variant:"medicare",description:"Reviewing your Medicare costs and coverage? Enter your ZIP code to explore plan options in your area. This form is not an IRMAA appeal."},
  "/faqs/how-old-to-get-medicare/":{variant:"medicare",description:"Getting ready for Medicare? Enter your ZIP code to explore coverage options in your area."},
};
export default function ArticleGuideCta({path}:{path:string}){
  const config=ARTICLE_GUIDE_CTAS[path];
  return config?<div className="not-prose my-8"><GuideCta {...config}/></div>:null;
}
