import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import "../index.css";
import PageLayout from "../components/page-layout";
import BreadCrumbs from "../components/breadCrumbs";
import StaticMap from "../components/static-map";
import { Image, LexicalRichText } from "@yext/pages-components";
import Carousel from "../components/Carousel";
import {
  Address,
  HoursStatus,
  HoursTable,
  getDirections,
  Map,
  MapboxMaps,
  Marker,
} from "@yext/pages-components";

// Template config
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-1",
    fields: [
      "id",
      "uid",
      "meta",
      "timezone",
      "name",
      "address",
      "mainPhone",
      "reservationUrl",
      "hours",
      "slug",
      "yextDisplayCoordinate",
      "c_servicesAvailable.name",
      "c_servicesAvailable.c_icon",
      "c_servicesAvailable.richTextDescriptionV2",
      "c_bannerOfferte.c_bannerImage",
      "c_bannerOfferte.richTextDescriptionV2",
      "c_staticBanner.c_bannerImage",
    ],
    filter: {
      entityTypes: ["location"],
    },
    localization: {
      locales: ["it"],
    },
  },
};

// Path for live pages
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};

// Redirects
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

// HTML Head
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description || document.name,
        },
      },
    ],
  };
};

// --- Types ---
type Service = {
  name: string;
  richTextDescriptionV2: string;
};

type Location = {
  name: string;
  address?: string;
  slug?: string;
};

// --- Template Function ---
const Location: Template<TemplateRenderProps> = ({
  document,
  relativePrefixToRoot,
  path,
}) => {
  const {
    _site,
    name,
    address,
    mainPhone,
    hours,
    reservationUrl,
    c_staticBanner,
    yextDisplayCoordinate,
    c_servicesAvailable,
    c_bannerOfferte,
  } = document;

  return (
    <PageLayout _site={_site}>
      {/* 🧭 Breadcrumbs */}
      <main id="main" className="centered-container space-y-12">
        <BreadCrumbs data={address} currAddress={address.line1} />
      </main>
      <div className="centered-container space-y-12">
       
       
       
       
        {/* Offer Section */}
        {c_bannerOfferte && (
          <div className="mt-16 w-full">
            <h1 className="text-4xl font-bold text-center">{name}</h1>
            <Carousel data={c_bannerOfferte} />
          </div>
        )}




        

        {/* Main + Map Section */}
        {/* 🦸 Hero Section with Map */}
        <section className=" grid grid-cols-1 md:grid-cols-3 gap-6 items-start ">
          {/* :large_blue_square: Column 1: Info (with inline CTAs) */}
          <article className="flex flex-col gap-4">
            <p className="text-xl md:text-2xl font-bold">{name}</p>
            <h1 className="text-2xl md:text-5xl font-bold">{address.line1}</h1>
            <HoursStatus
              currentTemplate={(params: any) => (
                <span className="HoursStatus-current--search">
                  {params.isOpen ? (
                    <span className="font-bold">Open Now</span>
                  ) : (
                    <span className="font-bold">Closed</span>
                  )}
                </span>
              )}
              hours={hours}
              timezone={document.timezone}
              className="text-lg"
              dayOfWeekTemplate={() => null}
            />
            <span className="flex items-center gap-2">
              <p className="font-bold">4.5</p>
              <span className="font-normal">(21 reviews)</span>
            </span>
            {/* :small_blue_diamond: Inline CTAs */}
            <nav className="flex flex-col md:flex-row gap-4">
              {yextDisplayCoordinate.latitude &&
                yextDisplayCoordinate.longitude && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${yextDisplayCoordinate.latitude},${yextDisplayCoordinate.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold md:text-lg bg-secondary text-primary w-full md:w-fit p-2 md:px-4 flex items-center justify-center border rounded-full"
                  >
                    Ottieni indicazioni
                  </a>
                )}
              {mainPhone && (
                <a
                  href={`tel:${mainPhone}`}
                  className="border-2 font-bold text-secondary border-secondary md:text-lg w-full md:w-fit p-2 md:px-4 flex items-center justify-center rounded-full"
                >
                  Chiama
                </a>
              )}
              {reservationUrl && (
                <a
                  href={reservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 font-bold text-secondary border-secondary md:text-lg w-full md:w-fit p-2 md:px-4 flex items-center justify-center rounded-full"
                >
                  Prenota appuntamento
                </a>
              )}
            </nav>
          </article>
          {/* :large_yellow_square: Column 2: Hours */}
          <article className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Hours</h2>
            <HoursTable hours={hours} />
          </article>
          {/* :large_green_square: Column 3: Map */}
          {yextDisplayCoordinate && (
            <div className="w-full h-full">
              <StaticMap
                latitude={yextDisplayCoordinate.latitude}
                longitude={yextDisplayCoordinate.longitude}
              />
            </div>
          )}
        </section>

        {/* ✅ Available Services
        <div className="max-w-7xl mx-auto px-6 py-10">
          <h2 className="text-2xl font-bold mb-6">Available Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c_servicesAvailable.map(
              (
                service: { name: string; richTextDescriptionV2: string },
                index: number
              ) => (
                <div
                  //key={index}
                  className="border rounded-xl p-5 bg-white shadow hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600 whitespace-pre-line">
                    {service.richTextDescriptionV2}
                  </p>
                </div>
              )
            )}
          </div>
        </div> */}

        {/* ✅ Available Services */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Available Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {c_servicesAvailable.map((service: any, index: number) => (
              <div
                key={index}
                className="border rounded-xl p-5 bg-white shadow hover:shadow-lg transition-shadow"
              >
                {/* Name + Icon Row */}
                <div className="flex items-center gap-3 mb-2">
                  {service.c_icon && (
                    <Image
                      image={service.c_icon}
                      className="!max-w-none !w-6 !h-6 object-contain"
                    />
                  )}
                  <h3 className="text-xl font-semibold">{service.name}</h3>
                </div>
                <LexicalRichText
                  serializedAST={JSON.stringify(
                    service.richTextDescriptionV2.json
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 📍 Related Locations (Optional Section) */}
        {/* Uncomment if needed:
        <div>
          <h2 className="text-2xl font-semibold mb-4">Available At These Locations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {c_bannerOfferte.map((location: Location, index: number) => (
              <div
                key={index}
                className="border rounded-xl p-4 shadow hover:shadow-lg transition-shadow bg-white"
              >
                <h3 className="text-lg font-semibold mb-1">{location.name}</h3>
                {location.address && (
                  <p className="text-sm text-gray-500">{location.address}</p>
                )}
                {location.slug && (
                  <a
                    href={`/locations/${location.slug}`}
                    className="inline-block mt-3 text-blue-600 hover:underline text-sm font-medium"
                  >
                    View Location →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
        */}

        {/* Static Banner Section */}
        {c_staticBanner[0].c_bannerImage && (
          <Image
            image={c_staticBanner[0].c_bannerImage}
            className="rounded-xl border !h-[550px] w-0 object-contain mx-auto"
          />
        )}
      </div>
    </PageLayout>
  );
};

export default Location;
