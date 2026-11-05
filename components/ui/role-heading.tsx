import Link from "next/link";
import { companies } from "@/config/companies";
import { CompanyLogo } from "./company-logo";
import { slugify } from "@/lib/utils";

/** Role on the left, dates on the right, dashed rule filling the gap. */
const RoleHeading = ({ title, date }: { title: string; date: string }) => {
  const company = companies.find(c => c.aliases.some(alias => title.toLowerCase().endsWith(alias.toLowerCase())));
  return (
    <div className="not-prose mt-10 mb-4 flex w-full flex-wrap items-baseline gap-x-3 gap-y-1">
      <h3
        id={slugify(title)}
        className="scroll-mt-24 text-xl font-medium tracking-tight text-foreground/80"
      >
        {company && <Link href={company.href} target={company.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" aria-label={company.name + " company"} className="inline-flex align-middle mr-2"><CompanyLogo name={company.name} className="size-6 sm:size-6" /></Link>}{title}
      </h3>
      <div className="grow translate-y-[-0.25rem] border-b border-border" />
      <span className="shrink-0 text-sm text-muted-foreground">{date}</span>
    </div>
  );
};

export default RoleHeading;
