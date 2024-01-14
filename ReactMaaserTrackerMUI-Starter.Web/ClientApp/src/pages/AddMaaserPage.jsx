import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import axios from 'axios';

const AddMaaserPage =() => {

    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const nav = useNavigate();

    const doAMitzvahAndGiveMaaser = async() => {
        await axios.post('/api/maaser/givemaaser', {amount, recipient, dateGiven: selectedDate});
        nav('/maaser');
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Maaser
            </Typography>
            <TextField label="Recipient" value={recipient} onChange={e => setRecipient(e.target.value)} variant="outlined" fullWidth margin="normal" />
            <TextField label="Amount" value={amount} onChange={e => setAmount(e.target.value)} variant="outlined" fullWidth margin="normal" />
            <TextField
                label="Date"
                type="date"
                value={dayjs(selectedDate).format('YYYY-MM-DD')}
                onChange={e => setSelectedDate(e.target.value)}
            />
            <Button variant="contained" sx={{marginTop: 2}} onClick={doAMitzvahAndGiveMaaser} color="primary">Add Maaser</Button>
        </Container>
    );
}

export default AddMaaserPage;
