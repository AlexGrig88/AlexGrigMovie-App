import React from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";

const SliderMovies = ({ movies }) => {

  console.log(movies)
  const renederedMovies = movies.slice(0, 5).map((movie) => {
    return (
      <Carousel.Item style={{ height: 500, width: "100%" }} key={movie.id}>
        <div className="carousel-center">
          <img
            style={{ height: 700 }}
            alt={movie.title}
            src={movie.backPoster}
          />
        </div>
        <Carousel.Caption>
          <h3 style={{ color: "yellow" }}>{movie.title}</h3>
        </Carousel.Caption>
      </Carousel.Item>
    );
  });
  return (
    <Container>
      <Row>
        <Col>
          <Carousel>{renederedMovies}</Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default SliderMovies;
