import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddIncomePage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [sources, setSources] = useState([]);
    const [selectedSource, setSelectedSource] = useState(null);
    const [amountEarned, setAmountEarned] = useState(0);
    const navigate = useNavigate();


    useEffect(() => {
        const loadSources = async () => {
            const { data } = await axios.get('/api/maaser/getincomesources');
            setSources(data);
        }
        loadSources();
    }, []);

    const addIncome = async () => {
        await axios.post('/api/maaser/addincome', { sourceId: selectedSource.id, amount: amountEarned, dateEarned: selectedDate });
        navigate('/income');
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Income
            </Typography>
            <Autocomplete
                options={sources}
                getOptionLabel={(option) => option.name}
                onChange={(e, source) => setSelectedSource(source)}
                value={selectedSource}
                fullWidth
                margin="normal"
                renderInput={(params) => <TextField {...params} label="Source" variant="outlined" />}
            />
            <TextField
                label="Amount"
                variant="outlined"
                type="number"
                value={amountEarned}
                onChange={(e) => setAmountEarned(e.target.value)}
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Date"
                type="date"
                value={dayjs(selectedDate).format('YYYY-MM-DD')}
                onChange={e => setSelectedDate(e.target.value)}
            />
            <Button variant="contained" sx={{ marginTop: 2 }} onClick={addIncome} color="primary">Add Income</Button>
        </Container>
    );
}

export default AddIncomePage;
