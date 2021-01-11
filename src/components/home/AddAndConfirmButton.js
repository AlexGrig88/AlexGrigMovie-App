import React, {useState} from 'react';
import { connect } from "react-redux";
import { Modal, Button } from 'react-bootstrap';

import { selectMovie } from "../../actions/moviesActions";

const AddAndConfirmButton = ({selectMovie, movie, children}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onClickButtonYes = () => {
    selectMovie(movie);
    setShow(false);
  }

  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        {children}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Подтвердите действие</Modal.Title>
        </Modal.Header>
        <Modal.Body>Добавить фильм в Cписок просмотра? <i style={{color: "red", fontSize: "14px"}}>чтобы данные были доступны при следующей загрузки
        веб приложения, они будут сохранены в локальном хранилище вашего браузера.</i>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onClickButtonYes}>
            Да, добавить
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Нет
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default connect(null, {selectMovie})(AddAndConfirmButton);
