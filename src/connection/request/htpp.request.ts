import axios, { AxiosError } from "axios";
import { variables } from "../config/params.config";
import { List, MovieSimplified } from "../../entities/interfaces/movie";
import { MovieDetail, MovieDetailSimplified } from "../../entities/interfaces/movie.detail";
import { mapToSimplifiedMovieList, mapToSimplifiedMovieDetail, mapSearchToSimplifiedMovieList } from "../mapping/request.mapping";
import { MovieSearch } from "../../entities/interfaces/movie.search";

interface props{
    page?: number
}

interface movieDetailProps{
    movieId: number
}

interface searchMovieProps{
    query: string;
    page?: number;
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
            throw new Error(`Error al cargar películas populares: ${error.message}`);
        }
        throw new Error('Error desconocido al cargar películas populares');
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
            throw new Error(`Error al cargar detalles de la película: ${error.message}`);
        }
        throw new Error('Error desconocido al cargar detalles de la película');
    }
}

export const searchMovies = async ({query, page = 1}: searchMovieProps): Promise<MovieSimplified[]> => {
    try {
        const fullUrl = variables.searchUrl;
        const params = {
            query: query,
            language: variables.language,
            page: page
        };

        const headers = {
            Authorization: `Bearer ${variables.api_key}`,
            accept: 'application/json'
        };

        const response = await axios.get<MovieSearch>(fullUrl, { params, headers });
        return mapSearchToSimplifiedMovieList(response.data);
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new Error(`Error al buscar películas: ${error.message}`);
        }
        throw new Error('Error desconocido al buscar películas');
    }
}
