import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://pettrip.vercel.app"),
  title: {
    default: "펫트립 - 반려동물 동반 여행지 추천",
    template: "%s | 펫트립",
  },
  alternates: {
    canonical: "/",
  },
  description:
    "강아지, 고양이와 함께하는 반려동물 동반 여행지를 추천해드려요. 펫 동반 숙소, 음식점, 관광지, 레포츠 정보를 한 곳에서 확인하세요.",
  keywords: [
    "반려동물 동반 여행",
    "강아지 동반 여행지",
    "펫 동반 숙소",
    "강아지와 여행",
    "반려견 여행",
    "펫트립",
    "강아지 동반 식당",
    "반려동물 관광지",
  ],
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "펫트립",
    title: "펫트립 - 반려동물 동반 여행지 추천",
    description:
      "강아지, 고양이와 함께하는 반려동물 동반 여행지를 추천해드려요.",
  },
  twitter: {
    card: "summary_large_image",
    title: "펫트립 - 반려동물 동반 여행지 추천",
    description:
      "강아지, 고양이와 함께하는 반려동물 동반 여행지를 추천해드려요.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-[#FFF8F0] text-[#2D2D2D] min-h-screen flex flex-col pb-16 md:pb-0">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
