import axios from "axios";

import imgCap from "../img/cap.jpg";

const apiKey = "505518b3a4f2e61c0a20f7619c0458e7";
const url = "https://api.themoviedb.org/3";
const nowPlayingUrl = `${url}/movie/now_playing`;
const topratedUrl = `${url}/movie/top_rated`;
const movieUrl = `${url}/movie`;
const genreUrl = `${url}/genre/movie/list`;
const moviesUrl = `${url}/discover/movie`;

const posterUrl = "https://image.tmdb.org/t/p/original/";


const getResource = async (pieceOfUrl, pageNumber = 1, id = null) => {
  try {
    const { data } = await axios.get(pieceOfUrl, {
      params: {
        api_key: apiKey,
        language: "ru",
        page: pageNumber,
        with_genres: id,
      },
    });

    return data;
  } catch (error) {}
};

export const modifyMovieData = (res) => {
  return {
    id: res.id,
    backPoster:
      posterUrl + res.backdrop_path === posterUrl + "null"
        ? imgCap
        : posterUrl + res.backdrop_path,
    popularity: res.popularith,
    title: res.title,
    poster: posterUrl + res.poster_path,
    overview: res.overview,
    rating: res.vote_average,
  }
}

const modifydData = (data) => {
  return data.results.map((res) => {
    return modifyMovieData(res);
  } )};

//=====================================================================
export const fetchMovies = async (page = 1) => {
  const data = await getResource(nowPlayingUrl, page);

  return modifydData(data);
};
//=====================================================================
export const fetchGenre = async () => {
  const data = await getResource(genreUrl);

  const modifiedData = data.genres.map((g) => ({
    id: g.id,
    name: g.name,
  }));

  return modifiedData;
};
//=====================================================================
export const fetchMovieByGenre = async (genre_id, page) => {
  const data = await getResource(moviesUrl, page, genre_id);
  
  return modifydData(data);
};

//=====================================================================
export const fetchTopratedMovie = async () => {
  const data = await getResource(topratedUrl);

  return modifydData(data);
};
//============================================================

export const fetchMovieDetail = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}`, {
      params: {
        api_key: apiKey,
        language: "ru",
      },
    });
    return data;
  } catch (error) {}
};
//============================================================
export const fetchMovieVideos = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/videos`, {
      params: {
        api_key: apiKey,
        // language: "ru",
      },
    });
    return data.results[0];
  } catch (error) {}
};

//============================================================
export const fetchActors = async (id) => {
  try {
    const { data } = await axios.get(`${movieUrl}/${id}/credits`, {
      params: {
        api_key: apiKey,
      },
    });
    const modifiedData = data.cast.map((c) => ({
      id: c.cast_id,
      character: c.character,
      name: c.name,
      img: "https://image.tmdb.org/t/p/w200" + c.profile_path,
    }));

    return modifiedData;
  } catch (error) {}
};

//============================================================

export const fetchFoundMovies = async (term) => {
  try {
    const { data } = await axios.get(`${url}/search/movie`, {
      params: {
        api_key: apiKey,
        language: "ru",
        query: term,
      },
    });

    return modifydData(data);
  } catch (error) {}
};

export const fetchSimilarMovies = async (id) => {
  const pieceUrl = `${movieUrl}/${id}/similar`;
  const data = await getResource(pieceUrl);

  return modifydData(data);
};
