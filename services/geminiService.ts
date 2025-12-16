import { Book } from "../types";

// ============================================================================
// LOCAL DATABASE (MOCK DATA - High Quality Curated)
// These books have manually written 'academicRelevance' which is very valuable.
// ============================================================================

const MOCK_BOOKS: (Book & { keywords: string[] })[] = [
  // --- 인문 (Humanities) ---
  {
    title: "역사란 무엇인가",
    author: "E.H. Carr",
    description: "역사는 과거와 현재의 끊임없는 대화라는 명제로 유명한 고전. 역사학의 본질과 역사가의 역할에 대해 깊이 있게 탐구한다.",
    academicRelevance: "역사학 및 인문학 전반의 기초가 되는 텍스트로, 사실(fact)과 해석(interpretation)의 관계를 비판적으로 사고하는 능력을 보여줄 수 있음.",
    category: "역사/철학",
    keywords: ["역사", "사학", "철학", "인문", "국어국문", "한국사", "세계사"]
  },
  {
    title: "사피엔스",
    author: "유발 하라리",
    description: "인류가 어떻게 지구의 지배자가 되었는지, 인지 혁명, 농업 혁명, 과학 혁명을 통해 풀어낸 인류 문명사.",
    academicRelevance: "역사, 인류학, 사회학, 과학을 넘나드는 융합적 사고력을 드러내기에 최적. 인류의 미래와 기술 발전에 대한 통찰을 탐구 보고서 주제로 삼기 좋음.",
    category: "인류학/역사",
    keywords: ["역사", "사회", "인류학", "융합", "과학", "빅데이터", "통합사회"]
  },
  {
    title: "총, 균, 쇠",
    author: "재레드 다이아몬드",
    description: "문명의 불평등 기원을 환경적 요인에서 찾은 인류학의 명저. 지리, 생물, 역사를 통합적으로 다룸.",
    academicRelevance: "지리학, 역사학, 사회학, 생물학. 환경 결정론에 대한 비판적 독해나 문명 발전의 조건을 탐구하는 보고서에 적합.",
    category: "역사/지리",
    keywords: ["역사", "지리", "사회", "생명과학", "인류학", "세계사"]
  },
  {
    title: "미움받을 용기",
    author: "기시미 이치로",
    description: "아들러 심리학을 대화체로 풀어낸 베스트셀러. 트라우마를 부정하고 목적론적 삶을 강조.",
    academicRelevance: "심리학과, 교육학과, 상담. 프로이트 원인론과 아들러 목적론을 비교하거나, 인간 관계의 고민을 심리학적으로 해결하는 방안 탐구.",
    category: "철학/심리",
    keywords: ["심리", "철학", "교육", "상담", "인문", "윤리"]
  },
  {
    title: "클루지",
    author: "개리 마커스",
    description: "인간의 뇌와 마음이 진화의 찌꺼기들로 이루어진 불완전한 도구임을 밝히는 심리학/뇌과학 서적.",
    academicRelevance: "심리학, 뇌과학, 인지과학. 인간의 비합리적인 행동 원인을 진화론적 관점에서 분석.",
    category: "심리/과학",
    keywords: ["심리", "뇌과학", "생명과학", "인문", "과학"]
  },
  
  // --- 사회 (Social Sciences) ---
  {
    title: "죽은 경제학자의 살아있는 아이디어",
    author: "토드 부크홀츠",
    description: "애덤 스미스부터 케인스까지 위대한 경제학자들의 사상을 현대적 관점에서 쉽고 재미있게 풀어낸 경제 입문서.",
    academicRelevance: "경영/경제학과 진학의 정석. 고전 경제학 이론이 현대 경제 위기나 정책에 어떻게 적용되는지 비교 분석하는 세특 활동 추천.",
    category: "경제/경영",
    keywords: ["경제", "경영", "사회", "정치", "일반선택", "통합사회"]
  },
  {
    title: "넛지 (Nudge)",
    author: "리처드 탈러",
    description: "똑똑한 선택을 유도하는 선택 설계의 힘. 행동경제학의 핵심 개념을 다루며 정책과 마케팅에 주는 시사점을 논함.",
    academicRelevance: "경영, 경제, 심리학, 행정학. '선택 설계'가 학교나 공공 정책에 어떻게 활용될 수 있는지 제안서를 작성해보는 활동에 활용.",
    category: "경영/심리",
    keywords: ["경영", "경제", "심리", "행정", "마케팅", "사회"]
  },
  {
    title: "정의란 무엇인가",
    author: "마이클 샌델",
    description: "공리주의, 자유지상주의, 칸트, 롤스 등의 철학적 관점을 통해 정의(Justice)가 무엇인지 묻는 현대의 고전.",
    academicRelevance: "법학, 행정학, 정치외교학, 윤리교육과 진학 시 필수. 구체적인 사회 딜레마를 철학적 논리로 분석하는 활동으로 연결 가능.",
    category: "철학/윤리",
    keywords: ["철학", "윤리", "법학", "정치", "사회", "행정", "생활과 윤리"]
  },
  {
    title: "지리의 힘",
    author: "팀 마샬",
    description: "지리적 조건이 국제 정치와 경제, 군사에 미치는 결정적 영향을 10개의 지도로 풀어냄.",
    academicRelevance: "지리학, 정치외교, 무역. 지정학적 위치가 국가의 운명에 미치는 영향을 최근 국제 분쟁 사례와 연결하여 분석.",
    category: "지리/정치",
    keywords: ["지리", "정치", "사회", "세계지리", "역사"]
  },

  // --- 자연 (Natural Sciences) ---
  {
    title: "코스모스",
    author: "칼 세이건",
    description: "우주의 탄생부터 생명의 기원, 인류의 미래까지 광대한 우주를 서사적으로 풀어낸 과학 교양의 바이블.",
    academicRelevance: "물리학, 천문학, 지구과학. 우주에 대한 호기심뿐만 아니라 과학적 탐구의 철학적 의미를 성찰하는 독후감 작성에 탁월.",
    category: "천문/물리",
    keywords: ["물리", "지구과학", "천문", "우주", "자연", "과학"]
  },
  {
    title: "이기적 유전자",
    author: "리처드 도킨스",
    description: "생물체의 개체가 아닌 유전자가 진화의 주체라는 파격적인 주장을 담은 진화생물학의 명저.",
    academicRelevance: "생명과학과 필독서. '유전자 중심의 진화론'에 대한 찬반 논쟁을 정리하거나, 사회 생물학적 관점을 비판하는 탐구 활동.",
    category: "생명과학",
    keywords: ["생명", "생물", "유전", "자연", "과학", "의약", "진화"]
  },
  {
    title: "침묵의 봄",
    author: "레이첼 카슨",
    description: "살충제 남용의 위험성을 고발하여 현대 환경 운동의 시초가 된 책.",
    academicRelevance: "환경공학, 생태학, 보건학. 과학 기술의 발전이 환경에 미치는 양면성을 분석하고 지속 가능한 발전 방안을 모색.",
    category: "환경/생물",
    keywords: ["환경", "생명", "화학", "과학", "지구과학", "사회"]
  },
  {
    title: "부분과 전체",
    author: "베르너 하이젠베르크",
    description: "양자역학의 창시자가 들려주는 물리학과 철학의 대화. 과학자가 가져야 할 태도와 윤리를 다룸.",
    academicRelevance: "물리학, 철학. 양자역학의 불확정성 원리가 철학적 인식론에 미친 영향을 주제로 심화 보고서 작성.",
    category: "물리/철학",
    keywords: ["물리", "과학", "철학", "자연", "양자역학"]
  },

  // --- 공학 (Engineering) ---
  {
    title: "해커와 화가",
    author: "폴 그레이엄",
    description: "컴퓨터 프로그래밍은 예술 창작과 같다고 주장하며, 해커(개발자) 문화와 스타트업 정신을 다룬 에세이.",
    academicRelevance: "컴퓨터공학, SW. 코딩 기술을 넘어 개발자가 가져야 할 창의적 사고방식과 혁신에 대한 견해를 서술하기 좋음.",
    category: "컴퓨터/SW",
    keywords: ["컴퓨터", "SW", "소프트웨어", "공학", "정보", "AI", "창업"]
  },
  {
    title: "엔트로피",
    author: "제레미 리프킨",
    description: "열역학 제2법칙(엔트로피)을 통해 현대 산업 문명의 한계를 비판하고 새로운 패러다임을 제시.",
    academicRelevance: "기계공학, 에너지공학, 환경공학. 열역학 법칙을 사회 현상에 적용해본 융합적 시도를 보여주는 독서 기록.",
    category: "공학/과학",
    keywords: ["기계", "물리", "에너지", "환경", "공학", "화공"]
  },
  {
    title: "인공지능의 미래 (Superintelligence)",
    author: "닉 보스트롬",
    description: "초지능 AI의 등장 가능성과 그로 인한 인류의 존망 위협을 철학적, 공학적으로 분석.",
    academicRelevance: "AI학과, 컴퓨터공학, 로봇공학. AI 윤리, 통제 문제(Control Problem)에 대한 깊이 있는 탐구 보고서 주제.",
    category: "컴퓨터/AI",
    keywords: ["인공지능", "AI", "컴퓨터", "SW", "로봇", "공학", "정보", "융합"]
  },

  // --- 의약 (Medicine) ---
  {
    title: "아내를 모자로 착각한 남자",
    author: "올리버 색스",
    description: "신경학 전문의가 만난 기이한 뇌 질환 환자들의 임상 사례를 따뜻한 시선으로 기록한 에세이.",
    academicRelevance: "의예과, 뇌과학, 심리학. 질병을 넘어 '환자라는 인간'을 이해하려는 의사의 태도와 뇌의 신비를 탐구.",
    category: "의학/뇌과학",
    keywords: ["의학", "의예", "간호", "심리", "뇌과학", "생명", "재활"]
  },
  {
    title: "숨결이 바람 될 때",
    author: "폴 칼라니티",
    description: "서른여섯 젊은 의사가 폐암 말기 판정을 받고 죽음을 마주하며 남긴 마지막 기록.",
    academicRelevance: "의예과, 간호학과. 생명 윤리, 죽음의 의미, 의료인의 소명 의식에 대해 깊이 성찰한 내용을 세특에 담기 좋음.",
    category: "의학/에세이",
    keywords: ["의학", "간호", "윤리", "생명", "보건"]
  },

  // --- 교육 (Education) ---
  {
    title: "에밀",
    author: "장 자크 루소",
    description: "자연주의 교육 사상을 담은 교육학의 고전. 어린이는 작은 어른이 아니며 발달 단계에 맞는 교육이 필요함을 역설.",
    academicRelevance: "교육학과, 초등교육과. 현대 교육 과정과 루소의 자연주의 교육관을 비교하는 비평문 작성.",
    category: "교육철학",
    keywords: ["교육", "초등", "유아", "사범", "철학", "심리"]
  },
  {
    title: "평균의 종말",
    author: "토드 로즈",
    description: "평균적인 인간이라는 개념의 허구를 밝히고, 개개인의 잠재력을 살리는 교육과 평가 혁명을 주장.",
    academicRelevance: "교육학, 심리학. '개별화 교육'의 필요성을 뇌과학적, 통계적 근거를 들어 주장하는 탐구 활동.",
    category: "교육/심리",
    keywords: ["교육", "수학", "통계", "심리", "평가", "특수교육"]
  },

  // --- 예체능 ---
  {
    title: "서양미술사",
    author: "E.H. 곰브리치",
    description: "선사 시대부터 현대까지 서양 미술의 흐름을 통사적으로 정리한 미술사의 바이블.",
    academicRelevance: "미술, 디자인, 역사. 예술 양식의 변화가 사회적 배경과 어떻게 연결되는지 분석하는 보고서.",
    category: "예술/역사",
    keywords: ["미술", "디자인", "예술", "역사", "문화"]
  },
  {
    title: "디자인의 디자인",
    author: "하라 켄야",
    description: "무인양품의 디자이너 하라 켄야가 말하는 디자인의 본질과 철학.",
    academicRelevance: "디자인, 미대. 단순한 시각적 아름다움을 넘어 문제 해결 과정으로서의 디자인 사고를 탐구.",
    category: "디자인",
    keywords: ["디자인", "미술", "예술", "경영", "창업"]
  },
  
  // --- 융합 ---
  {
    title: "통섭 (Consilience)",
    author: "에드워드 윌슨",
    description: "자연과학과 인문학의 지식 통합을 주장하는 책. 학문 간의 경계를 넘는 융합적 사고의 중요성 강조.",
    academicRelevance: "자율전공, 융합학부. 서로 다른 학문 분야가 어떻게 연결되어 새로운 가치를 창출하는지 사례 조사.",
    category: "융합/과학",
    keywords: ["융합", "과학", "인문", "사회", "철학", "자율전공"]
  }
];

