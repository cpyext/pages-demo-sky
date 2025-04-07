import {
  Address,
  AddressType,
  getDirections,
  HoursStatus,
  HoursTable,
  Image,
} from "@yext/pages-components";
import { ComplexImage, Hours as _Hours } from "@yext/types";
import StarRating from "./starRating";
import Hours from "./hours";

interface LocationProps {}

interface BannerProp {
  headshot?: ComplexImage;
  reviews?: number;
  reviewsAverage?: number;
  group?: string;
  name?: string;
  hours?: _Hours;
  photo?: ComplexImage;
  address?: AddressType;
  mainPhone?: string;
  fax?: string;
  showCTAs?: boolean;
  services?: string[];
  timezone: string;
  speciality?: string;
  network?: string;
}

interface BannerProps {
  type: BannerProp;
  direction: "LTR" | "RTL";
}

const Banner = ({ type, direction }: BannerProps) => {
  const {
    name,
    hours,
    photo,
    headshot,
    reviews,
    reviewsAverage,
    group,
    address,
    mainPhone,
    showCTAs = false,
    services,
    timezone,
    speciality,
    network,
    fax,
  } = type;
  console.log(JSON.stringify(type));

  return (
    <section className="flex flex-col ">
      {direction === "LTR" ? (
        <section className="flex flex-col md:flex-row md:h-96">
          <article className="relative w-full flex flex-col md:w-1/3 border p-2 md:p-6 gap-6 text-white">
            <Image
              image={photo}
              className="absolute top-0 left-0 w-full h-full object-cover"
            ></Image>
            <div className="absolute top-0 left-0 w-full h-full bg-[#6f2082] opacity-85"></div>
            <div className="relative z-10 space-y-4">
              <p className="text-2xl md:text-4xl">{name}</p>
              <HoursStatus hours={hours} timezone={timezone} />
            </div>
          </article>

          <article className="w-full md:w-2/3 border h-full">
            <Image image={photo} className="h-full w-full object-cover" />
          </article>
        </section>
      ) : (
        <section className={`flex flex-col md:flex-row md:h-96`}>
          <article className="w-full flex flex-col md:w-1/3 border">
            <Image image={headshot} className="h-full w-full object-cover" />
          </article>
          <article
            className={`relative w-full md:w-2/3 border h-full   bg-[#94579a] p-8  md:px-16 md:py-4  text-white`}
          >
            <Image
              image={photo}
              className="absolute top-0 left-0 w-full h-full object-cover"
            ></Image>
            <div className="absolute top-0 left-0 w-full h-full bg-[#6f2082] opacity-85"></div>
            <div className=" relative z-10 flex flex-col gap-1">
              <p className=" text-2xl md:text-4xl ">{name}</p>
              <p className="text-lg">
                {network} - {speciality}
              </p>
              <HoursStatus hours={hours} timezone={timezone} />
              <div className="flex gap-0.5">
                <StarRating
                  selectedStars={5}
                  color={"#f5b939"}
                  bigFont={true}
                />
              </div>
              <p>{reviewsAverage} out of 5</p>
              <p>{reviews} reviews</p>
            </div>
            {showCTAs && (
              <div className="relative z-10 flex md:flex-col gap-2 mt-8">
                <div className="text-sm md:text-base cursor-pointer order-2 border-white w-fit md:w-[200px] px-4 rounded-md py-2 flex justify-center text-[#6f2082] bg-white hover:bg-[#6f2082] hover:text-white">
                  Make an Appointment
                </div>
                <div className="text-sm md:text-base cursor-pointer border-2 border-white w-fit md:w-[200px] px-4 rounded-md py-2 flex justify-center text-white hover:bg-[#6f2082] hover:text-white">
                  Call me
                </div>
              </div>
            )}
          </article>
        </section>
      )}

      <section className={`flex flex-col md:flex-row`}>
        {direction === "LTR" ? (
          <article className="w-full flex flex-col md:w-1/3 border p-6 bg-[#f4f3f8] items-center justify-center">
            <div className="flex md:flex-col gap-4 m-auto">
              <div className="text-sm md:text-base cursor-pointer border-2 border-white w-fit md:w-[200px] px-4 rounded-md py-3 flex justify-center  bg-[#6f2082]  text-white hover:opacity-85">
                Make an Appointment
              </div>
              <div className="text-sm md:text-base cursor-pointer border-2   w-fit md:w-[200px] px-4 rounded-md py-3 flex justify-center border-[#6f2082] text-[#6f2082] hover:bg-[#6f2082] hover:text-white">
                Get Directions
              </div>
            </div>
          </article>
        ) : (
          <article className="w-full flex flex-col md:w-1/3 border p-6 bg-[#f4f3f8] text-[#702082]">
            <h3 className="text-lg text-[#702082]">Services</h3>
            <ul className="list-disc">
              {services?.map((item, index) => (
                <li className="ml-4 py-2 text-[#58595b]" key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        )}
        <article className="w-full md:w-2/3 border h-full flex flex-col md:flex-row text-[#5d5d5d]">
          <article className="w-full md:w-1/2 flex flex-col px-8 py-0 pt-4 md:p-8 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg text-[#702082]">Address</h3>
              <Address
                address={address}
                typeof={typeof Address}
                lines={[["line1", "city", ",", "region", "postalCode"]]}
              />
              <div>
                <a className="underline" href={getDirections(address)}>
                  Get Directions
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg text-[#702082]">Contact</h3>
              <p>Phone: {formatPhoneNumber(mainPhone)}</p>
              <p>Fax: {formatPhoneNumber(fax)}</p>
            </div>
          </article>
          <article className="w-full md:w-1/2 p-8">
            <h3 className="text-lg text-[#702082] mb-2">Hours</h3>
            <Hours hours={hours} timezone="" />
          </article>
        </article>
      </section>
    </section>
  );
};

export default Banner;

function formatPhoneNumber(phoneNumber: any) {
  // Extract digits from the input number
  const digits = phoneNumber.replace(/\D/g, ""); // Remove all non-numeric characters

  // Ensure the number has at least 10 digits
  if (digits.length !== 11 || !digits.startsWith("1")) {
    throw new Error("Invalid phone number format");
  }

  // Extract the relevant parts (area code, first 3, last 4)
  const areaCode = digits.substring(1, 4);
  const firstThree = digits.substring(4, 7);
  const lastFour = digits.substring(7, 11);

  // Return formatted phone number
  return `(${areaCode}) ${firstThree}-${lastFour}`;
}
