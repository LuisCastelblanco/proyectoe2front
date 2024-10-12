import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PredictComponent from './components/PredictComponent';
import RetrainComponent from './components/RetrainComponent';
import { Navbar, Nav, Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">ODS App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/">Predecir</Nav.Link>
              <Nav.Link href="/retrain">Reentrenar</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<PredictComponent />} />
          <Route path="/retrain" element={<RetrainComponent />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
