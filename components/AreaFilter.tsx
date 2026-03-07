"use client";
import { AREA_CODES } from "@/types/pet";

interface Props {
  selected: string;
  onChange: (code: string) => void;
}

export default function AreaFilter({ selected, onChange }: Props) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
      <button
        onClick={() => onChange("")}
        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all duration-200 ${
          selected === ""
            ? "bg-[#4ECDC4] text-white border-[#4ECDC4] shadow-sm"
            : "bg-white text-[#666] border-[#E0F7F5] hover:border-[#4ECDC4] hover:text-[#4ECDC4]"
        }`}
      >
        전국
      </button>
      {AREA_CODES.map((area) => (
        <button
          key={area.code}
          onClick={() => onChange(area.code)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border transition-all duration-200 ${
            selected === area.code
              ? "bg-[#4ECDC4] text-white border-[#4ECDC4] shadow-sm"
              : "bg-white text-[#666] border-[#E0F7F5] hover:border-[#4ECDC4] hover:text-[#4ECDC4]"
          }`}
        >
          {area.name}
        </button>
      ))}
    </div>
  );
}
