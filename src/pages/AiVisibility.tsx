import ServicePage, { type ServicePageContent } from "@/components/site/ServicePage";

const content: ServicePageContent = {
  id: "ai-visibility",
  name: "AI Visibility",
  title: "Help customers find you when they ask AI who to call.",
  intro:
    "More people ask ChatGPT, Google and other AI tools for a recommendation before they ever visit a website. We make it easy for those tools to find your business and describe it correctly.",
  whyTitle: "Why this matters now",
  reasons: [
    {
      title: "Customers are asking AI, not scrolling results.",
      body: "Someone asks who to call for a leaking pipe or who the best electrician nearby is, and gets one short answer instead of ten links. If your business is missing or unclear, you are not part of that answer.",
    },
    {
      title: "AI tools only know what they can read.",
      body: "They pull from your website, your Google listing and other places online. When those disagree or leave gaps, the tool guesses, or leaves you out.",
    },
    {
      title: "It needs steady attention.",
      body: "Listings change, competitors update, and AI tools change how they answer. Staying visible is ongoing work, not a one-time fix.",
    },
  ],
  problems: [
    {
      problem: "Your details do not match everywhere",
      detail:
        "Your name, hours, address and services show up differently from one site to the next, so nothing about you looks certain.",
      fix: "I bring every listing in line, so each place that mentions you tells the same story.",
    },
    {
      problem: "Your Google listing is half finished",
      detail: "Missing categories, old photos, wrong hours, and nothing new in months.",
      fix: "I complete it, correct it, and keep it current as your business changes.",
    },
    {
      problem: "Your website does not say what you do",
      detail:
        "Pages are vague, thin, or hard for tools to read, so they cannot tell what you offer or where you work.",
      fix: "I rewrite and organize your pages so your services, your service areas and the questions customers ask are all clear.",
    },
    {
      problem: "You have no idea how you show up today",
      detail: "Most owners have never checked what AI tools actually say about their business.",
      fix: "I check, and I show you plainly. We start from facts, not guesses.",
    },
  ],
  checklistTitle: "Your visibility checklist",
  checklist: [
    { label: "Business details", before: "Different on different sites", after: "Matching everywhere" },
    { label: "Google listing", before: "Missing information", after: "Complete and current" },
    { label: "Website pages", before: "Vague about your services", after: "Clear about what you do and where" },
    { label: "Common questions", before: "Not answered on your site", after: "Written and in place" },
    { label: "How AI tools describe you", before: "Never checked", after: "Checked and tracked each month" },
    { label: "Reporting", before: "Nothing to look at", after: "A short plain report every month" },
  ],
  steps: [
    {
      title: "Audit",
      body: "I look at your website, your Google listing and how AI tools describe you today.",
    },
    {
      title: "Setup",
      body: "I fix what is wrong and fill in what is missing. This is the one-time setup.",
    },
    {
      title: "Monthly care",
      body: "Each month I keep everything current, watch for changes, and send you a short report.",
    },
  ],
  gets: [
    "A clear picture of how you show up today",
    "Fixes handled for you, with no homework",
    "A short report each month in plain language",
    "A real person to call when something looks off",
  ],
  note: "No one can promise you a spot in an AI answer, and anyone who does is guessing. What I can do is remove the reasons you would be skipped and keep your information accurate.",
  price: { value: 400, unit: "/mo", note: "Plus a one-time setup, quoted on the call" },
};

export default function AiVisibility() {
  return <ServicePage c={content} />;
}
