// Central place for all TMDB API configuration and fetch functions.
// Keeping API logic here means components stay clean — they just call
// fetchMovies() and don't need to know about URLs or headers.

export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        // Bearer token auth — the API key is stored in .env as EXPO_PUBLIC_MOVIE_API_KEY.
        // EXPO_PUBLIC_ prefix makes it available at runtime in the app.
        // Storing it in .env keeps it out of git (gitignored) so it's never exposed on GitHub.
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
};

export const fetchMovies = async ({query}: { query: string }) => {
    // If a search query is provided, use the search endpoint.
    // Otherwise fall back to discovering popular movies.
    // encodeURIComponent safely encodes special characters in the query string
    // (e.g. spaces become %20) so the URL doesn't break.
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    // response.ok is true for 200-299 status codes.
    // If the request failed (e.g. 401, 404, 500), throw an error so
    // the catch block in useFetch can handle it.
    if (!response.ok) {
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }

    const data = await response.json();
    // The TMDB API wraps results in a "results" array — we return just that.
    return data.results;
}

export const fetchMovieDetails = async (movieId: string):Promise<MovieDetails> => {
    try{
        const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`, {
            method: 'GET',
            headers: TMDB_CONFIG.headers,
        });

        if(!response.ok) throw new Error(`Failed to fetch movie details`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
