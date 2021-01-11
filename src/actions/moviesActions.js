import {
  MOVIES_SAVED,
  MOVIES_SELECTED,
  GENRE_SAVED,
  GENRE_AND_PAGE_RESETED,
  FETCH_NEW_LIST_MOVIES,
  MOVIE_DELETED,
  MOVIE_CHANGED,
  SELECTED_MOVIES_INITIALIZED

} from "./types";

import { fetchMovies, fetchMovieByGenre } from '../services/movieDbService';

//Action creator

export const saveListOfMovies = (movies) => (dispatch) => {
  dispatch({
    type: MOVIES_SAVED,
    payload: movies,
  });
};

export const fetchNewMovies = (genreId = 0, page = 2) => async (dispatch) => {
  let response = [];
  if (genreId === 0) {
    response = await fetchMovies(page);
  } else {
    response = await fetchMovieByGenre(genreId, page);
  }
  dispatch({ type: FETCH_NEW_LIST_MOVIES, payload: response });
};

export const selectMovie = (movie) => (dispatch) => {
  dispatch({
    type: MOVIES_SELECTED,
    payload: movie,
  });
};

export const saveGenre = (genreObj) => (dispatch) => {
  dispatch({
    type: GENRE_SAVED,
    payload: genreObj,
  });
};

export const resetGenre = () => (dispatch) => {
  dispatch({
    type: GENRE_AND_PAGE_RESETED,
    payload: {id: 0, name: "любой"},
  });
};

export const changeMovie = (movie) => (dispatch) => {
  dispatch({
    type: MOVIE_CHANGED,
    payload: movie,
  });
};


export const deleteMovie = (movie) => (dispatch) => {
  dispatch({
    type: MOVIE_DELETED,
    payload: movie,
  });
};

export const initializeSelectedMoviesFromLocal = (movies) => (dispatch) => {
  dispatch({
    type: SELECTED_MOVIES_INITIALIZED,
    payload: movies,
  });
};
