import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import { persistedReducer } from './rootReducer'

export const store = configureStore({
  reducer: persistedReducer,

  })

export const persitedStore = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch