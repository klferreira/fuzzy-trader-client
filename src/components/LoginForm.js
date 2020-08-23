import React from "react";
import * as Yup from "yup";
import { Button, Form, Spinner } from "react-bootstrap";

import useFormState from "../hooks/useFormState";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Campo obrigatório"),
  password: Yup.string()
    .min(6, "Senha deve possuir pelo menos 6 caracteres")
    .required("Campo obrigatório"),
});

const initState = {
  email: "",
  password: "",
};

const LoginForm = ({ onSubmit, isLoading }) => {
  const { formState, handleChange, handleBlur, handleSubmit } = useFormState(
    initState,
    validationSchema
  );

  const { touched, errors, values } = formState;

  return (
    <Form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Seu email"
          value={values.email}
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          isInvalid={touched.email && !!errors.email}
        />
        {touched.email && errors.email && (
          <Form.Text className="text-danger">{errors.email}</Form.Text>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label>Senha</Form.Label>
        <Form.Control
          type="password"
          placeholder="Senha"
          value={values.password}
          onChange={handleChange("password")}
          onBlur={handleBlur("password")}
          isInvalid={touched.password && !!errors.password}
        />
        {touched.password && errors.password && (
          <Form.Text className="text-danger">{errors.password}</Form.Text>
        )}
      </Form.Group>
      <div className="d-flex justify-content-center">
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? (
            <Spinner animation="border" role="status" size="sm">
              <span className="sr-only">Loading...</span>
            </Spinner>
          ) : (
            "Login"
          )}
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
