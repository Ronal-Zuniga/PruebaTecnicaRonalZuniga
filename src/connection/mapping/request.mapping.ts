import { Movie, List, MovieSimplified } from "../../entities/interfaces/movie";

export const mapMovieList = (data: List): List => {
    return {
        page: data.page,
        results: data.results.map(mapMovie),
        total_pages: data.total_pages,
        total_results: data.total_results
    };
};

export const mapMovie = (movie: Movie): Movie => {
    return {
        adult: movie.adult,
        backdrop_path: movie.backdrop_path,
        genre_ids: movie.genre_ids,
        id: movie.id,
        original_language: movie.original_language,
        original_title: movie.original_title,
        overview: movie.overview,
        popularity: movie.popularity,
        poster_path: movie.poster_path,
        release_date: new Date(movie.release_date),
        title: movie.title,
        video: movie.video,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count
    };
};

export const mapToSimplifiedMovie = (movie: Movie): MovieSimplified => {
    return {
        id: movie.id,
        title: movie.title,
        release_date: new Date(movie.release_date),
        poster_path: movie.poster_path
    };
};

export const mapToSimplifiedMovieList = (data: List): MovieSimplified[] => {
    return data.results.map(mapToSimplifiedMovie);
};
