import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Row className="bg-dark p-2">
      <Col className="d-flex justify-content-end">
        <Button className="mx-1">
          <Link className="text-white" to="/login">Login</Link>
        </Button>
        <Button className="mx-1">
          <Link className="text-white" to="/register">Cadastre-se</Link>
        </Button>
      </Col>
    </Row>
  );
};

export default Header;
