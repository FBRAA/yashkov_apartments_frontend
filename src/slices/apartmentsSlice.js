/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL } from '../utils/constants';
import fetchData from '../functions/fetchData'
import formPath from '../utils/formPath';

export const getServerApartments = createAsyncThunk(
  'apartments/getServerApartments',
  async (props) => {
    const queryURL = formPath(BASE_URL, props)
    const apartmentsResponse = await fetchData(queryURL)
    return apartmentsResponse
  },
)

export const getServerApartmentsById = createAsyncThunk(
  'apartments/getServerApartmentsById',
  async (id) => {
    const apartmentsResponse = await fetchData(
      `${BASE_URL}${id}`,
    )
    return apartmentsResponse
  },
)

export const getFloors = createAsyncThunk(
  'apartments/getFloors',
  async () => {
    const floorsResponse = await fetchData(
      `${BASE_URL}floorList`,
    )
    return floorsResponse
  },
)

export const apartmentsSlice = createSlice({
  name: 'apartments',
  initialState: {
    floorList: [],
    isLoadingFloors: false,
    apartmentsData: [],
    isLoading: false,
    qtyOfAps: 0,
    isLoadingById: false,
    apartmentById: [],
  },
  extraReducers: {
    [getFloors.pending]: (state) => {
      state.isLoadingFloors = true
    },
    [getFloors.fulfilled]: (state, { payload }) => {
      state.isLoadingFloors = false
      state.floorList = payload[0].floorList
    },
    [getFloors.rejected]: (state) => {
      state.isLoadingFloors = false
    },
    // Серверный запрос
    [getServerApartments.pending]: (state) => {
      state.isLoading = true
    },
    [getServerApartments.fulfilled]: (state, action) => {
      state.isLoading = false
      state.apartmentsData = action.payload.query
      state.qtyOfAps = action.payload.qtyOfAps
    },
    [getServerApartments.rejected]: (state) => {
      state.isLoading = false
    },
    // Серверный запрос по айди
    [getServerApartmentsById.pending]: (state) => {
      state.isLoadingById = true
    },
    [getServerApartmentsById.fulfilled]: (state, action) => {
      state.isLoadingById = false
      state.apartmentById = action.payload
    },
    [getServerApartmentsById.rejected]: (state) => {
      state.isLoadingById = false
    },
  },
})

export default apartmentsSlice.reducer
