import React, { useEffect, useState } from 'react';
import { Book } from '../types';
import { BookOpenText, Quote, User, ImageOff } from 'lucide-react';

interface BookCardProps {
  book: Book;
  index: number;
}

const BookCard: React.FC<BookCardProps> = ({ book, index }) => {
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchCover = async () => {
      setImageLoading(true);
      try {
        // Use Google Books API to find the book cover
        const query = encodeURIComponent(`intitle:${book.title}`); // Removed inauthor for broader search hit rate
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`);
        const data = await response.json();

        if (isMounted && data.items && data.items.length > 0) {
          const volumeInfo = data.items[0].volumeInfo;
          // Prefer high res if available, but thumbnail is standard
          const imageLinks = volumeInfo.imageLinks;
          if (imageLinks) {
            // Secure URL replacement
            const secureUrl = (imageLinks.thumbnail || imageLinks.smallThumbnail)?.replace('http://', 'https://');
            setCoverUrl(secureUrl);
          }
        }
      } catch (error) {
        console.error("Failed to fetch book cover", error);
      } finally {
        if (isMounted) setImageLoading(false);
      }
    };

    fetchCover();

    return () => {
      isMounted = false;
    };
  }, [book.title, book.author]);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden flex flex-col md:flex-row hover:shadow-xl transition-shadow duration-300">
      {/* Book Cover */}
      <div className="w-full md:w-48 h-64 md:h-auto bg-slate-100 flex-shrink-0 relative overflow-hidden flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-100">
        {coverUrl ? (
          <img 
            src={coverUrl} 
            alt={book.title} 
            className="w-full h-full object-cover md:object-contain p-0 md:p-2 transition-opacity duration-500" 
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-400 p-4 text-center">
            {imageLoading ? (
               <div className="w-8 h-8 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-2"></div>
            ) : (
              <>
                <ImageOff className="w-10 h-10 mb-2 opacity-50" />
                <span className="text-xs font-medium">이미지 없음</span>
              </>
            )}
          </div>
        )}
        
        {/* Mobile Title Overlay (only if no image or loading) */}
        {!coverUrl && !imageLoading && (
           <div className="absolute inset-0 flex items-center justify-center p-4 text-center md:hidden">
             <span className="text-slate-800 font-bold truncate px-2">{book.title}</span>
           </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wide rounded-full">
              {book.category}
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
            {book.title}
          </h3>
          
          <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
            <User className="w-4 h-4" />
            <span>{book.author}</span>
          </div>

          <p className="text-slate-600 leading-relaxed mb-6 line-clamp-3 hover:line-clamp-none transition-all">
            {book.description}
          </p>
        </div>

        <div className="bg-amber-50 rounded-xl p-5 border border-amber-100 mt-auto">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex-shrink-0">
              <Quote className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-amber-800 mb-1">대입/세특 활용 Point</h4>
              <p className="text-sm text-amber-900/80 leading-relaxed">
                {book.academicRelevance}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;