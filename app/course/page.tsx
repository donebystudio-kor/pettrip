import { Metadata } from "next";
import CourseClient from "./CourseClient";

export const metadata: Metadata = {
  title: "반려동물 동반 여행 코스 추천",
  description: "반려동물과 함께하는 당일치기, 1박2일 여행 코스를 추천해드려요. 서울, 부산, 제주 등 주요 지역별 추천 코스를 확인하세요.",
};

export default function CoursePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[#2D2D2D] mb-2">🗺️ 여행 코스 추천</h1>
        <p className="text-sm text-[#888]">반려동물과 함께하는 당일치기 · 1박2일 코스</p>
      </div>
      <CourseClient />
    </div>
  );
}
