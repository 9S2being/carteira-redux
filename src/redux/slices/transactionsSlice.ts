import { createSlice } from '@reduxjs/toolkit';
import { TransactionState, TransactionDTO } from '../../types/transactions';

const initialState: TransactionState = {
  transactions: [],
  totalAmount: 0
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addAmount: (state, action) => {
      state.transactions.push(action.payload);
    },

    removeAmount: (state, action) => {
      state.transactions.push(action.payload)
    }
  }
});

export const selectTotalAmount = (state: { transactions: TransactionState }) => {
  const transactions: TransactionDTO[] = state.transactions.transactions;
  return transactions.reduce((total: number, transaction: TransactionDTO) => {
    if (transaction.type === 'Deposito') {
      return total + transaction.value;
    } else {
      const newTotal = total - transaction.value;
      return newTotal >= 0 ? newTotal : total;
    }
  }, 0);
};


export const { addAmount, removeAmount } = transactionsSlice.actions;
export default transactionsSlice.reducer;


