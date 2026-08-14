import type { Metadata } from "next";
import { Tajawal, Cairo } from "next/font/google";
import "../globals.css";
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import JsonLd from "@/components/seo/JsonLd";

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abraj-sweets.com"),
  title: {
    default: "أبراج للحلويات | أجود الحلويات الشرقية والغربية بمكة المكرمة",
    template: "%s | أبراج للحلويات",
  },
  description:
    "أبراج للحلويات مكة — وجهتك الأولى لأشهى الحلويات الشرقية والغربية والمخبوزات الطازجة بأفضل الأسعار. تشكيلة واسعة من الكنافة، بقلاوة، بسبوسة، كيك مخصص، وبوفيهات المناسبات. توصيل سريع وخدمة احترافية.",
  keywords: [
    "حلويات مكة", "حلويات شرقية مكة", "كنافة مكة", "بقلاوة مكة",
    "كيك مخصص مكة", "بسبوسة", "مخبوزات مكة", "بوفيه حلويات",
    "حلويات العزيزية", "حلويات الشرائع", "أبراج للحلويات",
    "حلويات غربية مكة", "توصيل حلويات مكة", "طلب حلويات مكة",
    "حلويات مناسبات", "sweets makkah", "arabic sweets mecca", "kunafa makkah",
  ],
  authors: [{ name: "أبراج للحلويات" }],
  creator: "أبراج للحلويات",
  publisher: "أبراج للحلويات",
  alternates: {
    canonical: "/ar",
    languages: {
      "ar": "/ar",
      "en": "/en",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "أبراج للحلويات | أجود الحلويات الشرقية والغربية بمكة المكرمة",
    description: "متخصصون في تصنيع الحلويات الشرقية والغربية والمخبوزات الطازجة وبوفيهات المناسبات في مكة المكرمة.",
    url: "https://abraj-sweets.com",
    images: [
      {
        url: "/images/1786624083357.png",
        width: 1200,
        height: 630,
        alt: "شعار أبراج للحلويات",
      },
    ],
    type: "website",
    locale: "ar_SA",
    siteName: "أبراج للحلويات",
  },
  twitter: {
    card: "summary_large_image",
    title: "أبراج للحلويات | تصميم وطباعة في مكة",
    description: "متخصصون في الحلويات الشرقية والغربية والمخبوزات الطازجة بأفضل الأسعار.",
    images: ["/images/1786624083357.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} className={`${tajawal.variable} ${cairo.variable}`}>
      <head>
        <JsonLd />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-background text-on-background antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

