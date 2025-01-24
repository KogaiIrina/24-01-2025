import { newsApi } from '../../utils/newsApi';

global.fetch = jest.fn();

describe('newsApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('searchNews', () => {
    const mockSuccessResponse = {
      status: 'ok',
      totalResults: 2,
      articles: [
        {
          source: { id: 'bbc', name: 'BBC' },
          author: 'John Doe',
          title: 'Test Article 1',
          description: 'Test Description 1',
          url: 'https://test1.com',
          urlToImage: 'https://test1.com/image.jpg',
          publishedAt: '2024-01-24T00:00:00Z',
          content: 'Test content 1'
        },
        {
          source: { id: 'cnn', name: 'CNN' },
          author: 'Jane Smith',
          title: 'Test Article 2',
          description: 'Test Description 2',
          url: 'https://test2.com',
          urlToImage: 'https://test2.com/image.jpg',
          publishedAt: '2024-01-24T00:00:00Z',
          content: 'Test content 2'
        }
      ]
    };

    it('successfully fetches news articles', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse)
      });

      const result = await newsApi.searchNews('test query');

      expect(result).toEqual(mockSuccessResponse);
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/everything?q=test%20query')
      );
    });

    it('handles empty search query', async () => {
      await expect(newsApi.searchNews('')).rejects.toThrow(
        'Please enter a search term'
      );
    });

    it('handles API error response', async () => {
      const errorMessage = 'API key invalid';
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: () => Promise.resolve({ message: errorMessage })
      });

      await expect(newsApi.searchNews('test')).rejects.toThrow(errorMessage);
    });

    it('handles network error', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      );

      await expect(newsApi.searchNews('test')).rejects.toThrow('Network error');
    });
  });
});
