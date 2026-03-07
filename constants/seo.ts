// 지역 슬러그 매핑
export const REGION_SLUGS: {
  slug: string;
  code: string;
  name: string;
  nameEn: string;
  desc: string;
}[] = [
  { slug: "seoul", code: "1", name: "서울", nameEn: "Seoul", desc: "서울은 다양한 펫 카페, 반려동물 동반 레스토랑, 도심 속 공원이 풍부한 도시입니다. 한강 공원, 서울숲 등 반려견과 산책하기 좋은 장소가 많으며, 성수동과 이태원을 중심으로 펫 프렌들리 매장이 빠르게 늘어나고 있습니다." },
  { slug: "incheon", code: "2", name: "인천", nameEn: "Incheon", desc: "인천은 영종도, 강화도 등 섬 지역과 해안가를 중심으로 반려동물과 함께 즐길 수 있는 여행지가 다양합니다. 을왕리 해수욕장 인근 펫 동반 숙소와 카페가 인기 있으며, 개항장 거리에서의 산책도 추천합니다." },
  { slug: "daejeon", code: "3", name: "대전", nameEn: "Daejeon", desc: "대전은 계족산, 대청호 등 자연 속에서 반려동물과 여유로운 시간을 보내기 좋은 도시입니다. 유성구를 중심으로 펫 동반 숙소와 온천 시설이 있으며, 한밭수목원 인근에도 동반 가능한 카페가 있습니다." },
  { slug: "daegu", code: "4", name: "대구", nameEn: "Daegu", desc: "대구는 팔공산, 앞산 등 근교 산과 수성못 주변으로 반려동물 산책 코스가 잘 갖춰져 있습니다. 동성로와 수성구를 중심으로 펫 동반 카페와 레스토랑이 늘어나고 있습니다." },
  { slug: "gwangju", code: "5", name: "광주", nameEn: "Gwangju", desc: "광주는 무등산 국립공원 인근과 호수 공원 등에서 반려동물과 자연을 만끽할 수 있습니다. 충장로와 동명동을 중심으로 펫 프렌들리 카페가 모여 있어 도심 나들이에도 좋습니다." },
  { slug: "busan", code: "6", name: "부산", nameEn: "Busan", desc: "부산은 해운대, 광안리 등 아름다운 해변과 함께 반려동물 동반 여행의 성지로 불립니다. 기장군과 해운대구를 중심으로 펫 동반 숙소, 카페, 해변 산책로가 잘 갖춰져 있습니다." },
  { slug: "ulsan", code: "7", name: "울산", nameEn: "Ulsan", desc: "울산은 간절곶, 대왕암공원 등 해안 절경과 태화강 국가정원에서 반려동물과 특별한 시간을 보낼 수 있습니다. 자연 속 펫 동반 펜션과 글램핑도 인기입니다." },
  { slug: "sejong", code: "8", name: "세종", nameEn: "Sejong", desc: "세종은 세종호수공원, 금강수변공원 등 넓은 녹지 공간에서 반려동물과 여유롭게 산책할 수 있는 도시입니다. 신도시답게 펫 프렌들리 인프라가 잘 갖춰져 있습니다." },
  { slug: "gyeonggi", code: "31", name: "경기", nameEn: "Gyeonggi", desc: "경기도는 가평, 양평, 포천 등 서울 근교 자연 여행지가 풍부합니다. 반려동물 동반 펜션, 글램핑, 카페가 가장 많은 지역 중 하나로, 당일치기 여행에 최적입니다." },
  { slug: "gangwon", code: "32", name: "강원", nameEn: "Gangwon", desc: "강원도는 속초, 양양, 강릉 해변과 평창, 홍천의 산악 지역에서 반려동물과 힐링 여행을 즐길 수 있습니다. 펫 동반 펜션과 글램핑이 특히 많으며, 계곡과 해변을 함께 즐길 수 있습니다." },
  { slug: "chungbuk", code: "33", name: "충북", nameEn: "Chungbuk", desc: "충청북도는 충주호, 수안보 온천, 단양 등에서 반려동물과 자연 속 힐링을 즐길 수 있습니다. 산과 호수가 어우러진 풍경 속에서 펫 동반 펜션과 캠핑장이 인기입니다." },
  { slug: "chungnam", code: "34", name: "충남", nameEn: "Chungnam", desc: "충청남도는 태안 해안, 보령 머드축제, 공주와 부여의 역사 도시까지 다양한 여행지가 있습니다. 서해안을 따라 반려동물 동반 숙소와 해변이 매력적입니다." },
  { slug: "gyeongbuk", code: "35", name: "경북", nameEn: "Gyeongbuk", desc: "경상북도는 경주, 안동, 영덕 등 역사와 자연이 조화로운 여행지입니다. 경주 보문단지와 안동 하회마을 인근에 반려동물 동반 숙소가 있으며, 동해안 해변 여행도 추천합니다." },
  { slug: "gyeongnam", code: "36", name: "경남", nameEn: "Gyeongnam", desc: "경상남도는 통영, 거제, 남해 등 남해안 섬 여행지가 인기입니다. 한려해상 국립공원 일대의 펫 동반 펜션과 카페에서 바다 뷰를 즐기며 반려동물과 특별한 추억을 만들 수 있습니다." },
  { slug: "jeonbuk", code: "37", name: "전북", nameEn: "Jeonbuk", desc: "전라북도는 전주 한옥마을, 무주 덕유산, 군산 근대문화거리 등 다양한 볼거리가 있습니다. 전주를 중심으로 펫 동반 카페와 한옥 숙소가 늘어나고 있으며, 자연 속 힐링 여행지도 풍부합니다." },
  { slug: "jeonnam", code: "38", name: "전남", nameEn: "Jeonnam", desc: "전라남도는 여수, 순천, 담양 등 아름다운 자연 경관이 매력적인 지역입니다. 순천만 습지, 담양 죽녹원 인근에 펫 동반 숙소가 있으며, 여수 밤바다와 함께하는 여행이 인기입니다." },
  { slug: "jeju", code: "39", name: "제주", nameEn: "Jeju", desc: "제주도는 반려동물 동반 여행의 천국입니다. 해변, 오름, 숲길 등 자연 속에서 반려동물과 함께 다양한 활동을 즐길 수 있으며, 펫 전용 호텔, 카페, 식당 등 인프라가 전국에서 가장 잘 갖춰져 있습니다." },
];

