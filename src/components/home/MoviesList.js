import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Card, Spinner } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { FaArrowAltCircleRight } from "react-icons/fa";

import "./moviesList.css";
import AddAndConfirmButton from "./AddAndConfirmButton";

const MovieList = ({ movies, selectMovie }) => {
  const [curAndPrev, setCurAndPrev] = useState({ current: 6, prev: 0 });
  const [displayMovies, setDisplayMovies] = useState([]);

  useEffect(() => {
    setCurAndPrev({ current: 6, prev: 0 });
    setDisplayMovies(movies);
    }, [movies]);

  let lengthList = 0;

  if (movies.length >= 18) {
    lengthList = 20;
  } else if (movies.length >= 7 && movies.length < 18) {
    lengthList = 14;
  } else if (movies.length > 0 && movies.length < 7) {
    lengthList = 8;
  } else {
    return (
      <div className="text-center">
        <p style={{color: "red"}}>Ничего не найдено</p>
      </div>
    )
  }

  const nextListMovies = () => {
    //LengthList = 20
    if (curAndPrev.current === lengthList - 2) {
      setCurAndPrev({ current: 6, prev: 0 });
    } else {
      setCurAndPrev({
        current: curAndPrev.current + 6,
        prev: curAndPrev.prev + 6,
      });
    }
  };



  const moviesForRender = displayMovies.length === 0 ? movies : displayMovies;
  const renderedListMovies = moviesForRender.slice(curAndPrev.prev, curAndPrev.current).map((movie) => {
      return (
        <div className="col-md-4 col-sm-6 bord" key={movie.id}>
          <Card>
            <Link to={`/movie/${movie.id}`}>
              <Card.Img variant="top" src={movie.backPoster} />
            </Link>
            <Card.Body style={{ backgroundColor: "rgb(210, 225, 253)" }}>
              <Card.Title>{movie.title}</Card.Title>
              <ReactStars
                count={movie.rating}
                size={20}
                color={"#FF1493"}
                activeColor={"#FF1493"}
              ></ReactStars>
              <Card.Text>Рейтинг: {movie.rating}</Card.Text>
              <AddAndConfirmButton movie={movie}>
                <span>Добавить</span>
              </AddAndConfirmButton>
              <Link
                to={`/movie/${movie.id}`}
                className="btn btn-secondary btn-sm"
                style={{marginLeft: "5px"}}
              >
                Подробней
              </Link>
            </Card.Body>
          </Card>
        </div>
      );
    });
  if (movies.length === 0) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
  //============================================================
  return (
    <div className="container">
       <div className="row">
            <div className="col"></div>
            <div className="col d-flex justify-content-center">
              <nav aria-label="Page navigation">
                <ul className="pagination">
                  <li className={`page-item ${curAndPrev.current === 6 ? "active" : "" }`}><span className="page-link">1</span></li>
                  <li className={`page-item ${curAndPrev.current === 12 ? "active" : "" }`}><span className="page-link">2</span></li>
                  <li className={`page-item ${curAndPrev.current === 18 ? "active" : "" }`}><span className="page-link">3</span></li>
                </ul>
              </nav>
            </div>
            <div className="col" style={{ paddingBottom: "20px" }}>
              <p className="title-arrow">Дальше</p>
              <FaArrowAltCircleRight
                className="right-arrow"
                onClick={nextListMovies}
              />
            </div>
      </div>

      <div className="row">
          {renderedListMovies}
      </div>

    </div>
  );
};

//=======================================================


export default MovieList;
