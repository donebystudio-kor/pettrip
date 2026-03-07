import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#FFE5D5] py-10 mt-12 pb-24 md:pb-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* 로고 + 설명 */}
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="text-xl">🐾</span>
              <span className="font-bold text-[#FF6B35]">펫트립</span>
            </div>
            <p className="text-sm text-[#aaa] max-w-xs">
              반려동물과 함께하는 특별한 여행을 만들어가요
            </p>
          </div>

          {/* 바로가기 */}
          <div className="flex gap-8 text-sm">
            <div className="space-y-2">
              <p className="font-semibold text-[#555]">바로가기</p>
              <Link href="/search" className="block text-[#888] hover:text-[#FF6B35] transition-colors">검색</Link>
              <Link href="/nearby" className="block text-[#888] hover:text-[#FF6B35] transition-colors">내 주변</Link>
              <Link href="/favorites" className="block text-[#888] hover:text-[#FF6B35] transition-colors">즐겨찾기</Link>
            </div>
            <div className="space-y-2">
              <p className="font-semibold text-[#555]">정보</p>
              <a
                href="https://www.visitkorea.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[#888] hover:text-[#FF6B35] transition-colors"
              >
                한국관광공사
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-[#FFE5D5] text-center text-xs text-[#ccc]">
          © 2026 펫트립. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
