import React from "react";
import { Navbar, Container } from "react-bootstrap";
import "./Header.css";

const Header = () => {
  return (
    <Navbar bg="danger">
      <Container>
        <Navbar.Text className="headerText">Userscores</Navbar.Text>
      </Container>
    </Navbar>
  );
};

export default Header;
