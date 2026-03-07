"use client";

import { useState } from "react";
import Link from "next/link";

interface CourseSpot {
  name: string;
  desc: string;
  time: string;
}

interface Course {
  id: string;
  region: string;
  title: string;
  type: "day" | "overnight";
  typeLabel: string;
  desc: string;
  spots: CourseSpot[];
}

const COURSES: Course[] = [
  {
    id: "seoul-day",
    region: "서울",
    title: "서울 도심 펫 카페 투어",
    type: "day",
    typeLabel: "당일치기",
    desc: "성수동과 한남동의 인기 펫 카페와 한강 산책을 즐기는 코스",
    spots: [
      { name: "서울숲", desc: "반려견과 함께 산책하기 좋은 넓은 공원", time: "10:00" },
      { name: "성수동 펫 카페", desc: "반려동물 동반 가능한 브런치 카페에서 점심", time: "12:00" },
      { name: "한남동 펫 편집숍", desc: "반려동물 용품 쇼핑과 간식 타임", time: "14:00" },
      { name: "한강 반포지구", desc: "한강변 산책로에서 석양 감상", time: "17:00" },
    ],
  },
  {
    id: "seoul-overnight",
    region: "서울",
    title: "서울 근교 1박2일 힐링",
    type: "overnight",
    typeLabel: "1박2일",
    desc: "서울 근교 자연 속에서 반려동물과 여유로운 시간을 보내는 코스",
    spots: [
      { name: "북한산 둘레길", desc: "반려견과 함께 걷는 완만한 둘레길", time: "Day1 10:00" },
      { name: "은평 펫 레스토랑", desc: "반려동물 동반 가능 이탈리안 레스토랑", time: "Day1 12:30" },
      { name: "펫 동반 게스트하우스", desc: "반려동물 전용 숙소에서 휴식", time: "Day1 15:00" },
      { name: "월드컵공원", desc: "넓은 잔디광장에서 아침 산책", time: "Day2 09:00" },
      { name: "마포 펫 카페", desc: "브런치와 함께하는 여유로운 마무리", time: "Day2 11:00" },
    ],
  },
  {
    id: "busan-day",
    region: "부산",
    title: "부산 해변 산책 코스",
    type: "day",
    typeLabel: "당일치기",
    desc: "광안리와 해운대를 중심으로 바다를 즐기는 코스",
    spots: [
      { name: "광안리 해변", desc: "이른 아침 한적한 해변 산책", time: "09:00" },
      { name: "광안리 펫 카페", desc: "바다 뷰 카페에서 반려동물과 브런치", time: "11:00" },
      { name: "해운대 달맞이길", desc: "해안 산책로를 따라 여유로운 산책", time: "14:00" },
      { name: "해운대 펫 레스토랑", desc: "반려동물 동반 가능한 해산물 저녁", time: "18:00" },
    ],
  },
  {
    id: "busan-overnight",
    region: "부산",
    title: "부산-기장 해안 1박2일",
    type: "overnight",
    typeLabel: "1박2일",
    desc: "기장의 아름다운 해안과 부산 도심을 모두 즐기는 코스",
    spots: [
      { name: "기장 죽성드림세트장", desc: "이국적인 풍경 속 반려견 사진 촬영", time: "Day1 10:00" },
      { name: "기장 펫 카페", desc: "바다 뷰 카페에서 점심", time: "Day1 12:00" },
      { name: "일광해수욕장", desc: "한적한 해변에서 물놀이", time: "Day1 14:00" },
      { name: "기장 펫 펜션", desc: "반려동물 전용 숙소에서 바베큐", time: "Day1 17:00" },
      { name: "해동용궁사 산책로", desc: "해안 절경을 따라 아침 산책", time: "Day2 09:00" },
      { name: "해운대 시장", desc: "부산 맛집 투어 마무리", time: "Day2 11:30" },
    ],
  },
  {
    id: "jeju-day",
    region: "제주",
    title: "제주 동부 자연 탐방",
    type: "day",
    typeLabel: "당일치기",
    desc: "제주 동부의 자연 명소와 펫 카페를 돌아보는 코스",
    spots: [
      { name: "월정리 해변", desc: "에메랄드빛 바다에서 아침 산책", time: "09:00" },
      { name: "월정리 펫 카페", desc: "반려동물과 함께하는 브런치", time: "11:00" },
      { name: "비자림", desc: "천년의 비자나무 숲길 산책", time: "13:30" },
      { name: "세화해변", desc: "한적한 해변에서 석양 감상", time: "16:30" },
    ],
  },
  {
    id: "jeju-overnight",
    region: "제주",
    title: "제주 서부 힐링 1박2일",
    type: "overnight",
    typeLabel: "1박2일",
    desc: "제주 서부의 오름과 해변에서 반려동물과 힐링하는 코스",
    spots: [
      { name: "협재해수욕장", desc: "투명한 바다에서 반려견과 물놀이", time: "Day1 10:00" },
      { name: "애월 펫 카페", desc: "바다 뷰 카페에서 점심", time: "Day1 12:30" },
      { name: "금오름", desc: "반려견과 함께 오르는 완만한 오름", time: "Day1 15:00" },
      { name: "애월 펫 호텔", desc: "반려동물 전용 호텔에서 휴식", time: "Day1 17:30" },
      { name: "한림공원", desc: "열대식물원과 동굴 탐방", time: "Day2 09:30" },
      { name: "곽지해수욕장", desc: "한적한 해변에서 마무리 산책", time: "Day2 12:00" },
    ],
  },
  {
    id: "gangwon-day",
    region: "강원",
    title: "강릉 바다 당일치기",
    type: "day",
    typeLabel: "당일치기",
    desc: "강릉의 해변과 카페거리를 반려동물과 즐기는 코스",
    spots: [
      { name: "안목해변 카페거리", desc: "바다 뷰 펫 카페에서 커피 한잔", time: "10:00" },
      { name: "경포해변", desc: "넓은 백사장에서 산책", time: "12:00" },
      { name: "강릉 펫 레스토랑", desc: "반려동물 동반 가능한 해물 맛집", time: "13:30" },
      { name: "주문진 해변", desc: "한적한 어촌 해변에서 석양", time: "16:00" },
    ],
  },
  {
    id: "gangwon-overnight",
    region: "강원",
    title: "양양-속초 1박2일",
    type: "overnight",
    typeLabel: "1박2일",
    desc: "양양 서핑비치와 속초의 자연을 만끽하는 코스",
    spots: [
      { name: "양양 서핑비치", desc: "반려견과 해변 산책", time: "Day1 10:00" },
      { name: "양양 펫 카페", desc: "서퍼 감성 카페에서 점심", time: "Day1 12:00" },
      { name: "낙산해수욕장", desc: "동해바다 감상하며 산책", time: "Day1 14:30" },
      { name: "속초 펫 펜션", desc: "바다 뷰 펜션에서 휴식", time: "Day1 17:00" },
      { name: "영금정", desc: "일출 명소에서 아침 산책", time: "Day2 06:30" },
      { name: "속초 중앙시장", desc: "맛집 투어 마무리", time: "Day2 10:00" },
    ],
  },
  {
    id: "gyeonggi-day",
    region: "경기",
    title: "가평 자연 속 당일치기",
    type: "day",
    typeLabel: "당일치기",
    desc: "가평의 숲과 강변에서 반려동물과 힐링하는 코스",
    spots: [
      { name: "자라섬", desc: "북한강변 산책과 피크닉", time: "10:00" },
      { name: "가평 펫 카페", desc: "산 뷰 카페에서 브런치", time: "12:00" },
      { name: "남이섬 주변 산책", desc: "강변 둘레길 산책", time: "14:00" },
      { name: "청평 호수", desc: "호수변 석양 감상", time: "17:00" },
    ],
  },
  {
    id: "gyeonggi-overnight",
    region: "경기",
    title: "양평 계곡 1박2일",
    type: "overnight",
    typeLabel: "1박2일",
    desc: "양평의 계곡과 숲에서 반려동물과 캠핑하는 코스",
    spots: [
      { name: "두물머리", desc: "두 강이 만나는 명소에서 산책", time: "Day1 10:00" },
      { name: "양평 펫 레스토랑", desc: "한옥 레스토랑에서 점심", time: "Day1 12:30" },
      { name: "용문산 산림욕장", desc: "은행나무 숲길 트레킹", time: "Day1 14:30" },
      { name: "양평 펫 글램핑", desc: "계곡 옆 글램핑에서 바베큐", time: "Day1 17:00" },
      { name: "세미원", desc: "수생식물원에서 아침 산책", time: "Day2 09:00" },
      { name: "양평 카페거리", desc: "카페에서 여유로운 마무리", time: "Day2 11:00" },
    ],
  },
  {
    id: "gyeongnam-day",
    region: "경남",
    title: "통영 바다 당일치기",
    type: "day",
    typeLabel: "당일치기",
    desc: "통영의 아름다운 항구와 해안을 즐기는 코스",
    spots: [
      { name: "동피랑 벽화마을", desc: "알록달록한 벽화 골목 산책", time: "10:00" },
      { name: "통영 중앙시장", desc: "꿀빵과 해산물 맛보기", time: "12:00" },
      { name: "달아공원", desc: "통영 최고의 석양 포인트", time: "15:00" },
      { name: "통영 펫 카페", desc: "항구 뷰 카페에서 마무리", time: "17:00" },
    ],
  },
  {
    id: "jeonnam-day",
    region: "전남",
    title: "여수 밤바다 당일치기",
    type: "day",
    typeLabel: "당일치기",
    desc: "여수의 해상케이블카와 해안 산책을 즐기는 코스",
    spots: [
      { name: "오동도", desc: "반려견과 섬 산책", time: "10:00" },
      { name: "여수 낭만포차 거리", desc: "해산물 맛집에서 점심", time: "12:30" },
      { name: "돌산대교 공원", desc: "바다 뷰 공원에서 산책", time: "15:00" },
      { name: "여수 펫 카페", desc: "밤바다 뷰 카페에서 마무리", time: "18:00" },
    ],
  },
  {
    id: "chungnam-day",
    region: "충남",
    title: "태안 해안 당일치기",
    type: "day",
    typeLabel: "당일치기",
    desc: "태안 해안국립공원의 해변을 반려동물과 걷는 코스",
    spots: [
      { name: "만리포해수욕장", desc: "서해안 대표 해변에서 산책", time: "10:00" },
      { name: "태안 펫 카페", desc: "바다 뷰 카페에서 브런치", time: "12:00" },
      { name: "꽃지해수욕장", desc: "할미할아비 바위와 석양", time: "15:00" },
      { name: "안면도 자연휴양림", desc: "소나무 숲 산책", time: "17:00" },
    ],
  },
  {
    id: "gyeongbuk-day",
    region: "경북",
    title: "경주 역사 산책",
    type: "day",
    typeLabel: "당일치기",
    desc: "경주의 유적지와 자연을 반려동물과 거니는 코스",
    spots: [
      { name: "대릉원(천마총)", desc: "고분군 주변 산책로 걷기", time: "10:00" },
      { name: "경주 황리단길", desc: "트렌디한 카페거리에서 점심", time: "12:00" },
      { name: "보문호수", desc: "호수 둘레길 산책", time: "14:30" },
      { name: "동궁과 월지", desc: "해 질 녘 연못 산책", time: "17:00" },
    ],
  },
];

