import { API_KEY } from '@env';

export const variables = {
    baseUrl: 'https://api.themoviedb.org/3/movie',
    api_key: API_KEY ?? 'no-key',
    language: 'es'
}
