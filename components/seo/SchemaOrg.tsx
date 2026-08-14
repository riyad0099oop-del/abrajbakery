// Structured Data (JSON-LD) components for SEO

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    "name": "أبراج للحلويات",
    "alternateName": "Abraj Sweets",
    "description": "أجود الحلويات الشرقية والغربية والمخبوزات الطازجة بمكة المكرمة. تشكيلة واسعة من الكنافة والبقلاوة والبسبوسة وكيك المناسبات وبوفيهات الأفراح.",
    "url": "https://abraj-sweets.com",
    "logo": "https://abraj-sweets.com/images/1786624083357.png",
    "image": "https://abraj-sweets.com/images/og-image.jpg",
    "telephone": "+966-55-123-4567",
    "priceRange": "$$",
    "servesCuisine": ["حلويات شرقية", "حلويات غربية", "مخبوزات"],
    "currenciesAccepted": "SAR",
    "paymentAccepted": "Cash, Credit Card",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "حي العزيزية",
        "addressLocality": "مكة المكرمة",
        "addressRegion": "منطقة مكة المكرمة",
        "addressCountry": "SA",
        "postalCode": "21955"
      }
    ],
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
    "hasMap": "https://maps.google.com/?q=Makkah+Al-Aziziyah",
    "sameAs": [
      "https://www.tiktok.com/@d.t.ksa1",
      "https://www.instagram.com/d.t.ksa1",
      "https://www.facebook.com/share/1DNqkQgg3T/"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "320"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductSchema({ name, description, price, image }: {
  name: string;
  description: string;
  price: number;
  image: string;
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "image": `https://abraj-sweets.com${image}`,
    "brand": {
      "@type": "Brand",
      "name": "أبراج للحلويات"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "SAR",
      "price": price,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "أبراج للحلويات"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
