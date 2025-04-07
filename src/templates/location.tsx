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
      "hours",
      "slug",
      "c_bannerImage",
      "richTextDescriptionV2",
      "c_servicesAvailable.name",
      "c_servicesAvailable.address",
      "c_bannerOfferte",
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
    c_bannerImage,
    MapboxMaps,
    richTextDescriptionV2,
    c_servicesAvailable,
    c_bannerOfferte,
  } = document;

  return (
    <PageLayout _site={_site}>
      {/* 🧭 Breadcrumbs */}
      <main id="main" className="centered-container space-y-12">
        <BreadCrumbs data={address} currAddress={address.line1} />
      </main>

      {/* Main + Map Section */}
      {/* 🦸 Hero Section with Map */}
      <section className="centered-container grid md:grid-cols-2 gap-6 items-start py-10">
        {/* 🔹 Left Column: Hero Info */}
        <article className="flex flex-col gap-4">
          <p className="text-xl md:text-2xl font-bold">{name}</p>
          <h1 className="text-2xl md:text-5xl font-bold">{address.line1}</h1>

          <span className="flex items-center gap-2">
            <p className="font-bold">4.5</p>
            <span className="font-normal">(21 reviews)</span>
          </span>

          <nav className="flex flex-col md:flex-row gap-4">
            <button className="font-bold md:text-lg bg-secondary text-primary w-full md:w-fit p-2 md:px-4 flex items-center justify-center border rounded-full">
              Get Directions
            </button>
            <button className="border-2 font-bold text-secondary border-secondary md:text-lg w-full md:w-fit p-2 md:px-4 flex items-center justify-center rounded-full">
              Call us
            </button>
          </nav>
        </article>

        {/* 🔹 Right Column: Map */}
        {document.mapMarker && (
          <StaticMap
            latitude={document.mapMarker.latitude}
            longitude={document.mapMarker.longitude}
          />
        )}
      </section>

      {/* 🎯 Offer & Services Section */}
      <div className="px-6 py-10 max-w-7xl mx-auto space-y-10">
        {/* 🏷 Offer Title */}
        <h1 className="text-4xl font-bold text-center">{name}</h1>

        {/* 🖼️ Banner Image */}
        <a
          href="https://trova.sky.it/c/merchandising-sky"
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className="rounded-2xl shadow-lg overflow-hidden bg-white">
            <img
              src={c_bannerImage}
              alt="Offer Banner"
              className="w-full h-80 object-cover"
            />
          </div>
        </a>

        {/* 📝 Offer Description */}
        <div className="p-6 text-lg text-gray-700 whitespace-pre-line">
          {richTextDescriptionV2}
        </div>

        {/* ✅ Available Services */}
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
      </div>
    </PageLayout>
  );
};

export default Location;
