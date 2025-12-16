import React, { useState } from 'react';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import BookList from './components/BookList';
import { Book, LoadingState } from './types';
import { getBookRecommendations } from './services/geminiService';
import { AlertCircle, BookOpen } from 'lucide-react';

function App() {
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [loadingMore, setLoadingMore] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [currentQuery, setCurrentQuery] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    setLoadingState(LoadingState.LOADING);
    setErrorMsg(null);
    setBooks([]);
    setCurrentQuery(query);

    try {
      const recommendations = await getBookRecommendations(query);
      setBooks(recommendations);
      setLoadingState(LoadingState.SUCCESS);
    } catch (err) {
      console.error(err);
      setErrorMsg("책을 추천하는 과정에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      setLoadingState(LoadingState.ERROR);
    }
  };

  const handleLoadMore = async () => {
    if (!currentQuery) return;
    setLoadingMore(true);
    
    try {
      // Pass existing titles to exclude them
      const excludeTitles = books.map(b => b.title);
      const newRecommendations = await getBookRecommendations(currentQuery, excludeTitles);
      
      // Append new books
      setBooks(prev => [...prev, ...newRecommendations]);
    } catch (err) {
      console.error(err);
      // Optional: show toast or transient error for load more failure
      alert("추가 도서를 불러오는 중 오류가 발생했습니다.");
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-grow">
        <SearchInput 
          onSearch={handleSearch} 
          isLoading={loadingState === LoadingState.LOADING} 
        />

        {/* Loading Skeleton */}
        {loadingState === LoadingState.LOADING && (
          <div className="max-w-5xl mx-auto px-4 py-12 text-center">
            <div className="animate-pulse space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-slate-200 h-64 rounded-2xl w-full"></div>
              ))}
            </div>
            <p className="mt-8 text-slate-500 font-medium animate-pulse">
              함창고 학생을 위한 맞춤형 도서를 분석하고 있습니다...
            </p>
          </div>
        )}

        {/* Error State */}
        {loadingState === LoadingState.ERROR && (
          <div className="max-w-2xl mx-auto px-4 py-8">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <h3 className="text-red-800 font-semibold">오류 발생</h3>
                <p className="text-red-700 text-sm mt-1">{errorMsg}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State / Intro */}
        {loadingState === LoadingState.IDLE && (
          <div className="max-w-5xl mx-auto px-4 py-12 text-center text-slate-400">
            <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-20" />
            <p className="text-lg">계열 선택을 통해<br/>생기부를 채워줄 도서를 추천받아보세요.</p>
          </div>
        )}

        {/* Results */}
        {loadingState === LoadingState.SUCCESS && (
          <BookList 
            books={books} 
            onLoadMore={handleLoadMore}
            isLoadingMore={loadingMore}
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 mt-12">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm font-semibold">
            함창고등학교 AI 독서 지원 시스템
          </p>
          <p className="text-slate-400 text-xs mt-2">
            본 서비스는 교육용 목적으로 제공되는 도서 추천 결과입니다.<br/>
            추천된 도서는 반드시 학교 도서관이나 서점에서 내용을 확인 후 활용하세요.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;