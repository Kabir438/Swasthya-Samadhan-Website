import { Metadata } from "next";
import HomePage from "./_page";

export const metadata: Metadata = {
    metadataBase: new URL('https://swasthyasamadhan.com/'),
    title: "Swasthya Samadhan | About the Team",
    description:
      "Swasthya Samadhan is a technology company that pioneers in the free health industry by harnessing the power of AI.",
    applicationName: "Swasthya Samadhan",
    authors: {
      name: "Kabir Chawla",
      url: new URL("https://kabir-chawla.com"),
    },
    generator: "Next.js",
    keywords: [
      "Health",
      "App",
      "Swasthya Samadhan",
      "Swasthya",
      "Samadhan",
      "AI Health",
      "Health Assistant",
    ],
    referrer: "no-referrer",
    creator: "Kabir Chawla",
    publisher: "Kabir Chawla",
    robots: { index: true, follow: true },
    icons: {
      icon: '/favicon/icon.png',
      shortcut: '/favicon/icon.png',
      apple: '/favicon/apple-touch-icon.png',
    },
    manifest: `/site.webmanifest`,
    openGraph: {
      type: "website",
      determiner: "the",
      title: "Swasthya Samadhan | About the Team",
      description: "Swasthya Samadhan is a technology company that pioneers in the free health industry by harnessing the power of AI.",
      url: new URL('https://swasthyasamadhan.com'),
      locale: "en-US",
      siteName: "Swasthya Samadhan",
      countryName: "India",
      images: {
        url: "/og/og.png",
        type: "image/png",
        alt: "A poster of Swasthya Samadhan",
        width: 1200,
        height: 630
      }
    }
  };

export default function Page() {
    return <HomePage />
}