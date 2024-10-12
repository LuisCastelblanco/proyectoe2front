import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

export default function OpinionsList() {
  const [opinions, setOpinions] = useState([]);

  useEffect(() => {
    const fetchOpinions = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/predict', {
          text_data: [
            { Textos_espanol: 'La contaminación es un gran problema.' },
            { Textos_espanol: 'La educación de calidad es importante para el desarrollo.' },
          ]
        });
        setOpinions(response.data.opinions.map((opinion, index) => ({
          text: opinion,
          prediction: response.data.predictions[index]
        })));
      } catch (error) {
        console.error('Error fetching opinions:', error);
      }
    };

    fetchOpinions();
  }, []);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Opiniones y Predicciones</Typography>
        <List>
          {opinions.map((opinion, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={opinion.text}
                secondary={`Predicción de ODS: ${opinion.prediction}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
