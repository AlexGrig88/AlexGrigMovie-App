import React from "react";
import { Container, Navbar, NavbarBrand } from "react-bootstrap";
import { Link } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

const HeaderNavBar = () => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <a href="/"><NavbarBrand style={{fontSize: "25px"}}>AlexGrig Movie</NavbarBrand></a>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <span className="nav nav-link"><Link to="/">Главная</Link></span>
            <span className="nav nav-link"><Link to="/watchlist">Список к просмотру</Link></span>
            <span className="nav nav-link"><Link to="/about">О проекте</Link></span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default HeaderNavBar;