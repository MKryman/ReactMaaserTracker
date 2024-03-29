import React, { useState, useEffect } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { formatCurrency, formatDate } from '../Format';

const MaaserPage = () => {

  const [maaserPayments, setMaaserPayments] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await axios.get('/api/maaser/getmaaserpayments');
      setMaaserPayments(data);
    }
    loadData();
  }, []);

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
      <Typography variant="h2" gutterBottom component="div">
        Maaser Payments History
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '18px' }}>Recipient</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maaserPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                  {payment.recipient}
                </TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>{formatCurrency(payment.amount)}</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>{formatDate(payment.dateGiven)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default MaaserPage;
