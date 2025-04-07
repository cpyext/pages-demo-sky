import { JsonLd } from "react-schemaorg";
import {
  Physician,
  Place,
  OfferCatalog,
  Offer,
  PostalAddress,
  Review,
  Rating,
} from "schema-dts";

const ProfessionalSchema = (props: any) => {
  const { document } = props;
  const name = `${document.name}, MD in ${document.address.city}, ${document.address.region}`;
  const address = document.address;
  const telephone = document.mainPhone;
  const description = document.description;
  const itemListElement: any = [];

  if (document.services) {
    document.services.forEach((item: any) => {
      itemListElement.push({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item,
        },
      });
    });
  }

  return (
    <>
      <JsonLd<Physician>
        item={{
          "@context": "https://schema.org",
          "@type": "Physician",
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
          openingHoursSpecification: document.hours
            ? buildHoursSchema(document.hours)
            : [],
          telephone: telephone,
          medicalSpecialty: document.c_speciality,
          isAcceptingNewPatients: document.isAcceptingNewPatients,
          healthPlanNetworkId: document.healthPlanNetworkId,
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: document.c_professionalReviews.aggregate,
            reviewCount: document.c_professionalReviews.ratings,
          },
          review: document.c_professionalReviews.reviews.map((rev: any) => ({
            "@type": "Review",
            author: rev.author ? rev.author : "Anonymous",
            datePublished: rev.dateCreated,
            reviewBody: rev.description,
            name: "Patient Review",
            reviewRating: {
              "@type": "Rating",
              bestRating: "5",
              ratingValue: rev.value,
              worstRating: "1",
            },
          })),
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
  return Object.keys(hoursData).map((day) => {
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: day.charAt(0).toUpperCase() + day.slice(1),
      opens: hoursData[day].openIntervals
        ? hoursData[day].openIntervals[0].start
        : "Closed",
      closes: hoursData[day].openIntervals
        ? hoursData[day].openIntervals[0].end
        : "Closed",
    };
  });
};

export default ProfessionalSchema;
