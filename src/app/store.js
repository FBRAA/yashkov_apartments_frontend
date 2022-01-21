/* eslint-disable import/prefer-default-export */
import { configureStore } from '@reduxjs/toolkit';
import apartmentsReducer from '../slices/apartmentsSlice';

const store = configureStore({
  reducer: {
    apartments: apartmentsReducer,
  },
})

export default store
