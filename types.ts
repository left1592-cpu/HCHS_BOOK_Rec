export interface Book {
  title: string;
  author: string;
  description: string;
  academicRelevance: string; // How this book helps with college admissions/reports
  category: string;
  coverUrl?: string; // Optional: URL from external API
}

export interface RecommendationResponse {
  recommendations: Book[];
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}