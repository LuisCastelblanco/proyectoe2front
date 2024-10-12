import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Table, Spinner, Alert } from 'react-bootstrap';

function PredictComponent() {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) {
      alert('Por favor, sube un archivo CSV.');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('text_data', file);

    axios
      .post('http://localhost:8000/api/predict/', formData)
      .then((response) => {
        setResults(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Hubo un error!', error);
        setError(error.response.data.error || 'Error al realizar la predicción.');
        setLoading(false);
      });
  };

  return (
    <div>
      <h2 className="text-center mb-4">Predicción de ODS</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Sube un archivo CSV con la columna 'Textos_espanol'</Form.Label>
          <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="success" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Predecir'}
        </Button>
      </Form>

      {error && (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      )}

      {results.length > 0 && (
        <div className="mt-4">
          <h3>Resultados:</h3>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Opinión</th>
                <th>ODS Predicho</th>
                <th>Probabilidad ODS 3</th>
                <th>Probabilidad ODS 4</th>
                <th>Probabilidad ODS 5</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, idx) => (
                <tr key={idx}>
                  <td>{result.opinion}</td>
                  <td>{result.predicted_sdg}</td>
                  <td>
                    {result.sdg3_prob !== null ? (result.sdg3_prob * 100).toFixed(2) + '%' : 'N/A'}
                  </td>
                  <td>
                    {result.sdg4_prob !== null ? (result.sdg4_prob * 100).toFixed(2) + '%' : 'N/A'}
                  </td>
                  <td>
                    {result.sdg5_prob !== null ? (result.sdg5_prob * 100).toFixed(2) + '%' : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default PredictComponent;
