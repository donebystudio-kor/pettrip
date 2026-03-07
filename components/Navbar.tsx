"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MOBILE_TABS = [
  { href: "/", label: "홈", icon: "🏠" },
  { href: "/search", label: "검색", icon: "🔍" },
  { href: "/nearby", label: "주변", icon: "📍" },
  { href: "/favorites", label: "즐겨찾기", icon: "❤️" },
];

const DESKTOP_LINKS = [
  { href: "/", label: "홈" },
  { href: "/search", label: "검색" },
  { href: "/nearby", label: "내 주변" },
  { href: "/course", label: "코스 추천" },
  { href: "/favorites", label: "즐겨찾기" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <>
      {/* 데스크톱 상단 네비 */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 hidden md:block">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-1.5 shrink-0">
            <span className="text-2xl">🐾</span>
            <span className="text-xl font-bold text-[#FF6B35]">네발여행</span>
          </Link>

          <nav className="flex items-center gap-1 ml-auto">
            {DESKTOP_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  pathname === href
                    ? "bg-[#FF6B35] text-white"
                    : "text-[#666] hover:bg-[#FFF0E8] hover:text-[#FF6B35]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* 모바일 상단 로고 */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 md:hidden">
        <div className="px-4 py-3 flex items-center justify-center">
          <Link href="/" className="flex items-center gap-1.5">
            <span className="text-2xl">🐾</span>
            <span className="text-xl font-bold text-[#FF6B35]">네발여행</span>
          </Link>
        </div>
      </header>

      {/* 모바일 하단 탭 바 */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#FFE5D5] safe-bottom">
        <div className="flex">
          {MOBILE_TABS.map(({ href, label, icon }) => {
            const active = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex-1 flex flex-col items-center py-2 pt-2.5 text-xs gap-0.5 transition-colors ${
                  active ? "text-[#FF6B35] font-semibold" : "text-[#999]"
                }`}
              >
                <span className="text-xl">{icon}</span>
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
