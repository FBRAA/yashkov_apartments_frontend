import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Loader from '../../components/Loader'
import useTimeout from '../../hooks/useTimeout'
import { getFloors } from '../../slices/apartmentsSlice'
import DarkOverlayContext from './DarkOverlayContext'
import FloorSelect from './FloorSelect'
import Map from './Map'

const Container = styled.div`
  min-height: 100%;
  background-color: #FFFFFF;
  transition: filter 0.5s;

  filter: ${({ isDark }) => (isDark ? 'brightness(90%)' : 'none')};
  cursor: ${({ isPointer }) => (isPointer ? 'pointer' : 'auto')};
`

const MapPage = React.memo(() => {
  const dispatch = useDispatch()
  const isLoadingFloors = useSelector(({ apartments }) => apartments.isLoadingFloors)
  const isLoadingApartments = useSelector(({ apartments }) => apartments.isLoading)
  const apartmentList = useSelector(({ apartments }) => apartments.apartmentsData)

  useEffect(() => {
    dispatch(getFloors())
  }, [])

  if (isLoadingFloors) return <Loader />
  return (
    <>
      <FloorSelect />
      {(!isLoadingApartments && !!apartmentList.length)
        ? <Map apartments={apartmentList} />
        : <Loader />}
    </>
  )
})

const MapPageWrapper = () => {
  const [isDark, setIsDark] = useState(false)
  const [isPointer, setIsPointer] = useState(false)

  const { timeout, clear } = useTimeout()

  // Таймаут, чтобы не было дискотеки при перемещении
  // мышки с квартиры на квартиру.
  const setIsDarkOverlay = useCallback((boolean) => {
    if (!boolean) {
      timeout(() => setIsDark(false), 300)
      setIsPointer(false)
    } else {
      clear()
      setIsDark(true)
      setIsPointer(true)
    }
  }, [])

  return (
    <DarkOverlayContext.Provider value={setIsDarkOverlay}>
      <Container
        isDark={isDark}
        isPointer={isPointer}
      >
        <MapPage />
      </Container>
    </DarkOverlayContext.Provider>
  )
}

export default MapPageWrapper
