import { Coordinate } from "@yext/pages-components";
import StaticMap from "./static-map";
interface EducationProps {
  institutionName: string;
  type: "RESIDENCY" | "INTERNSHIP" | "MEDICAL_SCHOOL";
  yearCompleted: number;
}

interface AboutUsProps {
  title: string;
  description: string;
  coordinates: Coordinate;
  educationList: EducationProps[];
}

const AboutUs = ({
  title,
  description,
  coordinates,
  educationList,
}: AboutUsProps) => {
  return (
    <section className="w-full flex flex-col md:flex-row justify-between gap-8">
      <div className="space-y-4 w-full md:w-1/2 text-[#58595b]">
        <h3 className="text-[#702082] text-2xl">{title}</h3>
        <p className="text-lg">{description}</p>
      </div>
      <div className="w-full md:w-1/2">
        {coordinates ? (
          <StaticMap
            latitude={coordinates.latitude}
            longitude={coordinates.longitude}
          />
        ) : (
          <article className="grid grid-cols-2 gap-4 text-[#58595b]">
            {educationList.map((item, index) => (
              <div className="bg-[#ededed] p-3 flex flex-col gap-1" key={index}>
                <p className="font-medium">
                  {item.type === "MEDICAL_SCHOOL"
                    ? `MEDICAL SCHOOL`
                    : item.type}
                </p>
                <ul className="list-disc pl-4">
                  <li className="text-sm h-32">
                    {item.institutionName}-{item.yearCompleted}
                  </li>
                </ul>
              </div>
            ))}
          </article>
        )}
      </div>
    </section>
  );
};

export default AboutUs;
