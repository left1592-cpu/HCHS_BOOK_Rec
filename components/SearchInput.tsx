import React, { useState } from 'react';
import { Search, Sparkles, Grid, Type, BookOpen, GraduationCap } from 'lucide-react';

interface SearchInputProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

// Expanded Major Categories
const MAJOR_CATEGORIES: Record<string, string[]> = {
  "인문": ["국어국문", "철학/윤리", "역사/고고학", "심리학", "문헌정보", "문화콘텐츠", "종교학"],
  "사회": ["경영/경제", "정치외교", "사회학/복지", "미디어/언론", "법학/행정", "지리학", "소비자학"],
  "교육": ["초등교육", "국어교육", "영어교육", "수학교육", "사회교육", "과학교육", "특수교육", "교육학"],
  "자연": ["수학/통계", "물리학", "화학", "생명과학", "지구/천문학", "환경과학"],
  "공학": ["컴퓨터/SW", "기계/로봇", "전기/전자", "화공/신소재", "건축/토목", "산업공학", "항공우주"],
  "의약": ["의예과", "치의예과", "한의예과", "약학", "간호학", "보건행정", "재활/물리치료"],
  "예체능": ["디자인", "미술/회화", "음악/작곡", "체육/스포츠", "연극/영화", "패션"],
  "융합": ["인공지능(AI)", "빅데이터", "뇌인지과학", "자율전공", "기술경영"]
};

// New Subject Categories
const SUBJECT_CATEGORIES: Record<string, string[]> = {
  "국어": ["국어 일반", "문학", "독서", "화법과 작문", "언어와 매체"],
  "수학": ["수학(상/하)", "수학 I/II", "미적분", "확률과 통계", "기하", "실용수학"],
  "영어": ["영어 일반", "영어 회화", "영어 독해와 작문", "진로 영어"],
  "사회(일반)": ["통합사회", "한국사", "생활과 윤리", "윤리와 사상", "사회·문화"],
  "지리/역사": ["한국지리", "세계지리", "동아시아사", "세계사", "여행지리"],
  "일반선택(사탐)": ["경제", "정치와 법"],
  "과학": ["통합과학", "과학탐구실험", "물리학", "화학", "생명과학", "지구과학"],
  "생활/교양": ["기술·가정", "정보", "환경", "보건", "철학", "심리학", "교육학"]
};

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'keyword' | 'category'>('keyword');
  const [categoryType, setCategoryType] = useState<'major' | 'subject'>('major');
  const [query, setQuery] = useState('');
  
  // Category selection state
  const [selectedMainCategory, setSelectedMainCategory] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleCategorySelect = (subItem: string) => {
    let searchQuery = "";
    if (categoryType === 'major') {
      searchQuery = `${selectedMainCategory} 계열, 특히 ${subItem} 학과 진학을 희망하는 학생을 위한 전공 적합성을 높여주는 심화 독서 추천`;
    } else {
      searchQuery = `고등학교 ${subItem} 교과목과 연계된 심화 탐구 활동을 위한 학술적 가치가 있는 독서 추천 (${selectedMainCategory} 교과 관련)`;
    }
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
          AI가 생기부를 빛내줄 좋은 책을 찾아드립니다.
        </p>
      </div>

      {/* Main Mode Tabs */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-100 p-1 rounded-xl inline-flex shadow-inner">
          <button
            onClick={() => setActiveTab('keyword')}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'keyword' 
                ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-black/5' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Type className="w-4 h-4" />
            직접 입력
          </button>
          <button
            onClick={() => setActiveTab('category')}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'category' 
                ? 'bg-white text-indigo-700 shadow-sm ring-1 ring-black/5' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Grid className="w-4 h-4" />
            카테고리 선택
          </button>
        </div>
      </div>

      {/* Keyword Input Mode */}
      {activeTab === 'keyword' && (
        <div className="animate-fade-in-up max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className={`w-6 h-6 ${isLoading ? 'text-indigo-400' : 'text-slate-400'}`} />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-32 py-4 bg-white border-2 border-slate-200 rounded-2xl text-lg placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm"
              placeholder="예: 재생에너지 효율과 관련된 물리학, 인공지능 윤리..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  분석중
                </span>
              ) : (
                <>
                  <span>추천받기</span>
                  <Sparkles className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
          
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="text-sm text-slate-400">추천 검색어:</span>
            {['기후 위기와 경제', '유전자 가위 기술', '메타버스와 교육', '건축과 공간 심리'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setQuery(tag)}
                className="text-sm px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Category Selection Mode */}
      {activeTab === 'category' && (
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
                  <span>AI가 {selectedMainCategory} 관련 추천 도서를 분석하고 있습니다...</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;