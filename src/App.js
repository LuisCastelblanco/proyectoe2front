import React from 'react';
import { Container, Grid } from '@mui/material';
import OpinionsList from './components/OpinionsList';
import RetrainSection from './components/RetrainSection';

export default function App() {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <OpinionsList />
        </Grid>
        <Grid item xs={12} md={6}>
          <RetrainSection />
        </Grid>
      </Grid>
    </Container>
  );
}
