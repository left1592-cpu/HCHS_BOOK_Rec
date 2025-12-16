import React, { useState } from 'react';
import { BookOpen, GraduationCap } from 'lucide-react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

// Expanded Major Categories
const MAJOR_CATEGORIES: Record<string, string[]> = {
  "인문": ["국어국문", "철학", "역사", "심리", "문헌정보", "문화", "종교"],
  "사회": ["경영", "경제", "정치", "사회", "언론", "법학", "행정", "지리"],
  "교육": ["초등교육", "국어교육", "영어교육", "수학교육", "교육학", "특수교육"],
  "자연": ["수학", "물리", "화학", "생명과학", "지구과학", "천문", "환경"],
  "공학": ["컴퓨터", "소프트웨어", "기계", "전자", "화공", "신소재", "건축", "토목"],
  "의약": ["의예", "약학", "간호", "보건", "재활"],
  "예체능": ["디자인", "미술", "음악", "체육", "스포츠", "연극", "영화"],
  "융합": ["인공지능", "빅데이터", "뇌과학", "자율전공", "기술경영"]
};

// New Subject Categories
const SUBJECT_CATEGORIES: Record<string, string[]> = {
  "국어": ["국어", "문학", "독서", "화법과 작문", "언어와 매체"],
  "수학": ["수학", "미적분", "확률과 통계", "기하"],
  "영어": ["영어", "영어 회화", "영어 독해"],
  "사회": ["통합사회", "한국사", "윤리", "지리", "역사", "경제", "정치와 법", "사회문화"],
  "과학": ["통합과학", "물리", "화학", "생명과학", "지구과학", "실험"],
  "생활": ["정보", "기술", "가정", "보건", "철학", "심리", "교육"]
};

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading }) => {
  const [categoryType, setCategoryType] = useState<'major' | 'subject'>('major');
  
  // Category selection state
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);

  const handleCategorySelect = (subItem: string) => {
    // Send a simple string combining main and sub category for best keyword matching
    // e.g., "공학 컴퓨터" or "과학 물리"
    const searchQuery = `${selectedMainCategory} ${subItem}`;
    onSearch(searchQuery);
  };

  const currentCategories = categoryType === 'major' ? MAJOR_CATEGORIES : SUBJECT_CATEGORIES;

  return (
    <div className="w-full max-w-4xl mx-auto my-8 sm:my-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">
          함창고 독서 활동 지원
        </h1>
        <p className="text-slate-600 text-lg">
          진로와 관련된 책을 읽고 탐구 보고서를 작성해보세요.<br className="hidden sm:block" />
          학생부 종합 전형과 세특 작성을 위한 필독서를 찾아드립니다.
        </p>
      </div>

      {/* Category Selection Mode */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-fade-in-up">
        {/* Sub Tabs: Major vs Subject */}
        {!selectedMainCategory && (
          <div className="flex justify-center mb-6 border-b border-slate-100 pb-2">
              <div className="flex gap-4">
                <button
                  onClick={() => setCategoryType('major')}
                  className={`pb-2 text-sm font-semibold transition-colors relative ${
                    categoryType === 'major' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4" />
                    학과/계열별 찾기
                  </div>
                  {categoryType === 'major' && (
                    <div className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-indigo-600 rounded-full"></div>
                  )}
                </button>
                <button
                  onClick={() => setCategoryType('subject')}
                  className={`pb-2 text-sm font-semibold transition-colors relative ${
                    categoryType === 'subject' ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    교과목별 찾기
                  </div>
                  {categoryType === 'subject' && (
                    <div className="absolute bottom-[-9px] left-0 right-0 h-0.5 bg-indigo-600 rounded-full"></div>
                  )}
                </button>
              </div>
          </div>
        )}

        {!selectedMainCategory ? (
          <div className="space-y-4">
            <p className="text-center text-slate-500 font-medium mb-4">
              {categoryType === 'major' ? '희망하는 진로 계열을 선택해주세요' : '탐구하고 싶은 교과목 군을 선택해주세요'}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {Object.keys(currentCategories).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedMainCategory(cat)}
                  className="p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-700 transition-all text-slate-700 font-semibold flex flex-col items-center justify-center gap-2 h-24"
                >
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded">
                  {categoryType === 'major' ? '계열' : '교과군'}
                </span>
                <span className="text-xl font-bold text-slate-800">{selectedMainCategory}</span>
              </div>
              <button 
                onClick={() => setSelectedMainCategory(null)}
                className="text-sm text-slate-400 hover:text-indigo-600 underline"
              >
                뒤로가기
              </button>
            </div>
            
            <div>
              <p className="text-sm text-slate-500 mb-4 font-medium">
                {categoryType === 'major' ? '세부 학과나 관심 분야를 선택하세요' : '구체적인 교과목을 선택하세요'}
              </p>
              <div className="flex flex-wrap gap-2">
                {currentCategories[selectedMainCategory].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => handleCategorySelect(sub)}
                    disabled={isLoading}
                    className="px-4 py-2.5 bg-white border-2 border-slate-200 hover:border-indigo-500 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg text-slate-600 transition-all font-medium disabled:opacity-50 text-sm sm:text-base"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {isLoading && (
              <div className="mt-8 text-center text-indigo-600 flex items-center justify-center gap-2 p-4 bg-indigo-50 rounded-xl animate-pulse">
                <span className="w-4 h-4 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin"></span>
                <span>데이터베이스에서 {selectedMainCategory} 관련 도서를 찾고 있습니다...</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchInput;