import React from 'react';
import { Book } from '../types';
import BookCard from './BookCard';
import { PlusCircle } from 'lucide-react';

interface BookListProps {
  books: Book[];
  onLoadMore: () => void;
  isLoadingMore: boolean;
}

const BookList: React.FC<BookListProps> = ({ books, onLoadMore, isLoadingMore }) => {
  if (books.length === 0) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 pb-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          AI 추천 도서 <span className="text-indigo-600">{books.length}권</span>
        </h2>
        <span className="text-sm text-slate-500 hidden sm:inline">
          * 실제 보고서 작성 시, 책을 직접 읽고 깊이 있게 탐구하는 것이 중요합니다.
        </span>
      </div>
      
      <div className="space-y-8 mb-12">
        {books.map((book, index) => (
          <BookCard key={`${book.title}-${index}`} book={book} index={index} />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onLoadMore}
          disabled={isLoadingMore}
          className="group flex items-center gap-2 bg-white border-2 border-indigo-100 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300 px-8 py-3 rounded-full font-semibold transition-all disabled:opacity-50 shadow-sm"
        >
          {isLoadingMore ? (
             <span className="w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></span>
          ) : (
            <PlusCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
          )}
          <span>다른 책 더 보기</span>
        </button>
      </div>
    </div>
  );
};

export default BookList;
