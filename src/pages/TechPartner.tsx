import ServicePage, { type ServicePageContent } from "@/components/site/ServicePage";

const content: ServicePageContent = {
  id: "tech-partner",
  name: "Tech Partner",
  title: "Your tech handled, so you can run your business.",
  intro:
    "Software, accounts, backups and AI tools for your office, set up properly and looked after by one person you can call.",
  whyTitle: "Why it is worth handing off",
  reasons: [
    {
      title: "Small problems cost whole days.",
      body: "A locked account, a failed backup or a dead laptop tends to show up on your busiest day, and then everything stops.",
    },
    {
      title: "Nobody really owns it.",
      body: "Passwords live in one person's head, a relative set things up years ago, and no one is sure what is paid for or turned on.",
    },
    {
      title: "AI is already in your office.",
      body: "Staff are probably using free AI tools with customer information. A little setup keeps that useful and safe.",
    },
  ],
  problems: [
    {
      problem: "Shared passwords and no way back in",
      detail:
        "Everyone uses the same login, and if one person leaves or one account is lost, getting back in is a scramble.",
      fix: "I move your accounts into a proper setup where access is controlled, recoverable and easy to hand over.",
    },
    {
      problem: "Backups nobody has checked",
      detail: "You think you have backups, but no one has ever tried to restore anything.",
      fix: "I set up backups that run on their own, and I test them so you know they actually work.",
    },
    {
      problem: "Software you pay for and tools that do not fit",
      detail: "Subscriptions pile up, some are never used, and the ones you need do not work together.",
      fix: "I review what you have, set up what you need, and remove what you do not.",
    },
    {
      problem: "No one to call when it breaks",
      detail:
        "You lose time searching for help, waiting in queues, or asking someone who does not know your setup.",
      fix: "You call me. I know your setup, and I either fix it or tell you plainly what it needs.",
    },
    {
      problem: "Staff using AI without guidance",
      detail: "Everyone is trying different tools, and no one has decided what is safe to share.",
      fix: "I set up AI tools that fit how your team works, with simple ground rules that protect customer information.",
    },
  ],
  checklistTitle: "Your tech checklist",
  checklist: [
    { label: "Accounts and passwords", before: "Shared logins", after: "Secured and recoverable" },
    { label: "Email", before: "Set up differently for each person", after: "Set up properly for everyone" },
    { label: "Backups", before: "Assumed to work", after: "Running on their own and tested" },
    { label: "Software", before: "Paid for and forgotten", after: "Reviewed, trimmed and organized" },
    { label: "AI tools", before: "Used without any rules", after: "Set up for your team with clear rules" },
    { label: "Support", before: "Searching for help", after: "One person who knows your setup" },
  ],
  steps: [
    {
      title: "Look around",
      body: "I go through your accounts, devices, software and backups to see what you have and what is at risk.",
    },
    {
      title: "Set it up right",
      body: "I fix the gaps, organize everything, and write down what lives where, so nothing depends on one person's memory.",
    },
    {
      title: "Keep it looked after",
      body: "Each month I check in, handle updates and problems, and keep your setup current as your business changes.",
    },
  ],
  gets: [
    "One monthly price for the work we agree on",
    "A person to call who knows your setup",
    "Everything written down in plain language",
    "Regular check-ins so small issues stay small",
  ],
  note: "Every business is different, so the exact list depends on your size and what you use. The price above is where plans start, and we settle the details on the call.",
  price: { value: 250, unit: "/mo", note: "Billed monthly" },
};

export default function TechPartner() {
  return <ServicePage c={content} />;
}
