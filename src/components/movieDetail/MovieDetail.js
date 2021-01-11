import React, { useState, useEffect } from "react";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { FaPlayCircle } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";

import {
  fetchMovieDetail,
  fetchActors,
  fetchSimilarMovies,
  modifyMovieData
} from "../../services/movieDbService";
import MoviePlayerModal from "./MoviePlayerModal";
import ActorsList from "./ActorsList";
import ListMoviesInLine from "../home/ListMoviesInLine";
import AddAndConfirmButton from '../home/AddAndConfirmButton';

import "./movieDetail.css";

const srcImg = "https://image.tmdb.org/t/p/original/";

const MovieDetail = ({ match }) => {
  let params = match.params;

  const [detail, setDetail] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [actors, setActors] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDetail(await fetchMovieDetail(params.id));
      setActors(await fetchActors(params.id));
      setSimilarMovie(await fetchSimilarMovies(params.id));
    };

    fetchAPI();
  }, [params.id]);

  let genresList = [];
  let genres = detail.genres;

  if (genres) {
    genresList = genres.map((g, i) => {
      return (
        <li className="list-inline-item" key={i}>
          <button type="button" className="btn btn-outline-info">
            {g.name}
          </button>
        </li>
      );
    });
  }

  return (
    <div className="container">
      <div className="row mt-1">
        <MoviePlayerModal
          show={isOpen}
          onHide={() => setIsOpen(false)}
          detail={detail}
          paramsId={params.id}
        ></MoviePlayerModal>
        <div className="col text-center" style={{ width: "100%" }}>
          <img
            className="img-fluid"
            src={
              detail.backdrop_path === null
                ? "https://www.cultture.com/pics/2013/06/felicity_05.jpg"
                : `${srcImg}${detail.backdrop_path}`
            }
            alt={detail.title}
          />
          <div className="carousel-center">
            <FaPlayCircle
              onClick={() => setIsOpen(true)}
              className="icon-play"
            />
          </div>
          <div className="carousel-caption detail-title">{detail.title}</div>
        </div>

      </div>
      <div className="row mt-3">
        <div className="col">
          <p className="subtitles-detail">Жанр</p>
        </div>
        <div className="col">
        <AddAndConfirmButton movie={ modifyMovieData(detail)}>
            <span>Добавить к списку просмотра</span>
          </AddAndConfirmButton>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <ul className="list-inline">{genresList}</ul>
        </div>
      </div>

      <div className="row mt-3">
        <div className="col">
          <div>
            <ReactStars
              count={detail.vote_average || 7}
              size={20}
              color={"#FF1493"}
              activeColor={"#FF1493"}
            ></ReactStars>
          </div>
          <div className="text-decor">{detail.vote_average}</div>
          <div className="text-decor mt-3">
            <p className="subtitles-detail">О фильме</p>
            {detail.overview}
          </div>
        </div>
      </div>

      <div className="row mt-5 text-decor">
        <div className="col-md-3">
          <p className="subtitles-detail">Дата релиза</p>
          <p>{detail.release_date}</p>
        </div>
        <div className="col-md-3">
          <p className="subtitles-detail">Продолжительность</p>
          <p>{detail.runtime} мин.</p>
        </div>
        <div className="col-md-3">
          <p className="subtitles-detail">Бюджет</p>
          <p>{detail.budget}</p>
        </div>
        <div className="col-md-3">
          <p className="subtitles-detail">Страница фильма</p>
          <p>{detail.homepage}</p>
        </div>
      </div>

      <ActorsList actors={actors} />

      <div className="container">
        <div className="row">
          <h2
            style={{
              color: "rgb(184, 211, 235)",
              marginLeft: "15px",
              marginTop: "50px",
            }}
          >
            Похожие фильмы
          </h2>
        </div>
        <ListMoviesInLine topRatedsOrSimilarMovies={similarMovie} />
      </div>
    </div>
  );
};

export default MovieDetail;
