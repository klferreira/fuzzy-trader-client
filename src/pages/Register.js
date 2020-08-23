import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import RegisterForm from "../components/RegisterForm";

import authApi from "../api/auth";

const Register = () => {
  const auth = authApi();
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    auth
      .register(values)
      .then(() => history.push("/login"))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <h2 className="text-center">Cadastre-se</h2>
      <Row className="d-flex justify-content-center">
        <Col lg={5} md={6} sm={12}>
          <Card className="w-100">
            <Card.Body>
              <RegisterForm onSubmit={handleSubmit} isLoading={isLoading} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
