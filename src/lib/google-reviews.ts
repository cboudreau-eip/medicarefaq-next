export interface GoogleReview {
  name: string;
  text: string;
  date: string;
  rating: 5;
}

export const googleReviews: GoogleReview[] = [
  {
    name: "Lisa Hancock",
    rating: 5,
    date: "2 months ago",
    text: "Gavin Williams is Awesome. Spoke to him in September about my husband's prescription plan and other questions. Called and spoke with him Friday to set up my own benefits. He was very friendly, professional, knowledgeable, and comforting. He explained Medicare A, B, C & D to me, fully answered ALL of my questions and helped me setup what we could now. I can't compliment him enough for his help, professionalism, and personality that made me feel so comfortable — like he was family and our best interest was his priority. Thank you Gavin!",
  },
  {
    name: "Dennis Zalar",
    rating: 5,
    date: "2 months ago",
    text: "I've been using Elite Insurance Partners for over 5 years and the service has been outstanding. They communicate frequently on pending rate increases in my Medicare Supplement and when I call to compare prices they are prompt and provide lower cost options when possible. They are a joy to deal with and answer any questions that I have.",
  },
  {
    name: "Mrs. Chris (Life-Long Teacher)",
    rating: 5,
    date: "4 months ago",
    text: "I am thankful to the max for having Olivia as my contact/agent. She guided me through the grueling process of obtaining a new upgraded Medicare Advantage plan for my husband. She was knowledgeable, professional and most importantly compassionate and understanding of my wants and needs. I feel that Amanda and Olivia were the best team for me. I highly acclaim their ethics, guidance, follow up and follow-through! They are keepers for sure!",
  },
  {
    name: "Carol Heaton",
    rating: 5,
    date: "2 months ago",
    text: "I called this service because my secondary insurance with Cigna was going to go way up. I changed to Aflac to save $20 per month on monthly fees. My service advisor was very helpful. Thank you.",
  },
  {
    name: "The Sartwells",
    rating: 5,
    date: "5 months ago",
    text: "Patrice has made this Medicare mess easy for us. She listened to my concerns, answered all my questions. She knows how important it is to get this plan approved before December 7th. I am completely satisfied with the customer service. I appreciate the updates every step of the way.",
  },
  {
    name: "Barbara",
    rating: 5,
    date: "6 months ago",
    text: "Olivia has to be the BEST agent at this company. She has helped me so much to make a big decision and when I changed my mind she continued the same excellent service. She has emailed and called me to make sure everything is done to my satisfaction.",
  },
  {
    name: "David Bailey",
    rating: 5,
    date: "3 months ago",
    text: "Ashley Russell has been very helpful getting me through the process of changing insurance. All the people I have worked with for the past decade have been friendly, supportive, and professional.",
  },
  {
    name: "Simkha Fridman",
    rating: 5,
    date: "3 months ago",
    text: "This review is regarding Melissa Sanchez. Great service — Melissa has a full understanding of the job she performs. Thank you very much for your time. She was knowledgeable, very patient and very resourceful.",
  },
  {
    name: "Gale Fenton",
    rating: 5,
    date: "3 months ago",
    text: "Nickolas was very nice. Answered all my questions. Found me a good Plan G policy. A pleasure to talk to and glad I called your office. Thanks again!",
  },
  {
    name: "Patricia Allende de Jung",
    rating: 5,
    date: "5 months ago",
    text: "Olivia was so patient, helpful, courteous, great at explaining issues and details, knowledgeable — and even more patient! What a pleasure it was to work with this most gracious and bright young lady. Thank you for getting me through this Medicare process.",
  },
  {
    name: "Victoria Leone",
    rating: 5,
    date: "2 months ago",
    text: "EIP has been my go-to for several years now. I always do my research on insurance first and then call them with any questions. They have steered me in the right directions so far and are always professional. I never felt that they were talking down to me.",
  },
  {
    name: "Heather Bickford",
    rating: 5,
    date: "5 months ago",
    text: "Trevor Hanson was top notch — friendly, professional, very comprehensive in explaining a complicated issue. I thoroughly understood everything and am grateful for his patience. Thank you Trevor!!",
  },
  {
    name: "Wayne Spicer",
    rating: 5,
    date: "4 months ago",
    text: "My agent reached out to me with a recommendation for a comparable policy at over $100 less for the same coverage. I recommend Elite to anyone that needs help with their insurance needs.",
  },
  {
    name: "Holly Leeds",
    rating: 5,
    date: "4 months ago",
    text: "Olivia helped me address a series of errors in information received from another agent at a different company. She was understanding and awesome.",
  },
  {
    name: "Patty Connolly",
    rating: 5,
    date: "6 months ago",
    text: "What a wonderful and pleasant experience signing up for a new Medicare Supplemental Medical Insurance company. Diego Joya was a joy to work with — professional, most helpful and kind. Diego is an asset to Elite Insurance Partners. I HIGHLY RECOMMEND ELITE INSURANCE PARTNERS AND ESPECIALLY DIEGO.",
  },
  {
    name: "Mary Underwood",
    rating: 5,
    date: "4 months ago",
    text: "The agent who helped me was very helpful, knowledgeable and searched for a plan that fit my budget. I'm so grateful she managed to find what I wanted at a much lower rate. Thank you so much.",
  },
  {
    name: "Catherine",
    rating: 5,
    date: "5 months ago",
    text: "Spoke with Eric Garcia yesterday — what a tremendous help, and he did it with a great sense of humor. Would recommend Elite to anyone looking to research Medicare plans. Thanks Eric!",
  },
  {
    name: "Bill Parrish",
    rating: 5,
    date: "2 months ago",
    text: "Elite Insurance Partners representatives are very knowledgeable and helpful, answering all our questions, making excellent recommendations and efficiently processing our paperwork.",
  },
  {
    name: "Marilyn Yopp",
    rating: 5,
    date: "3 months ago",
    text: "Daniel Almeida was great in helping me navigate my supplemental insurance options. He contacted an insurance rep and stayed on the phone with me through the entire process. After switching, I found out that my preferred health system no longer accepted my previous insurer — I'm so glad Daniel helped me make the right move.",
  },
  {
    name: "Jody Heywood",
    rating: 5,
    date: "4 months ago",
    text: "This morning I worked with Olivia Colon to correct some errors on my new plan. I was upset when I called and Olivia was very patient and understanding, helping to correct these errors and helping me find new doctors in my plan. Great customer service Olivia! Keep up the good work.",
  },
];

/**
 * Returns `count` randomly selected reviews from the pool.
 * Uses a seeded shuffle so the selection changes on every call.
 */
export function getRandomReviews(count: number = 3): GoogleReview[] {
  const shuffled = [...googleReviews].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
