import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Button, Container, Row, Col } from 'react-bootstrap';

// components
import Header from './components/Header';
import Login from './pages/Login';
import Register from './pages/Register';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Container fluid>
      <BrowserRouter>
        <Header />
        <Container className="p-2">
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Container>
      </BrowserRouter>
    </Container>
  )
}

export default App;
