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
import { BsSearchHeartFill } from "react-icons/bs";
import Banner from "../components/banner";
import Insurance from "../components/insurance";
import AboutUs from "../components/aboutUs";
import Reviews from "../components/reviews";
import PageLayout from "../components/page-layout";
import BreadCrumbs from "../components/breadCrumbs";
import Related from "../components/related";
import ProfessionalSchema from "../components/professionalSchema";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-2",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "description",
      "hours",
      "slug",
      "headshot",
      "insuranceAccepted",
      "educationList",
      "c_professionalReviews",
      "services",
      "timezone",
      "c_professionalLocation.name",
      "c_professionalLocation.slug",
      "c_professionalLocation.id",
      "c_professionalLocation.photoGallery",
      "c_speciality",
      "c_network",
      "fax",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["healthcareProfessional"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */
export const getPath: GetPath<TemplateProps> = ({ document }) => {
  return document.slug
    ? document.slug
    : `${document.locale}/${document.address.region}/${document.address.city}/${
        document.address.line1
      }-${document.id.toString()}`;
};

/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};

/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
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
          content: document.description,
        },
      },
    ],
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 *
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const Professional: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const _cpy = document;

  const {
    _site,
    name,
    address,
    openTime,
    hours,
    mainPhone,
    geocodedCoordinate,
    description,
    headshot,
    insuranceAccepted,
    educationList,
    c_professionalReviews,
    services,
    timezone,
    c_professionalLocation,
    c_speciality,
    c_network,
    fax,
  } = document;

  return (
    <PageLayout _site={_site}>
      <ProfessionalSchema document={_cpy} />
      <main id="main" className="centered-container space-y-12 text-[#58595b]">
        <BreadCrumbs data={address} currAddress={address.line1} />
        <Banner
          direction="RTL"
          type={{
            name: name,
            headshot,
            photo: c_professionalLocation[0].photoGallery[0],
            hours: hours,
            address,
            mainPhone,
            reviews: c_professionalReviews.ratings,
            reviewsAverage: c_professionalReviews.aggregate,
            showCTAs: true,
            services,
            timezone,
            speciality: c_speciality,
            network: c_network,
            fax,
          }}
        />

        <AboutUs
          title={`About ${name}`}
          description={description}
          coordinates={geocodedCoordinate}
          educationList={educationList}
        />
        <Reviews patientExp={c_professionalReviews} name={name} />
        <Related
          data={c_professionalLocation}
          title="Locations of the Provider"
        />

        <Insurance
          insurances={insuranceAccepted}
          title={"Insurance Accepted"}
        />
      </main>
    </PageLayout>
  );
};

export default Professional;
