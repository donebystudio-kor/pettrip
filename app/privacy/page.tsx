import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "네발여행 개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-8">
      <nav className="text-xs text-[#888] mb-4 flex items-center gap-1.5">
        <Link href="/" className="hover:text-[#FF6B35] transition-colors">홈</Link>
        <span>/</span>
        <span className="text-[#2D2D2D] font-medium">개인정보처리방침</span>
      </nav>

      <h1 className="text-2xl font-bold text-[#2D2D2D] mb-8">개인정보처리방침</h1>

      <div className="prose prose-sm max-w-none text-[#555] space-y-6">
        <section>
          <h2 className="text-lg font-bold text-[#2D2D2D] mb-2">1. 개인정보의 처리 목적</h2>
          <p className="leading-relaxed">
            네발여행(이하 &quot;서비스&quot;)은 반려동물 동반 여행지 정보를 제공하는 웹사이트로,
            별도의 회원가입 없이 이용할 수 있습니다. 서비스는 다음의 목적을 위하여 최소한의 정보를 처리합니다.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>위치 기반 주변 여행지 검색 (GPS 좌표, 사용자 동의 시에만)</li>
            <li>즐겨찾기 기능 (브라우저 로컬 저장소에만 저장)</li>
            <li>서비스 이용 통계 및 개선</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#2D2D2D] mb-2">2. 처리하는 개인정보 항목</h2>
          <p className="leading-relaxed">
            서비스는 회원가입을 요구하지 않으며, 서버에 개인정보를 저장하지 않습니다.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li><strong>위치 정보:</strong> &quot;내 주변&quot; 기능 이용 시 브라우저의 위치 권한 동의 후 일시적으로 사용되며, 서버에 저장되지 않습니다.</li>
            <li><strong>즐겨찾기 데이터:</strong> 브라우저의 localStorage에만 저장되며, 서버로 전송되지 않습니다.</li>
            <li><strong>자동 수집 정보:</strong> 서비스 이용 시 IP 주소, 브라우저 종류, 접속 시간 등이 자동으로 생성/수집될 수 있습니다.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#2D2D2D] mb-2">3. 개인정보의 보유 및 이용 기간</h2>
          <p className="leading-relaxed">
            서비스는 서버에 개인정보를 저장하지 않습니다. 즐겨찾기 등 사용자 데이터는
            브라우저의 로컬 저장소(localStorage)에만 보관되며, 브라우저 데이터 삭제 시 함께 삭제됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#2D2D2D] mb-2">4. 개인정보의 제3자 제공</h2>
          <p className="leading-relaxed">
            서비스는 이용자의 개인정보를 제3자에게 제공하지 않습니다.
            다만, 아래의 경우는 예외로 합니다.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#2D2D2D] mb-2">5. 쿠키 및 분석 도구</h2>
          <p className="leading-relaxed">
            서비스는 이용 통계 분석을 위해 Google Analytics 등의 분석 도구를 사용할 수 있습니다.
            이러한 도구는 쿠키를 사용하여 익명화된 이용 정보를 수집하며,
            브라우저 설정에서 쿠키를 비활성화할 수 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#2D2D2D] mb-2">6. 이용자의 권리</h2>
          <p className="leading-relaxed">
            이용자는 언제든지 브라우저의 로컬 저장소를 삭제하여 즐겨찾기 등의 데이터를 삭제할 수 있습니다.
            위치 정보 수집을 원하지 않는 경우, 브라우저 설정에서 위치 권한을 거부하면 됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#2D2D2D] mb-2">7. 데이터 출처</h2>
          <p className="leading-relaxed">
            서비스에서 제공하는 반려동물 동반 여행지 정보는
            한국관광공사의 반려동물 동반여행 공공데이터를 활용하고 있습니다.
            데이터의 정확성은 보장되지 않으며, 실제 방문 시 해당 업체에 직접 확인하시기 바랍니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#2D2D2D] mb-2">8. 개인정보 보호책임자</h2>
          <ul className="list-none space-y-1 text-sm">
            <li>서비스명: 네발여행</li>
            <li>이메일: donebystudio@gmail.com</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-[#2D2D2D] mb-2">9. 개인정보처리방침의 변경</h2>
          <p className="leading-relaxed">
            이 개인정보처리방침은 2026년 3월 7일부터 적용됩니다.
            변경 사항이 있을 경우 서비스 내 공지를 통해 안내드리겠습니다.
          </p>
        </section>
      </div>
    </div>
  );
}
