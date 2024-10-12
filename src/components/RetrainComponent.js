import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';

function RetrainComponent() {
  const [file, setFile] = useState(null);
  const [metrics, setMetrics] = useState(null);
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
    formData.append('training_data', file);

    axios
      .post('http://localhost:8000/api/retrain/', formData)
      .then((response) => {
        setMetrics(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Hubo un error!', error);
        setError(error.response.data.error || 'Error al reentrenar el modelo.');
        setLoading(false);
      });
  };

  return (
    <div>
      <h2 className="text-center mb-4">Reentrenar Modelo</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Sube un archivo CSV con las columnas 'Textos_espanol' y 'sdg'</Form.Label>
          <Form.Control type="file" accept=".csv" onChange={handleFileChange} />
        </Form.Group>
        <Button variant="warning" type="submit" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Reentrenar'}
        </Button>
      </Form>

      {error && (
        <Alert variant="danger" className="mt-4">
          {error}
        </Alert>
      )}

      {metrics && (
        <div className="mt-4">
          <h3>Métricas del Modelo Después del Reentrenamiento:</h3>
          <ul>
            <li>
              <strong>Precisión:</strong> {(metrics.precision * 100).toFixed(2)}%
            </li>
            <li>
              <strong>Recall:</strong> {(metrics.recall * 100).toFixed(2)}%
            </li>
            <li>
              <strong>F1 Score:</strong> {(metrics.f1_score * 100).toFixed(2)}%
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default RetrainComponent;
