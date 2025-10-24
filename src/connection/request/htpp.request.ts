import axios, { AxiosError } from "axios";
import { variables } from "../config/params.config";
import { List, MovieSimplified } from "../../entities/interfaces/movie";
import { mapToSimplifiedMovieList } from "../mapping/request.mapping";

interface props{
    page?: number
}

export const getPopularMovies = async ({page = 1}: props): Promise<MovieSimplified[]> => {
    try {
        const fullUrl = `${variables.baseUrl}/popular`;
        const params = {
            language: variables.language,
            page: page
        };

        const headers = {
            Authorization: `Bearer ${variables.api_key}`,
            accept: 'application/json'
        };

        const response = await axios.get<List>(fullUrl, { params, headers });
        return mapToSimplifiedMovieList(response.data);
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`Error fetching popular movies: ${error.message}`);
        }
        throw new Error('Unknown error occurred while fetching popular movies');
    }
}
