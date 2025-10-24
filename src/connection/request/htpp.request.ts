import axios, { AxiosError } from "axios";
import { variables } from "../config/params.config";
import { List, MovieSimplified } from "../../entities/interfaces/movie";
import { MovieDetail, MovieDetailSimplified } from "../../entities/interfaces/movie.detail";
import { mapToSimplifiedMovieList, mapToSimplifiedMovieDetail } from "../mapping/request.mapping";

interface props{
    page?: number
}

interface movieDetailProps{
    movieId: number
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

export const getMovieDetail = async ({movieId}: movieDetailProps): Promise<MovieDetailSimplified> => {
    try {
        const fullUrl = `${variables.baseUrl}/${movieId}`;
        const params = {
            language: variables.language
        };

        const headers = {
            Authorization: `Bearer ${variables.api_key}`,
            accept: 'application/json'
        };

        const response = await axios.get<MovieDetail>(fullUrl, { params, headers });
        return mapToSimplifiedMovieDetail(response.data);
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`Error fetching movie detail: ${error.message}`);
        }
        throw new Error('Unknown error occurred while fetching movie detail');
    }
}
