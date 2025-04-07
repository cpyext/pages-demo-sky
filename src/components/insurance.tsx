import { useEffect, useState } from "react";

interface ExternalResourcesProps {
  label: string;
  link: string;
}

interface ServicesResourcesProps {
  name: string;
  description: string;
}

interface InsuranceProps {
  insurances: (ExternalResourcesProps | string | ServicesResourcesProps)[];
  showBullet?: boolean;
  title: string;
}

const Insurance = ({
  insurances,
  showBullet = false,
  title,
}: InsuranceProps) => {
  const [seeAll, setSeeAll] = useState<boolean>(false);
  const [visibleInsurances, setVisibleInsurances] = useState<any[]>(insurances);
  useEffect(() => {
    seeAll
      ? setVisibleInsurances(insurances)
      : setVisibleInsurances(insurances.slice(0, 12));
  }, [seeAll]);
  return (
    <section className="space-y-4">
      <h3 className="text-[#702082] text-2xl">{title}</h3>
      <ul
        className={`grid grid-cols-1 md:grid-cols-3 ${
          showBullet ? `bg-[#ededed] list-disc p-6 gap-2` : `bg-white`
        } gap-4`}
      >
        {visibleInsurances.map((item, index) => (
          <li
            key={index}
            className={`${
              showBullet ? `list-item underline` : `p-3`
            } text-sm w-full text-[#58595b] bg-[#ededed] flex flex-col items-start space-y-1`}
          >
            {typeof item === "string" ? (
              <p className="w-full text-center">{item}</p>
            ) : "link" in item ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {item.label}
              </a>
            ) : (
              <>
                <h4 className="font-semibold text-[#58595b] text-lg underline">
                  {item.name}
                </h4>
                <p className="text-base text-gray-600">{item.description}</p>
              </>
            )}
          </li>
        ))}
      </ul>
      {insurances.length >= 13 && (
        <article
          className="mt-8 font-light underline cursor-pointer"
          onClick={() => setSeeAll(!seeAll)}
        >
          See More
        </article>
      )}
    </section>
  );
};

export default Insurance;
