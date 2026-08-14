// Server Component - لا تضف "use client" هنا أبداً

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  "name": "أبراج للحلويات",
  "alternateName": "Abraj Sweets",
  "image": "https://abraj-sweets.com/images/1786624083357.png",
  "@id": "https://abraj-sweets.com",
  "url": "https://abraj-sweets.com",
  "telephone": "+966-55-123-4567",
  "description": "أجود الحلويات الشرقية والغربية والمخبوزات الطازجة بمكة المكرمة. تشكيلة واسعة من الكنافة والبقلاوة والبسبوسة وكيك المناسبات وبوفيهات الأفراح.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "حي العزيزية",
    "addressLocality": "مكة المكرمة",
    "addressRegion": "منطقة مكة المكرمة",
    "addressCountry": "SA",
    "postalCode": "21955"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 21.3891,
    "longitude": 39.8579
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "08:00",
      "closes": "02:00"
    }
  ],
  "sameAs": [
    "https://www.tiktok.com/@d.t.ksa1",
    "https://www.instagram.com/d.t.ksa1",
    "https://www.facebook.com/share/1DNqkQgg3T/"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "320"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "منتجات وخدمات أبراج للحلويات",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "حلويات شرقية - كنافة وبقلاوة وبسبوسة" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "حلويات غربية - تشيز كيك وتارت" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "كيك مناسبات وأعياد ميلاد مخصص" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "مخبوزات طازجة وكرواسون" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "بوفيه حفلات وأفراح" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "ضيافة الشركات والفعاليات" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "توصيل سريع للحلويات بمكة المكرمة" } }
    ]
  }
};

export default function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
