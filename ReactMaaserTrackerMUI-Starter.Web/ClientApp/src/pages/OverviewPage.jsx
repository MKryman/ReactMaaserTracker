import React, {useState, useEffect} from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';
import { formatCurrency, formatDate } from '../Format';

const OverviewPage = () => {

  const [maaser, setMaaser] = useState({
    totalIncome: 0,
    totalMaaserObligation: 0,
    maaserGiven: 0,
    remainingObligation: 0
  });

  useEffect(() => {
    const loadTransactionsOverview = async () => {
      const { data } = await axios.get('/api/maaser/maasercomputer');
      setMaaser(data);
    }
    loadTransactionsOverview();
  }, []);

  const {totalIncome, totalMaaserObligation, maaserGiven, remainingObligation} = maaser;

  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        textAlign: 'center'
      }}
    >
      <Paper elevation={3} sx={{ padding: '120px', borderRadius: '15px' }}>
        <Typography variant="h2" gutterBottom>
          Overview
        </Typography>
        <Box sx={{ marginBottom: '20px' }}>
          <Typography variant="h5" gutterBottom>
            Total Income: {formatCurrency(totalIncome)}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Total Maaser: {formatCurrency(maaserGiven)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" gutterBottom>
            Maaser Obligated: {formatCurrency(totalMaaserObligation)}
          </Typography>
          <Typography variant="h5" gutterBottom>
            Remaining Maaser Obligation: {formatCurrency(remainingObligation > 0 ? remainingObligation : 0)}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default OverviewPage;
