import React from 'react';
import { GraduationCap, BookOpen } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 text-indigo-800">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <GraduationCap className="w-6 h-6 text-indigo-700" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-none tracking-tight">함창고등학교</span>
            <span className="text-xs text-indigo-600 font-medium mt-0.5">AI 독서 추천 시스템</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-slate-500 text-sm font-medium">
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline">대입을 위한 깊이 있는 독서</span>
        </div>
      </div>
    </header>
  );
};

export default Header;