// ============================================================================
// EXTERNAL API SERVICE (Google Books)
// ============================================================================

/**
 * Fetches books from Google Books API to ensure a vast library of results.
 * Since the API doesn't provide 'academicRelevance', we generate a template-based suggestion.
 */
async function fetchBooksFromAPI(query: string, maxResults: number = 10): Promise<Book[]> {
  try {
    // Improve query relevance for high school students
    // e.g., if query is "Physics", search for "Physics education" or "Physics general"
    const searchQuery = encodeURIComponent(query);
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&langRestrict=ko&maxResults=${maxResults}&orderBy=relevance`
    );
    
    if (!response.ok) return [];

    const data = await response.json();
    if (!data.items) return [];

    return data.items.map((item: any) => {
      const info = item.volumeInfo;
      const description = info.description 
        ? (info.description.length > 150 ? info.description.substring(0, 150) + "..." : info.description)
        : "도서 상세 소개가 제공되지 않았습니다.";
      
      const categories = info.categories ? info.categories.join(', ') : '일반 교양';
      
      // Generate Academic Relevance dynamically based on context
      const generatedRelevance = `[${query}] 분야에 관심 있는 학생에게 추천합니다. 책의 핵심 주제인 '${info.title}' 관련 내용을 교과 학습 목표와 연결하여 심화 탐구 보고서를 작성해보세요. 저자의 관점을 분석하거나 이론을 실제 사례에 적용하는 활동이 생활기록부를 풍성하게 만들어줄 것입니다.`;

      return {
        title: info.title,
        author: info.authors ? info.authors.join(', ') : '저자 미상',
        description: description,
        category: categories,
        academicRelevance: generatedRelevance,
        coverUrl: info.imageLinks?.thumbnail?.replace('http:', 'https:') || undefined
      };
    });

  } catch (error) {
    console.warn("External book fetch failed:", error);
    return [];
  }
}


// ============================================================================
// MAIN SERVICE LOGIC (HYBRID)
// ============================================================================

export const getBookRecommendations = async (userQuery: string, excludeTitles: string[] = []): Promise<Book[]> => {
  const queryParts = userQuery.toLowerCase().split(' ');
  const normalizedExclude = excludeTitles.map(t => t.replace(/\s+/g, "").toLowerCase());

  // 1. Filter Local Mock Data (High Quality)
  const localMatches = MOCK_BOOKS.map(book => {
    // Filter out excludes
    if (normalizedExclude.includes(book.title.replace(/\s+/g, "").toLowerCase())) {
      return { book, score: -1 };
    }

    let score = 0;
    const bookKeywords = book.keywords.map(k => k.toLowerCase());
    const bookTitle = book.title.toLowerCase();
    const bookCategory = book.category.toLowerCase();

    queryParts.forEach(part => {
      if (!part) return;
      if (bookKeywords.some(k => k.includes(part) || part.includes(k))) score += 10; // Strong keyword match
      if (bookCategory.includes(part)) score += 5;
      if (bookTitle.includes(part)) score += 3;
    });
    
    // Add random jitter
    score += Math.random();
    
    return { book, score };
  })
  .filter(item => item.score > 2) // Minimum relevance threshold
  .sort((a, b) => b.score - a.score)
  .map(item => item.book);

  // 2. Fetch from External API (Quantity & Freshness)
  // Only fetch if we need more books or just to mix in variety
  let apiBooks: Book[] = [];
  try {
    // If local results are few, fetch more. Even if many, fetch a few to show variety.
    const fetchCount = 10; 
    apiBooks = await fetchBooksFromAPI(userQuery, fetchCount);
    
    // Filter out duplicates that might be in MOCK_BOOKS or Excluded list
    apiBooks = apiBooks.filter(apiBook => {
      const normTitle = apiBook.title.replace(/\s+/g, "").toLowerCase();
      const isExcluded = normalizedExclude.includes(normTitle);
      const isInLocal = MOCK_BOOKS.some(mb => mb.title.replace(/\s+/g, "").toLowerCase() === normTitle);
      return !isExcluded && !isInLocal;
    });
  } catch (e) {
    console.error("API Fetch Error", e);
  }

  // 3. Combine Results
  // Prioritize local matches, then append API matches
  const combined = [...localMatches, ...apiBooks];
  
  // Return top results (e.g. 8 items per page load)
  // If we have absolutely nothing, returning empty array is handled by UI
  return combined.slice(0, 8);
};