import React from "react";
import { connect } from "react-redux";

import MovieList from "./MoviesList";
import DropdownGenres from "./DropdownGenres";
import SearchBar from "./SearchBar";
import ListMoviesInLine from "./ListMoviesInLine";

import {
  saveListOfMovies,
  fetchNewMovies,
  resetGenre,
} from "../../actions/moviesActions";
import { fetchFoundMovies } from "../../services/movieDbService";
import { Col, Container, Row } from "react-bootstrap";

let pageNum = 2;

const Home = ({
  movies,
  topRateds,
  genres,
  saveListOfMovies,
  savedMovies,
  fetchNewMovies,
  genreMem,
  resetGenre,
}) => {
  const onSearchSubmit = async (term) => {
    if (!term) {
      term = "поиск";
    }
    const response = await fetchFoundMovies(term);
    console.log("response", response);
    saveListOfMovies(response);
  };

  const onClickNewDownload = () => {
    fetchNewMovies(genreMem.id, pageNum);
    pageNum += 1;
  };
  const onClickRefresh = () => {
    resetGenre();
    pageNum = 2;
    saveListOfMovies(movies);
  };

  const onResetPage = () => {
    pageNum = 2;
  };

  return (
    <div>
      <div className="container">
        <div className="row mt-2">
          <div className="col-md-6 col-sm-6">
            <DropdownGenres genres={genres} resetPage={onResetPage} />
          </div>
          <div className="col-md-6 col-sm-6">
            <SearchBar onSubmit={onSearchSubmit} resetPage={onResetPage} />
          </div>
        </div>
      </div>
      <Container>
        <Row className="mt-2">
          <Col>
            <button
              className="btn btn-primary btn-sm"
              style={{ marginBottom: "10px" }}
              onClick={onClickRefresh}
            >
              Стартовый список
            </button>
          </Col>
          <Col><h2 className="header-title">
              Кино для всех
          </h2>
          </Col>
          <Col>
          <button
            className="btn btn-secondary btn-sm"
            style={{ marginRight: "10px", marginBottom: "10px" }}
            onClick={onClickNewDownload}
          >
            Загрузить ещё фильмы
          </button>
          </Col>
        </Row>
        <Row>
          <p style={{ color: "whitesmoke", margin: "10px" }}>Текущий жанр</p>
          <button type="button" className="btn btn-outline-info">
            {genreMem.name === undefined ? "любой" : genreMem.name}
          </button>
        </Row>
        <Row>
          <p style={{ color: "whitesmoke", margin: "10px" }}>
            Текущий номер загруженного контейнера{" "}
            <span
              className="badge badge-secondary"
              style={{ fontSize: "18px" }}
            >
              {pageNum - 1}
            </span>
          </p>
        </Row>
      </Container>
      <MovieList movies={savedMovies.length === 0 ? movies : savedMovies} />
      <div className="container">
        <div className="row">
          <h2
            style={{
              color: "rgb(184, 211, 235)",
              marginLeft: "15px",
              marginTop: "50px",
            }}
          >
            Топ рейтинга
          </h2>
        </div>
        <ListMoviesInLine topRatedsOrSimilarMovies={topRateds} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    savedMovies: state.savedMovies,
    genreMem: state.genreMem,
  };
};

export default connect(mapStateToProps, {
  saveListOfMovies,
  fetchNewMovies,
  resetGenre,
})(Home);
