import React, { useState, useEffect } from 'react';
import { Checkbox, Container, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';


const IncomePage = () => {

  const [income, setIncome] = useState([]);
  const [groupedIncome, setGroupedIncome] = useState([]);
  const [groupBySource, setGroupBySource] = useState(false);

  useEffect(() => {
    const loadIncomeData = async () => {
      const { data } = await axios.get('/api/maaser/getincome');
      const groupedData = await axios.get('/api/maaser/getgroupedincome');
      setIncome(data);
      setGroupedIncome(groupedData.data);
    }
    loadIncomeData();
  }, []);


  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
      <Typography variant="h2" gutterBottom component="div">
        Income History
      </Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={groupBySource}
            onChange={(event) => setGroupBySource(event.target.checked)}
            name="checkedB"
            color="primary"
          />
        }
        label="Group by source"
      />

      {!groupBySource ? (
        <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {income.map((income) => (
                <TableRow key={income.id}>
                  <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                    {income.source.name}
                  </TableCell>
                  <TableCell align="right" sx={{ fontSize: '18px' }}>${income.amount}</TableCell>
                  <TableCell align="right" sx={{ fontSize: '18px' }}>{dayjs(income.dateEarned).format('MM/DD/YYYY')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        groupedIncome.map(({ id, name, sourceEarnings }) => (
          <div key={id} sx={{ width: '80%', maxWidth: '80%' }}>
            <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
              {name}
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                    <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sourceEarnings.map((income) => (
                    <TableRow key={income.id}>
                      <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                        {name}
                      </TableCell>
                      <TableCell align="right" sx={{ fontSize: '18px' }}>${income.amount}</TableCell>
                      <TableCell align="right" sx={{ fontSize: '18px' }}>{dayjs(income.dateEarned).format('MM/DD/YYYY')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))
      )}
    </Container>
  );
}

export default IncomePage;
