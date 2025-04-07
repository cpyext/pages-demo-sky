import { Image } from "@yext/pages-components";
import { ComplexImage } from "@yext/types";
import { BsInfoCircle } from "react-icons/bs";

interface dataProps {
  name: string;
  headshot?: any;
  photoGallery?: ComplexImage[];
  slug: string;
  c_speciality?: string;
}

interface RelateProps {
  title: string;
  data: dataProps[];
}

const Related = ({ data, title }: RelateProps) => {
  return (
    <section className="space-y-4">
      <h3 className="text-[#702082] text-2xl">{title}</h3>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data.map((item: dataProps, index: any) => (
          <div key={index} className="flex border">
            <div className="w-1/3">
              {item.headshot && (
                <Image image={item.headshot} className="w-full h-auto" />
              )}
              {item.photoGallery && (
                <Image image={item.photoGallery[0]} className="w-full h-full" />
              )}
            </div>
            <div className="w-2/3 flex">
              <div className="w-4/5 p-3 text-[#58595b]">
                <p className="font-medium">{item.name}</p>
                {item.c_speciality && <p>{item.c_speciality}</p>}
              </div>
              <div className="bg-[#6f2082] w-1/5">
                <a
                  href={`/${item.slug}`}
                  className="h-full flex items-center justify-center "
                >
                  <BsInfoCircle color="white" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export default Related;
