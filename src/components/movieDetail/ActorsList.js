import React from "react";

const ActorsList = ({ actors }) => {
  
  const actorsList = actors.slice(0, 4).map((actor, i) => {
    return (
      <div style={{ color: "white" }} className="col-md-3 text-center" key={i}>
        <img
          className="img-fluid rounded-circle mx-auto d-block"
          src={actor.img}
          alt={actor.name}
        ></img>
        <p className="font-weight-bold text-center">{actor.name}</p>
        <p className=" text-center text-decor">{actor.character}</p>
      </div>
    );
  });

  return (
    <>
      <div className="row mt-5">
        <div className="col">
          <p className="subtitles-detail">Актеры</p>
        </div>
      </div>
      <div className="row mt-2">{actorsList}</div>
    </>
  );
};

export default ActorsList;
