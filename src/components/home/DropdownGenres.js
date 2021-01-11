import React from "react";
import { connect } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { saveListOfMovies, saveGenre } from "../../actions/moviesActions";
import { fetchMovieByGenre } from "../../services/movieDbService";

const DropdownGenres = ({genres , saveListOfMovies, saveGenre, resetPage}) => {

  const onGenreClick = async (g_id, g_name) => {
    resetPage();
    saveListOfMovies(await fetchMovieByGenre(g_id));
    saveGenre({id: g_id, name: g_name});
  }

  const genresList = genres.map((genre) => {
    return (
      <Dropdown.Item key={genre.id} onClick={() => onGenreClick(genre.id, genre.name)}>
        {genre.name}
      </Dropdown.Item>
    );
  });

  return (
    <Dropdown style={{marginTop: "5px"}}>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Выбор жанра
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {genresList}
      </Dropdown.Menu>
    </Dropdown>
  );
};

// export default DropdownGenres;
export default connect(null, { saveListOfMovies, saveGenre })(DropdownGenres);