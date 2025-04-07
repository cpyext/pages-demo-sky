import { JsonLd } from "react-schemaorg";
import { ClothingStore, FAQPage, Place, ItemList, Hospital } from "schema-dts";
const Schema = (props: any) => {
  const { document } = props;
  const name = `${document.name} in ${document.address.city}, ${document.address.region}`;
  const address = document.address;
  const telephone = document.mainPhone;
  const description = document.decription;
  const faqsList: any = [];
  const productsList: any = [];
  const itemListElement: any = [];
  if (document.services) {
    document.services.forEach((item: any) => {
      itemListElement.push({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${item}`,
        },
      });
    });
  }
  if (document.c_locationServices) {
    document.c_locationServices.forEach((item: any) => {
      itemListElement.push({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `${item.name}`,
        },
      });
    });
  }

  return (
    <>
      <JsonLd<Hospital>
        item={{
          "@context": "https://schema.org",
          "@type": "Hospital",
          name,
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
          description: description,
          openingHours: document.hours
            ? buildHoursSchema(document.hours)
            : "Mo,Tu,We,Th 09:00-12:00",
          telephone: telephone,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Services",
            itemListElement: itemListElement,
          },
        }}
      />

      {document.geocodedCoordinate && (
        <JsonLd<Place>
          item={{
            "@context": "https://schema.org",
            "@type": "Place",
            geo: {
              "@type": "GeoCoordinates",
              latitude: document.geocodedCoordinate.latitude,
              longitude: document.geocodedCoordinate.longitude,
            },
          }}
        />
      )}
    </>
  );
};

const buildHoursSchema = (hoursData: any) => {
  const nHrs: any = [];
  Object.keys(hoursData).forEach((item) =>
    nHrs.push(
      hoursData[item].openIntervals &&
        `${item.substring(0, 2).replace(/./, (c) => c.toUpperCase())} ${
          hoursData[item].openIntervals[0].start
        }-${hoursData[item].openIntervals[0].end}`
    )
  );
  return nHrs;
};

export default Schema;
