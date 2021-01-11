import React, { useState } from "react";
import {connect} from 'react-redux';
import { resetGenre } from '../../actions/moviesActions';

import "./SearchBar.css";

const SearchBar = ({onSubmit, resetPage, resetGenre}) => {
  const [term, setTerm] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    resetPage();
    resetGenre();
    onSubmit(term);
  }

  return (
    <div className="form">
      <form onSubmit={onFormSubmit}>
        <label className="form-label">Поиск фильма</label>
        <input
          type="text"
          className="form-input"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
    </div>
  );
};

export default connect(null, {resetGenre})(SearchBar);