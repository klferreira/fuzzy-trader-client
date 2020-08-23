import React, { useState, useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";

import LoginForm from "../components/LoginForm";

import api from "../api";
import { login } from "../store/actions/auth";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) history.push("/dashboard");
  }, []);

  const handleSubmit = ({ email, password }) => {
    setLoading(true);
    api.auth
      .login({ email, password })
      .then((res) => {
        dispatch(login(res.data));
        history.push("/dashboard");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <h2 className="text-center">Login</h2>
      <Row className="d-flex justify-content-center">
        <Col lg={5} md={6} sm={12}>
          <Card className="w-100">
            <Card.Body>
              <LoginForm onSubmit={handleSubmit} isLoading={isLoading} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default connect()(Login);
