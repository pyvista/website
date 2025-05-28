import { LandingEntry } from './load-landing';
import { PackageOpen, Boxes } from 'lucide-react';
import { useBannerOffset } from '@/hooks/use-banner-offset';

const iconMap = {
  PackageOpen,
  Boxes,
};

export default function LandingPage({ entry }: { entry: LandingEntry }) {
  const offset = useBannerOffset(50);
  const FactIcon1 = iconMap[entry.factOneLogo as keyof typeof iconMap];
  const FactIcon3 = iconMap[entry.factThreeLogo as keyof typeof iconMap];

  return (
    <div id="landing" className={`${offset === "short" ? "mt-[15vh]" : "mt-[57vh]"} text-center max-w-4xl mx-auto mb-[10vh]`}>
      <h1 className="text-4xl font-bold mb-4">{entry.header}</h1>
      <p className="text-lg text-gray-700 mb-6">{entry.subheader}</p>

      <div className="flex flex-wrap justify-center items-start gap-10 mb-8">
        <div className="w-64 text-center">
          {FactIcon1 && <FactIcon1 className="mx-auto mb-2" />}
          <h3 className="font-semibold">{entry.factOneTitle}</h3>
          <p className="text-sm text-gray-600">{entry.factOneFact}</p>
        </div>
        <div className="w-64 text-center">
          <img
            src={entry.factTwoLogo}
            alt={entry.factTwoTitle}
            className="w-[20px] mx-auto mb-2"
          />
          <h3 className="font-semibold">{entry.factTwoTitle}</h3>
          <p className="text-sm text-gray-600">{entry.factTwoFact}</p>
        </div>
        <div className="w-64 text-center">
          {FactIcon3 && <FactIcon3 className="mx-auto mb-2" />}
          <h3 className="font-semibold">{entry.factThreeTitle}</h3>
          <p className="text-sm text-gray-600">{entry.factThreeFact}</p>
        </div>
      </div>
        {entry.getStarted}
        <a
          href={entry.getStartedLink}
          className="inline px-1 py-3 text-blue-600 font-semibold hover:text-blue-900 transition"
        >
            {entry.getStartedLink}.
        </a>
    </div>
  );
}
