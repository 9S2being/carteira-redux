import { useState } from 'react';
import { Grid, Paper, Typography, Container, Dialog, IconButton, DialogContent, DialogActions, Button } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { Header } from '../header/Header';

export function TransactionsLog() {
  const transactions = useSelector((state: RootState) => state.transactions.transactions);
  const [selectedTransaction, setSelectedTransaction] = useState<{ description: string } | null>(null);

  const handleTransactionClick = (description: string) => {
    setSelectedTransaction({ description });
  };

  const handleCloseModal = () => {
    setSelectedTransaction(null);
  };

  return (
    <Container>
      <Header />
      <Grid container spacing={3} justifyContent="center" marginTop={2}>
        <Grid item xs={12} sm={6} md={10}>
          <Typography variant="h4" gutterBottom align='center' style={{ marginTop: '20px', marginBottom: '50px', fontFamily: 'Sansrift' }}>
            Histórico de Transações
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '25px' }}>
              <Typography gutterBottom align='center' variant='h6'>
                <strong>Tipo:</strong>
              </Typography>
              <Typography gutterBottom align='center' variant='h6' style={{ marginLeft: '140px' }}>
                <strong>Valor:</strong>
              </Typography>
              <Typography gutterBottom align='center' variant='h6' style={{ marginLeft: '140px' }}>
                <strong>Data/Hora:</strong>
              </Typography>
            </div>
          </div>
        </Grid>
        {transactions.map((transaction, index) => (
          <Grid key={index} item xs={12} sm={6} md={10}>
            <Paper style={{ padding: 5, borderRadius: '20px', border: '2px solid black', width: '100%', backgroundColor: '#d8b9d8', color: 'black' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', alignItems: 'center' }}>
                  <Typography variant="body1" style={{ fontFamily: 'Arial', marginLeft: '100px' }}>
                    {transaction.type}
                  </Typography>
                  <Typography variant="body1" style={{ fontFamily: 'Arial', marginLeft: '125px' }}>
                    R${transaction.value}
                  </Typography>
                  <Typography variant="body1" style={{ fontFamily: 'Arial', marginLeft: '135px' }}>
                    {new Date(transaction.data).toLocaleString()}
                  </Typography>
                  <IconButton onClick={() => handleTransactionClick(transaction.description)} style={{color: 'black', marginLeft: '50px'}}>
                    <InfoOutlined />
                  </IconButton>
                </div>
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Dialog open={selectedTransaction !== null} onClose={handleCloseModal}>
        <DialogContent>
          <Typography>{selectedTransaction?.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">Fechar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
