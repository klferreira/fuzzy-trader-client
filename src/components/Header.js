import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Row className="bg-dark p-2">
      <Col className="d-flex justify-content-end">
        {user.name ? (
          <h5 className="text-white m-2">Bem vindo, {user.name}</h5>
        ) : (
          <>
            <Button className="mx-1">
              <Link className="text-white" to="/login">
                Login
              </Link>
            </Button>
            <Button className="mx-1">
              <Link className="text-white" to="/register">
                Cadastre-se
              </Link>
            </Button>
          </>
        )}
      </Col>
    </Row>
  );
};

export default connect()(Header);
