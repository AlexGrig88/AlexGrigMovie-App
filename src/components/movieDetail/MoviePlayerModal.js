import React, { useState, useEffect } from 'react';
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";

import { fetchMovieVideos } from '../../services/movieDbService';


const MoviePalyerModal = (props) => {
  const [video, setVideo] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetchMovieVideos(props.paramsId);
      setVideo(response);
    };

    fetchApi();
  }, [props.paramsId])


  const {show, onHide} = props;
  const youtubeUrl = "https://www.youtube.com/watch?v=";

  return (
    <Modal
      show={show}
      onHide={()=>onHide()} 
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "#000000", fontWeight: "bolder" }}
        >
          { video === undefined ? 'ВИДЕО К ФИЛЬМУ ОТСУТСТВУЕТ! СМОТРИМ ТРЕЙЛЕР "THE CROUDS" ' : props.detail.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#000000" }}>
        <ReactPlayer
          className="container-fluid"
          url={ video === undefined ? youtubeUrl + "GkXeVIfbJOw" :  youtubeUrl + video.key}
          playing
          width="100%"
        ></ReactPlayer>
      </Modal.Body>
    </Modal>
  );
};

export default MoviePalyerModal;