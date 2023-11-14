import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageSourcesPage = () => {
  const [sources, setSources] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState('');
  const [editingSource, setEditingSource] = useState(null);

  useEffect(() => {
    const loadSources = async () => {
      const { data } = await axios.get('/api/maaser/getincomesources');
      setSources(data);
    }
    loadSources();
  }, []);

  const handleOpen = (source = '') => {
    setOpen(true);
    setSelectedSource(source);
    setEditingSource(source);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSource('');
    setEditingSource(null);
  };

  const handleAddEdit = async () => {
    if (editingSource) {
      const source = {
        name: selectedSource.name,
        sourceEarnings: null
      }
      await axios.post('/api/maaser/editsource', { source });
      setSources(sources.map(source => source === editingSource ? selectedSource : source));
    } else {
      const name = selectedSource;
      await axios.post('/api/maaser/addsource', { name });
      setSources([...sources, selectedSource]);
    }
    handleClose();
  };

  const handleDelete = async (sourceToDelete) => {
    await axios.post('/api/maaser/deletesource', sourceToDelete);
    setSources(sources.filter(source => source !== sourceToDelete));
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <Button onClick={() => handleOpen()} variant="contained" color="primary" sx={{ minWidth: '200px' }}>
          Add Source
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
              <TableCell align="right" sx={{ fontSize: '18px' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sources.map((source) => (
              <TableRow key={source.id}>
                <TableCell sx={{ fontSize: '18px' }}>{source.name}</TableCell>
                <TableCell align="right" sx={{ fontSize: '18px' }}>
                  <Button color="primary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleOpen(source)}>Edit</Button>
                  <Button color="secondary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleDelete(source)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{editingSource ? 'Edit Source' : 'Add Source'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Source" type="text" fullWidth value={selectedSource} onChange={(e) => setSelectedSource(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddEdit} color="primary">
            {editingSource ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ManageSourcesPage;
