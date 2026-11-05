import userData from "@/config/userData";
import CopyButton from "../ui/copy-button";
import GitHubGraph from "../ui/github-graph";
import LastUpdated from "../ui/last-updated";
import Signature from "../ui/signature";

const Footer = ({ graph = true }: { graph?: boolean }) => {
  const { email } = userData.personalInfo;

  return (
    <div className="w-full max-w-4xl mx-auto border-dashed sm:pb-0 pb-8">
      <div className="p-4 max-w-screen-xl w-full mx-auto space-y-4 py-8 md:py-16">
        {graph && <GitHubGraph />}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground"><a href="mailto:utkarshsaxena2012@gmail.com" className="hover:underline">Email</a><a href="tel:+917985259022" className="hover:underline">+91 7985259022</a><a href="/background" className="hover:underline">Education &amp; achievements</a></div>
        <div className="flex flex-col md:flex-row w-full justify-between gap-2 md:gap-1 items-start md:items-end mt-8">
        <div className="flex-col text-start text-muted-foreground">
          <Signature />
          <LastUpdated />
        </div>
          <div className="md:grow hidden border-b border-dashed border-border" />
          <CopyButton email={email} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
