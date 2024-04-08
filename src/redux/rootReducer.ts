import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

import transactionReducer from './slices/transactionsSlice';
import storage from 'redux-persist/es/storage';

const rootReducer = combineReducers({
  transactions: transactionReducer
});

export const persistedReducer = persistReducer(
  {
    key: "account",
    storage
  },
  rootReducer
)

export default rootReducer;


