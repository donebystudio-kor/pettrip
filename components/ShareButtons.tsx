"use client";

import { useState, useEffect } from "react";

interface Props {
  title: string;
  description: string;
  imageUrl?: string;
  contentId: string;
}

declare global {
  interface Window {
    Kakao?: {
      isInitialized: () => boolean;
      init: (key: string) => void;
      Share: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
    };
  }
}

const KAKAO_JS_KEY = "4862de3f11b4fc081e99138e41e3cba9";

export default function ShareButtons({ title, description, imageUrl, contentId }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (document.getElementById("kakao-sdk")) return;

    const script = document.createElement("script");
    script.id = "kakao-sdk";
    script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
      }
    };
    document.head.appendChild(script);
  }, []);

  const url = `https://pettrip.vercel.app/${contentId}`;

  const handleKakaoShare = () => {
    if (!window.Kakao?.Share) return;
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `우리 강아지랑 ${title} 가볼까? 🐾`,
        description: description.slice(0, 100),
        imageUrl: imageUrl || "https://pettrip.vercel.app/favicon.ico",
        link: { mobileWebUrl: url, webUrl: url },
      },
      buttons: [
        { title: "자세히 보기", link: { mobileWebUrl: url, webUrl: url } },
      ],
    });
  };

  const handleNativeShare = async () => {
    const text = `우리 강아지랑 ${title} 가볼까? 🐾\n${description.slice(0, 80)}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${title} | 펫트립`, text, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(`${text}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={handleKakaoShare}
        className="flex-1 flex items-center justify-center gap-2 bg-[#FEE500] text-[#3A1D1D] font-semibold py-3 rounded-2xl text-sm hover:opacity-90 transition-opacity shadow-sm"
      >
        💬 카카오톡 공유
      </button>
      <button
        onClick={handleNativeShare}
        className="flex-1 flex items-center justify-center gap-2 bg-white border border-[#FFE5D5] text-[#666] font-semibold py-3 rounded-2xl text-sm hover:border-[#FF6B35] hover:text-[#FF6B35] transition-all shadow-sm"
      >
        {copied ? "✓ 복사됨!" : "📤 공유하기"}
      </button>
    </div>
  );
}
