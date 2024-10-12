import React, { useState } from 'react';
import { Button, Card, CardContent, Typography, TextField } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

export default function RetrainSection() {
  const [file, setFile] = useState(null);
  const [metrics, setMetrics] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
  
    const formData = new FormData();
    formData.append('training_data', file);
  
    try {
      const response = await axios.post('http://localhost:8000/api/retrain', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMetrics(response.data);
    } catch (error) {
      console.error('Error during retraining:', error);
    }
  };
  

  const data = {
    labels: ['Precision', 'Recall', 'F1 Score'],
    datasets: [
      {
        label: 'Metrics',
        data: metrics ? [metrics.precision, metrics.recall, metrics.f1_score] : [0, 0, 0],
        backgroundColor: ['#3f51b5', '#ff9800', '#f44336'],
      },
    ],
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Reentrenar Modelo</Typography>
        <input type="file" onChange={handleFileChange} />
        <Button variant="contained" onClick={handleUpload} disabled={!file}>
          Subir y Reentrenar
        </Button>
        {metrics && (
          <div style={{ maxWidth: '600px', marginTop: '20px' }}>
            <Bar data={data} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