const REGIONS = [...new Set(COURSES.map((c) => c.region))];

export default function CourseClient() {
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = COURSES.filter((c) => c.region === selectedRegion);

  const handleShare = async (course: Course) => {
    const text = `🐾 ${course.title}\n\n${course.spots.map((s) => `${s.time} ${s.name} - ${s.desc}`).join("\n")}\n\n네발여행에서 더 많은 코스를 확인하세요!`;
    const url = "https://pettrip.vercel.app/course";

    if (navigator.share) {
      try {
        await navigator.share({ title: course.title, text, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopiedId(course.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div>
      {/* 지역 선택 */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 mb-6">
        {REGIONS.map((region) => (
          <button
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap border transition-all duration-200 ${
              selectedRegion === region
                ? "bg-[#FF6B35] text-white border-[#FF6B35] shadow-sm"
                : "bg-white text-[#666] border-[#FFE5D5] hover:border-[#FF6B35] hover:text-[#FF6B35]"
            }`}
          >
            {region}
          </button>
        ))}
      </div>

      {/* 코스 카드 */}
      <div className="space-y-6">
        {filtered.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-[#FFE5D5] rounded-2xl overflow-hidden shadow-sm"
          >
            {/* 코스 헤더 */}
            <div className="p-5 pb-3">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  course.type === "day"
                    ? "bg-[#E0F7F5] text-[#4ECDC4]"
                    : "bg-[#FFF0E8] text-[#FF6B35]"
                }`}>
                  {course.typeLabel}
                </span>
                <span className="text-xs text-[#aaa]">{course.spots.length}곳</span>
              </div>
              <h3 className="text-lg font-bold text-[#2D2D2D]">{course.title}</h3>
              <p className="text-sm text-[#888] mt-1">{course.desc}</p>
            </div>

            {/* 코스 타임라인 */}
            <div className="px-5 pb-4">
              <div className="relative pl-6 border-l-2 border-[#FFE5D5] space-y-4">
                {course.spots.map((spot, i) => (
                  <div key={i} className="relative">
                    {/* 타임라인 점 */}
                    <div className="absolute -left-[calc(1.5rem+5px)] w-2.5 h-2.5 rounded-full bg-[#FF6B35] border-2 border-white" />
                    <div>
                      <span className="text-xs font-semibold text-[#FF6B35]">{spot.time}</span>
                      <p className="text-sm font-bold text-[#2D2D2D] mt-0.5">{spot.name}</p>
                      <p className="text-xs text-[#888] mt-0.5">{spot.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 공유 버튼 */}
            <div className="border-t border-[#FFE5D5] px-5 py-3 flex justify-end">
              <button
                onClick={() => handleShare(course)}
                className="text-sm text-[#888] hover:text-[#FF6B35] transition-colors flex items-center gap-1.5"
              >
                {copiedId === course.id ? "✓ 복사됨!" : "📤 코스 공유하기"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 안내 */}
      <div className="mt-8 bg-[#FFF0E8] rounded-2xl p-5 text-center">
        <p className="text-sm text-[#888]">
          🐾 실제 방문 시 반려동물 동반 가능 여부를 꼭 확인해주세요
        </p>
        <Link
          href="/search"
          className="inline-block mt-3 text-sm text-[#FF6B35] font-medium hover:underline"
        >
          반려동물 동반 여행지 검색하기 →
        </Link>
      </div>
    </div>
  );
}
