"use client";
import GuideCta from "./GuideCta";

// Explicit rollout list: shared templates do not opt other articles in automatically.
export const ARTICLE_GUIDE_CTAS:Record<string,{variant:"advantage"|"medigap"|"medicare";description:string}>={
  "/faqs/medicare-grocery-allowance/":{variant:"advantage",description:"Comparing Medicare Advantage options? Enter your ZIP code to explore plans in your area. Benefits and eligibility vary by plan."},
  "/faqs/switch-medicare-advantage-to-medicare-supplement/":{variant:"medigap",description:"Considering a switch to Medicare Supplement coverage? Enter your ZIP code to explore your options. Enrollment and eligibility requirements apply."},
  "/blog/90-essential-facts-about-the-90-medicare-part-b-rebate/":{variant:"medicare",description:"Reviewing your Medicare coverage options? Enter your ZIP code to explore plans in your area. This form is for plan comparisons, not rebate applications."},
  "/faqs/irmaa/":{variant:"medicare",description:"Reviewing your Medicare costs and coverage? Enter your ZIP code to explore plan options in your area. This form is not an IRMAA appeal."},
  "/faqs/how-old-to-get-medicare/":{variant:"medicare",description:"Getting ready for Medicare? Enter your ZIP code to explore coverage options in your area."},
  "/medicare-supplement-plans/plan-g/":{"variant":"medigap","description":"Comparing Medicare Supplement coverage? Enter your ZIP code to explore options in your area."},
  "/faqs/hsa-and-medicare/":{"variant":"medicare","description":"Planning your transition to Medicare? Enter your ZIP code to explore coverage options in your area."},
  "/faqs/does-medicare-cover-zepbound/":{"variant":"medicare","description":"Reviewing your Medicare coverage options? Enter your ZIP code to explore plans in your area. Prescription coverage depends on the plan and applicable coverage rules."},
  "/blog/medicare-changes-2027/":{"variant":"medicare","description":"Reviewing your Medicare options for the coming year? Enter your ZIP code to explore available coverage in your area."},
  "/blog/medicare-for-all/":{"variant":"medicare","description":"Looking for Medicare coverage available today? Enter your ZIP code to explore current options in your area."},
  "/faqs/medicare-guaranteed-issue/":{"variant":"medigap","description":"Exploring Medicare Supplement coverage? Enter your ZIP code to compare options in your area. Enrollment and eligibility requirements apply."},
  "/medicare-supplement-plans/":{"variant":"medigap","description":"Comparing Medicare Supplement coverage? Enter your ZIP code to explore options in your area."},
  "/faqs/medicare-advantage-over-the-counter-cards/":{"variant":"advantage","description":"Comparing Medicare Advantage options? Enter your ZIP code to explore plans in your area. OTC benefits and eligibility vary by plan."},
  "/faqs/silver-sneakers-program/":{"variant":"medicare","description":"Exploring Medicare coverage options? Enter your ZIP code to compare plans in your area. Fitness benefits vary by plan."},
};
export default function ArticleGuideCta({path}:{path:string}){
  const config=ARTICLE_GUIDE_CTAS[path];
  return config?<div className="not-prose my-8"><GuideCta {...config}/></div>:null;
}
