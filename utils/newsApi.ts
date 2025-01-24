import { NewsResponse } from '../types/news';

const API_KEY = '183daca270264bad86fc5b72972fb82a';
const BASE_URL = 'https://newsapi.org/v2';

export const newsApi = {
  async searchNews(query: string): Promise<NewsResponse> {
    if (!query.trim()) {
      throw new Error('Please enter a search term');
    }

    try {
      const url = `${BASE_URL}/everything?q=${encodeURIComponent(query.trim())}&apiKey=${API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch news');
      }

      return response.json();
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error('An error occurred while fetching news');
    }
  }
};
