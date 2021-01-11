import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import {Card, Container, Modal, Form, Button} from 'react-bootstrap';
import {FaRegEye, FaTrashRestoreAlt, FaEdit, FaCheckCircle} from 'react-icons/fa';
import {changeMovie, deleteMovie} from '../../actions/moviesActions';


const WatchList = ({ selectedMovies, changeMovie, deleteMovie }) => {

  const [show, setShow] = useState(false);
  const [movieEditable, setMovieEditable] = useState(null);
 


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    localStorage.setItem("selectedMovies", JSON.stringify(selectedMovies));
  }, [selectedMovies])
  

  const onEditClikc = (id) => {
    let res = selectedMovies.find((m) => m.film.id === id)
    setMovieEditable(res);

    handleShow();
  }

  const onDeleteClick = (id) => {
    let res = selectedMovies.find((m) => m.film.id === id);
    deleteMovie(res);
    
  }

  const onFormSubmit = (e) => {
    e.preventDefault();

    let els = document.getElementsByName("listOfMovieCommentIsWatched")

    const movieChanged =  { ...movieEditable, isWatched: els[2].checked, ratingUser: els[0].value, comment: els[1].value };
    changeMovie(movieChanged);

    handleClose();
  }

  const renderedSelectMovies = selectedMovies.map((movie, index) => {
    return (
      <tr key={movie.film.id}>
        {/* {movie.film.title} {movie.ratingUser} */}
        <th scope="row">{index + 1}</th>
        
        <td>
          <Card style={{ width: '10rem' }}>
            <Card.Img variant="top" src={movie.film.backPoster}></Card.Img>
          </Card>
          <span>{movie.film.title}</span>
        </td>
        <td> {
              movie.isWatched === true ? <FaCheckCircle size="40" color="yellow" style={{marginLeft:"30%"}} /> 
                                        : <FaRegEye size="50" color="skyblue" style={{marginLeft:"30%"}} />
          }
          
        </td>
        <td>
          <p>Оцека зрителей: <span>{movie.film.rating}</span></p>
          <p>Моя оцека: <span>{movie.ratingUser}</span></p>
        </td>
        <td style={{width: "300px"}}>
           {movie.comment}
        </td>
        <td>
          <button className="btn btn-secondary m-1" onClick={() => onEditClikc(movie.film.id)}><FaEdit size="20" /></button>
          <button className="btn btn-danger m-1" onClick={() => onDeleteClick(movie.film.id)}><FaTrashRestoreAlt size="20" /></button>
        </td>
        
      </tr>
    );
  });

  if (selectedMovies.length === 0) {
    return (
      <div style={{height: "36rem"}}>
        <h2 className="header-title">
        Список к просмотру
        </h2>
        <h2 style={{color: "yellowgreen", marginLeft: "20px"}}>Select Movie!</h2>
      </div>
    );
  }

  return (
    <div style={{marginBottom: "17rem"}}>
      <h2 className="header-title">
        Список к просмотру
      </h2>
      
      <Container fluid>
      <p style={{color: "#F08080"}}>* - Ваш список будет сохранён в локальном хранилище вашего браузера</p>
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th scope="col" className="text-center">№</th>
            <th scope="col" className="text-center">Фильм</th>
            <th scope="col" className="text-center">Просмотрено</th>
            <th scope="col" className="text-center">Моя оценка</th>
            <th scope="col" className="text-center">Мой Отзыв</th>
            <th scope="col" className="text-center">
              <span style={{color:"yellowgreen", fontSize:"25px"}}>Click !</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {renderedSelectMovies}
        </tbody>
      </table>
      </Container>

      <Modal show={show} onHide={handleClose}>
     <Modal.Header closeButton>
        <Modal.Title style={{color:"green"}}>"{movieEditable === null ? "" : movieEditable.film.title}"</Modal.Title>
     </Modal.Header>
     <Modal.Body>
       <Form onSubmit={(e) => onFormSubmit(e)}>
         <Form.Group>
           <Form.Label style={{color: "black"}}>Оцека фильму</Form.Label>
              <Form.Control name="listOfMovieCommentIsWatched" type="number" size="4" 
                          max="10" min="1" placeholder="Введите оценку от 1 до 10" defaultValue={movieEditable === null ? "1" : movieEditable.ratingUser } 
              />
           <Form.Text className="text-muted">Ваша оценка должна быть максимпльно объективной от 1 до 10</Form.Text>
         </Form.Group>
         <Form.Group>
           <Form.Label style={{color: "black"}}>Напишите своё мнение о фильме</Form.Label>
              <Form.Control name="listOfMovieCommentIsWatched" as="textarea" rows={3} cols={20} 
                         defaultValue={movieEditable === null ? "Пока нет отзыва" : movieEditable.comment } 
              />
         </Form.Group>
         <Form.Group>
           <Form.Label style={{color: "black"}}>Отметка о просмотре фильма</Form.Label>
           <Form.Check name="listOfMovieCommentIsWatched" type="checkbox" label="Посмотрел" defaultChecked={movieEditable === null ? false: movieEditable.isWatched} />
         </Form.Group>
         <Button variant="primary" type="submit">Сохранить</Button>
       </Form>
     </Modal.Body>
   </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    selectedMovies: state.selectedMovies,
  };
};

export default connect(mapStateToProps, {changeMovie, deleteMovie})(WatchList);
