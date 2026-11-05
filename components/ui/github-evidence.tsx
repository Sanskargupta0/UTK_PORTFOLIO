import Link from "next/link";
import snapshot from "@/content/github-evidence.json";
import ImageModal from "./image-modal";

export function PiovationContributions() {
  return (
    <figure className="not-prose my-6">
      <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
        {/* Brand asset supplied by Piovation's public website. */}
        <img src="/companies/piovation.png" alt="Piovation" width={24} height={24} className="size-6 rounded bg-black p-1" />
        <span>Piovation / private repository contributions</span>
      </div>
      <ImageModal
        src="/work/piovation-contributors.png"
        alt="Piovation contribution chart with UtkarshSaxenautk and his profile photo, with other contributors blurred."
        title="Piovation contributions — click to enlarge"
        className="my-0 rounded-lg"
      />
    </figure>
  );
}

export function GitHubEvidence() {
  const date = new Date(snapshot.fetchedAt).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Kolkata",
  });
  return (
    <figure className="not-prose my-6">
      <ImageModal
        src="/work/github-activity.png"
        alt={`Utkarsh Saxena's public GitHub profile: ${snapshot.activity.total.lastYear} contributions in the last-year view, ${snapshot.profile.public_repos} public repositories, snapshot ${date}`}
        title="Public GitHub contribution snapshot - click to enlarge"
        className="my-0 rounded-lg"
      />
      <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground/70">
        <span>Public profile snapshot / {date}</span>
        <Link href={snapshot.profile.html_url} target="_blank" rel="noopener noreferrer" className="border-b border-dashed hover:text-foreground">View GitHub profile</Link>
      </figcaption>
    </figure>
  );
}
