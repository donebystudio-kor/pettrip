"use client";

const CATEGORIES = [
  { id: "", label: "전체", emoji: "🐾" },
  { id: "12", label: "관광지", emoji: "🏕️" },
  { id: "32", label: "숙박", emoji: "🏨" },
  { id: "39", label: "음식점", emoji: "🍽️" },
  { id: "28", label: "레포츠", emoji: "🏃" },
  { id: "38", label: "쇼핑", emoji: "🛍️" },
  { id: "14", label: "문화시설", emoji: "🎭" },
  { id: "15", label: "축제·행사", emoji: "🎪" },
];

interface Props {
  selected: string;
  onChange: (id: string) => void;
}

export default function CategoryFilter({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id || "all"}
          onClick={() => onChange(cat.id)}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all duration-200 ${
            selected === cat.id
              ? "bg-[#FF6B35] text-white border-[#FF6B35] shadow-sm"
              : "bg-white text-[#666] border-[#FFE5D5] hover:border-[#FF6B35] hover:text-[#FF6B35]"
          }`}
        >
          <span>{cat.emoji}</span>
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
