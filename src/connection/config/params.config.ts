import { API_KEY } from '@env';

export const variables = {
    baseUrl: 'https://api.themoviedb.org/3/movie',
    searchUrl: 'https://api.themoviedb.org/3/search/movie',
    imageBaseUrl: 'https://image.tmdb.org/t/p/w500',
    api_key: API_KEY ?? 'no-key',
    language: 'es'
}
