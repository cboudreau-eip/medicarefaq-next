/**
 * Medigap Birthday Rule data by state
 * States with a birthday rule have hasBirthdayRule: true and a link to their dedicated article
 * States without a birthday rule link to general Medigap enrollment info
 */

export interface StateRuleData {
  name: string;
  hasBirthdayRule: boolean;
  /** Brief description shown in the popup */
  description: string;
  /** Link to the relevant article */
  link: string;
  /** Window period for birthday rule states */
  window?: string;
  /** Whether it's a continuous open enrollment state (CT, NY, VT) */
  continuousOE?: boolean;
}

export const BIRTHDAY_RULE_STATES: Record<string, StateRuleData> = {
  "AL": { name: "Alabama", hasBirthdayRule: false, description: "Alabama does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "AK": { name: "Alaska", hasBirthdayRule: false, description: "Alaska does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "AZ": { name: "Arizona", hasBirthdayRule: false, description: "Arizona does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "AR": { name: "Arkansas", hasBirthdayRule: false, description: "Arkansas does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "CA": { name: "California", hasBirthdayRule: true, description: "California has a Medigap Birthday Rule allowing you to switch plans without underwriting within 60 days of your birthday.", window: "60 days after birthday", link: "/blog/california-birthday-rule/" },
  "CO": { name: "Colorado", hasBirthdayRule: false, description: "Colorado does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "CT": { name: "Connecticut", hasBirthdayRule: false, continuousOE: true, description: "Connecticut has continuous guaranteed issue. you can switch Medigap plans at any time without underwriting.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "DE": { name: "Delaware", hasBirthdayRule: true, description: "Delaware has a Medigap Birthday Rule effective January 1, 2026, allowing you to switch plans without underwriting.", window: "30 days before + 30 days after birthday", link: "/blog/delaware-birthday-rule/" },
  "FL": { name: "Florida", hasBirthdayRule: false, description: "Florida does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "GA": { name: "Georgia", hasBirthdayRule: false, description: "Georgia does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "HI": { name: "Hawaii", hasBirthdayRule: false, description: "Hawaii does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "ID": { name: "Idaho", hasBirthdayRule: true, description: "Idaho has a Medigap Birthday Rule allowing you to switch plans without underwriting within 63 days of your birthday.", window: "63 days from birthday", link: "/blog/idaho-birthday-rule/" },
  "IL": { name: "Illinois", hasBirthdayRule: true, description: "Illinois has a Medigap Birthday Rule allowing you to switch plans without underwriting within 45 days of your birthday.", window: "45 days after birthday", link: "/blog/illinois-birthday-rule/" },
  "IN": { name: "Indiana", hasBirthdayRule: false, description: "Indiana does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "IA": { name: "Iowa", hasBirthdayRule: false, description: "Iowa does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "KS": { name: "Kansas", hasBirthdayRule: false, description: "Kansas does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "KY": { name: "Kentucky", hasBirthdayRule: true, description: "Kentucky has a Medigap Birthday Rule allowing you to switch plans without underwriting within 45 days of your birthday.", window: "45 days after birthday", link: "/blog/kentucky-birthday-rule/" },
  "LA": { name: "Louisiana", hasBirthdayRule: true, description: "Louisiana has a Medigap Birthday Rule allowing you to switch plans without underwriting within 30 days before and after your birthday.", window: "30 days before + 63 days after birthday", link: "/blog/louisiana-birthday-rule/" },
  "ME": { name: "Maine", hasBirthdayRule: false, description: "Maine does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "MD": { name: "Maryland", hasBirthdayRule: true, description: "Maryland has a Medigap Birthday Rule allowing you to switch plans without underwriting within 30 days before and after your birthday.", window: "30 days before + 30 days after birthday", link: "/blog/maryland-birthday-rule/" },
  "MA": { name: "Massachusetts", hasBirthdayRule: false, continuousOE: true, description: "Massachusetts has continuous guaranteed issue. you can switch Medigap plans at any time without underwriting.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "MI": { name: "Michigan", hasBirthdayRule: false, description: "Michigan does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "MN": { name: "Minnesota", hasBirthdayRule: false, continuousOE: true, description: "Minnesota has continuous guaranteed issue. you can switch Medigap plans at any time without underwriting.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "MS": { name: "Mississippi", hasBirthdayRule: false, description: "Mississippi does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "MO": { name: "Missouri", hasBirthdayRule: false, description: "Missouri does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "MT": { name: "Montana", hasBirthdayRule: false, description: "Montana does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "NE": { name: "Nebraska", hasBirthdayRule: false, description: "Nebraska does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "NV": { name: "Nevada", hasBirthdayRule: true, description: "Nevada has a Medigap Birthday Rule allowing you to switch plans without underwriting within 60 days of your birthday.", window: "60 days after birthday", link: "/blog/nevada-birthday-rule/" },
  "NH": { name: "New Hampshire", hasBirthdayRule: false, description: "New Hampshire does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "NJ": { name: "New Jersey", hasBirthdayRule: false, description: "New Jersey does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "NM": { name: "New Mexico", hasBirthdayRule: false, description: "New Mexico does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "NY": { name: "New York", hasBirthdayRule: false, continuousOE: true, description: "New York has continuous guaranteed issue. you can switch Medigap plans at any time without underwriting.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "NC": { name: "North Carolina", hasBirthdayRule: false, description: "North Carolina does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "ND": { name: "North Dakota", hasBirthdayRule: false, description: "North Dakota does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "OH": { name: "Ohio", hasBirthdayRule: false, description: "Ohio does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "OK": { name: "Oklahoma", hasBirthdayRule: true, description: "Oklahoma has a Medigap Birthday Rule allowing you to switch plans without underwriting within 60 days of your birthday.", window: "60 days after birthday", link: "/blog/oklahoma-birthday-rule/" },
  "OR": { name: "Oregon", hasBirthdayRule: true, description: "Oregon has a Medigap Birthday Rule allowing you to switch plans without underwriting 30 days before and after your birthday.", window: "30 days before + 30 days after birthday", link: "/blog/oregon-birthday-rule/" },
  "PA": { name: "Pennsylvania", hasBirthdayRule: false, description: "Pennsylvania does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "RI": { name: "Rhode Island", hasBirthdayRule: false, description: "Rhode Island does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "SC": { name: "South Carolina", hasBirthdayRule: false, description: "South Carolina does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "SD": { name: "South Dakota", hasBirthdayRule: false, description: "South Dakota does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "TN": { name: "Tennessee", hasBirthdayRule: false, description: "Tennessee does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "TX": { name: "Texas", hasBirthdayRule: false, description: "Texas does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "UT": { name: "Utah", hasBirthdayRule: true, description: "Utah has a Medigap Birthday Rule effective May 2025, allowing you to switch plans within the same carrier without underwriting.", window: "60 days from birthday", link: "/blog/utah-birthday-rule/" },
  "VT": { name: "Vermont", hasBirthdayRule: false, continuousOE: true, description: "Vermont has continuous guaranteed issue. you can switch Medigap plans at any time without underwriting.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "VA": { name: "Virginia", hasBirthdayRule: true, description: "Virginia has a Medigap Birthday Rule effective July 2025, allowing you to switch to the same plan letter with any carrier without underwriting.", window: "60 days after birthday", link: "/blog/virginia-birthday-rule/" },
  "WA": { name: "Washington", hasBirthdayRule: false, continuousOE: true, description: "Washington has continuous guaranteed issue. you can switch Medigap plans at any time without underwriting.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "WV": { name: "West Virginia", hasBirthdayRule: false, description: "West Virginia does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "WI": { name: "Wisconsin", hasBirthdayRule: false, description: "Wisconsin does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
  "WY": { name: "Wyoming", hasBirthdayRule: false, description: "Wyoming does not have additional Medigap open enrollment periods.", link: "/medicare-supplements/medigap-birthday-rule/" },
};

/** List of state abbreviations that have the birthday rule */
export const BIRTHDAY_RULE_STATE_CODES = Object.entries(BIRTHDAY_RULE_STATES)
  .filter(([_, data]) => data.hasBirthdayRule)
  .map(([code]) => code);

/** List of state abbreviations that have continuous open enrollment */
export const CONTINUOUS_OE_STATE_CODES = Object.entries(BIRTHDAY_RULE_STATES)
  .filter(([_, data]) => data.continuousOE)
  .map(([code]) => code);
