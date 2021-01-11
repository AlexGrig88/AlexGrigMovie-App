import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { FaArrowAltCircleRight } from "react-icons/fa";
import AddAndConfirmButton from "./AddAndConfirmButton";



const ListMoviesInLine = ({topRatedsOrSimilarMovies}) => {

  const [curAndPrev, setCurAndPrev] = useState({ current: 4, prev: 0 });
  const lengthList = topRatedsOrSimilarMovies.length;

  const nextListMovies = () => {
    //LengthList = 20
    if (curAndPrev.current === lengthList) {
      setCurAndPrev({ current: 4, prev: 0 });
    } else {
      setCurAndPrev({
        current: curAndPrev.current + 4,
        prev: curAndPrev.prev + 4,
      });
    }
  };
  const topRatedOrSimilarList = topRatedsOrSimilarMovies
    .slice(curAndPrev.prev, curAndPrev.current)
    .map((movie, index) => {
      return (
        <div
          className="col-md-3 col-sm-6"
          key={movie.id}
          style={{ padding: "1rem" }}
        >
          <Card>
            <Link to={`/movie/${movie.id}`}>
              <Card.Img variant="top" src={movie.backPoster} />
            </Link>
            <Card.Body style={{ backgroundColor: "rgb(210, 225, 253)" }}>
              <Card.Title>
                {movie.title}
              </Card.Title>
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
              <Link to={`/movie/${movie.id}`} className="btn btn-secondary btn-sm" style={{marginLeft: "5px"}}>
                Подробней
              </Link>
            </Card.Body>
          </Card>
        </div>
      );
    });
  return (
    <div>
      <div className="container">
        <div className="row mb-4">
          <div className="col"></div>
          <div className="col"></div>
          <div className="col">
            <FaArrowAltCircleRight
              className="right-arrow"
              onClick={nextListMovies}
              style={{ marginBottom: "30px" }}
            /></div>
        
        </div>
        <div className="row">{topRatedOrSimilarList}</div>
      </div>
    </div>
  );
};

export default ListMoviesInLine;
