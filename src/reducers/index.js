import { MOVIES_SAVED, MOVIES_SELECTED, GENRE_SAVED, FETCH_NEW_LIST_MOVIES, GENRE_AND_PAGE_RESETED, MOVIE_DELETED,
  MOVIE_CHANGED, SELECTED_MOVIES_INITIALIZED } from "../actions/types";
import { combineReducers } from "redux";

const savedMoviesReducer = (savedMovies = [], action) => {
  switch (action.type) {
    case MOVIES_SAVED:
      return action.payload;

    case FETCH_NEW_LIST_MOVIES:
      return action.payload;

    default:
      return savedMovies;
  }
};

const savedGenreReducer = (genreMem = {id: 0, name: "любой"}, action) => {
  switch (action.type) {
    case GENRE_SAVED:
      return {...genreMem, ...action.payload };

    case GENRE_AND_PAGE_RESETED:
      return action.payload;

    default:
      return genreMem;  
  }
};

// initialState for selectedMovies is array with structured object: {films: null,  isWatched: false,  ratingUser: 0, comment: ''}
const selectedMoviesReducer = (selectedMovies = [], action) => {
  switch (action.type) {

    case MOVIES_SELECTED:
      const newRecord = {film: action.payload, isWatched: false, ratingUser: 1, comment: 'Здесь может быть ваш отзыв'};
      let result = selectedMovies.find((m) => m.film.id === newRecord.film.id);
      if (result === undefined) {
        return [...selectedMovies, newRecord];
      }  else {
        return selectedMovies;
      }

      case MOVIE_CHANGED:
        let resultWithoutEditable = selectedMovies.filter((sm) => sm.film.id !== action.payload.film.id);
        return [...resultWithoutEditable, action.payload];

      case MOVIE_DELETED:
        let resultWithoutEditable2 = selectedMovies.filter((sm) => sm.film.id !== action.payload.film.id);
        return [...resultWithoutEditable2];

      case SELECTED_MOVIES_INITIALIZED:
        return[...action.payload];  

    default:
      return selectedMovies;
  }
};

export default combineReducers({
  savedMovies: savedMoviesReducer,
  genreMem: savedGenreReducer,
  selectedMovies: selectedMoviesReducer,
});
