import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {connect} from 'react-redux';
import {initializeSelectedMoviesFromLocal} from '../actions/moviesActions';

import HeaderNavBar from "./HeaderNavBar";
import Footer from "./Footer";
import Home from "./home/Home";
import MovieDetail from './movieDetail/MovieDetail';
import WatchList from "./watchlist/WatchList";
import { fetchGenre, fetchMovies, fetchTopratedMovie } from "../services/movieDbService";
import SliderMovies from "./home/SliderMovies";


import './App.css';
import About from "./About";

class App extends React.Component {

  state = { movies: [], topRateds: [], genres: [] }
  
  componentDidMount() {
    const fetchApi = async () => {
      const moviesList = await fetchMovies();
      const topRatedList = await fetchTopratedMovie();
      const genresList = await fetchGenre();
      this.setState({movies: moviesList, topRateds: topRatedList, genres: genresList});
    };
    fetchApi();
    // проверить, есть ли selectedMovies в локальном хранилище
    const selectedMoviesData = localStorage.getItem("selectedMovies");
    if (selectedMoviesData) {
      this.props.initializeSelectedMoviesFromLocal(JSON.parse(selectedMoviesData));
    }
  }

  render() {
    const { movies, topRateds, genres } = this.state;

    return (
      <div>
        <BrowserRouter>
          <HeaderNavBar />
          <Switch>
            <Route path="/" exact render={props => (
              <React.Fragment>
                <SliderMovies movies={movies} />
                <Home topRateds={topRateds} genres={genres} movies={movies} />
              </React.Fragment>
            )} />
            <Route path="/movie/:id" component={MovieDetail} />
            <Route path="/watchlist" component={WatchList} exact />
            <Route path="/about" component={About} exact />
          </Switch>
          <Footer />
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, {initializeSelectedMoviesFromLocal})(App);