// 카테고리 슬러그 매핑
export const CATEGORY_SLUGS: {
  slug: string;
  typeId: string;
  name: string;
  emoji: string;
  desc: string;
}[] = [
  { slug: "tourist", typeId: "12", name: "관광지", emoji: "🏕️", desc: "반려동물과 함께 방문할 수 있는 전국의 관광지를 소개합니다. 자연 공원, 테마파크, 유적지 등 반려동물 동반이 가능한 관광 명소에서 특별한 추억을 만들어보세요." },
  { slug: "culture", typeId: "14", name: "문화시설", emoji: "🎭", desc: "반려동물과 함께 즐길 수 있는 문화시설을 찾아보세요. 미술관, 박물관, 전시관 등 문화 공간에서 반려동물과 함께 예술과 문화를 경험할 수 있습니다." },
  { slug: "festival", typeId: "15", name: "축제·행사", emoji: "🎪", desc: "반려동물과 함께 참여할 수 있는 전국의 축제와 행사 정보입니다. 펫 페스티벌, 지역 축제 등 반려동물과 함께 즐거운 시간을 보낼 수 있는 행사를 찾아보세요." },
  { slug: "sports", typeId: "28", name: "레포츠", emoji: "🏃", desc: "반려동물과 함께 즐길 수 있는 레포츠 시설을 소개합니다. 캠핑장, 산책로, 수상 레포츠 등 반려동물과 활동적인 시간을 보낼 수 있는 장소를 찾아보세요." },
  { slug: "accommodation", typeId: "32", name: "숙박", emoji: "🏨", desc: "반려동물과 함께 묵을 수 있는 숙소를 찾아보세요. 펫 동반 호텔, 펜션, 글램핑 등 반려동물 동반 숙박 시설의 위치, 가격, 동반 조건을 한눈에 확인할 수 있습니다." },
  { slug: "shopping", typeId: "38", name: "쇼핑", emoji: "🛍️", desc: "반려동물과 함께 방문할 수 있는 쇼핑 시설을 소개합니다. 펫 용품 매장, 반려동물 동반 가능한 쇼핑몰 등에서 함께 쇼핑을 즐겨보세요." },
  { slug: "restaurant", typeId: "39", name: "음식점", emoji: "🍽️", desc: "반려동물과 함께 식사할 수 있는 음식점을 찾아보세요. 펫 동반 카페, 레스토랑, 브런치 맛집 등 반려동물 동반 가능한 맛집 정보를 제공합니다." },
];

// 주요 지역+카테고리 조합 (SEO용)
export const COMBO_PAGES: { regionSlug: string; categorySlug: string }[] = [
  // 서울
  { regionSlug: "seoul", categorySlug: "accommodation" },
  { regionSlug: "seoul", categorySlug: "restaurant" },
  { regionSlug: "seoul", categorySlug: "tourist" },
  // 부산
  { regionSlug: "busan", categorySlug: "accommodation" },
  { regionSlug: "busan", categorySlug: "restaurant" },
  { regionSlug: "busan", categorySlug: "tourist" },
  // 제주
  { regionSlug: "jeju", categorySlug: "accommodation" },
  { regionSlug: "jeju", categorySlug: "restaurant" },
  { regionSlug: "jeju", categorySlug: "tourist" },
  // 경기
  { regionSlug: "gyeonggi", categorySlug: "accommodation" },
  { regionSlug: "gyeonggi", categorySlug: "restaurant" },
  // 강원
  { regionSlug: "gangwon", categorySlug: "accommodation" },
  { regionSlug: "gangwon", categorySlug: "tourist" },
  // 경남
  { regionSlug: "gyeongnam", categorySlug: "accommodation" },
  { regionSlug: "gyeongnam", categorySlug: "tourist" },
  // 전남
  { regionSlug: "jeonnam", categorySlug: "accommodation" },
  // 충남
  { regionSlug: "chungnam", categorySlug: "accommodation" },
  // 경북
  { regionSlug: "gyeongbuk", categorySlug: "accommodation" },
  { regionSlug: "gyeongbuk", categorySlug: "tourist" },
  // 인천
  { regionSlug: "incheon", categorySlug: "restaurant" },
];
