import { FormEvent, useState } from 'react';
import { Grid, Paper, TextField, Button, Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux';
import { addAmount, removeAmount, selectTotalAmount } from '../../redux/slices/transactionsSlice';
import { Header } from '../header/Header';

export function TransactionForm() {
  const dispatch = useAppDispatch();
  const totalAmount: number = useAppSelector(selectTotalAmount);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleTransaction = (type: string) => {
    setTransactionType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const confirmTransaction = () => {
    const transactionValue = parseFloat(value);

    if (transactionType === 'deposit') {
      const transaction = {
        type: 'Deposito',
        value: transactionValue,
        data: new Date().toLocaleString(),
        description: description,
      };
      dispatch(addAmount(transaction));
    } else {
      if (transactionValue > totalAmount) {
        alert("Não é possível sacar um valor maior do que o total depositado.");
        return;
      }
      const transaction = {
        type: 'Saque',
        value: transactionValue,
        data: new Date().toLocaleString(),
        description: description,
      };
      dispatch(removeAmount(transaction));
    }

    setValue('');
    setDescription('');
    setIsModalOpen(false);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
  };

  return (
    <Container>
      <Header />
      <Grid container justifyContent="center" style={{ marginTop: '100px' }} alignItems="center">
        <Grid item xs={6}>
          <Paper style={{ padding: 30 }}>
            <Typography variant="h4" gutterBottom align='center' fontFamily='Sansrift'>
              Happy Wallet
            </Typography>
            <form onSubmit={handleForm}>
              <Grid container justifyContent="center">
                <TextField
                  label="Value"
                  type="number"
                  value={value}
                  onChange={handleValueChange}
                  style={{ width: '300px' }}
                  margin="normal"
                  variant="filled"
                  InputProps={{
                    sx: {
                      borderBottom: '1px solid',
                      borderColor: 'primary.main',
                    },
                  }}
                  inputProps={{
                    pattern: "[0-9]*",
                    inputMode: "numeric",
                  }}
                />
              </Grid>
              <Grid container spacing={6} justifyContent='center'>
                <Grid item>
                  <Button variant="contained" color="primary" style={{ backgroundColor: 'purple', color: 'white', marginTop: '20px' }} onClick={() => handleTransaction('deposit')}>
                    Depositar
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" style={{ backgroundColor: 'purple', color: 'white', marginTop: '20px' }} onClick={() => handleTransaction('withdraw')}>
                    Sacar
                  </Button>
                </Grid>
              </Grid>
              <Dialog open={isModalOpen} onClose={handleCloseModal}>
                <DialogTitle>Adicionar Descrição</DialogTitle>
                <DialogContent>
                  <TextField
                    label="Descrição"
                    type="text"
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                    fullWidth
                    margin="normal"
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseModal} color="primary">
                    Voltar
                  </Button>
                  <Button onClick={confirmTransaction} color="primary">
                    {transactionType === 'deposit' ? 'Confirmar Depósito' : 'Confirmar Saque'}
                  </Button>
                </DialogActions>
              </Dialog>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
