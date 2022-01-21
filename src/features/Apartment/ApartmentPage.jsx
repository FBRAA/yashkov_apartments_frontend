import { useParams } from 'react-router-dom'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getServerApartmentsById } from '../../slices/apartmentsSlice';
import Loader from '../../components/Loader'
import Table from './Table';
import AptImage from './AptImage';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 90%;
  background-color: white;
`
const TopBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  height: 8rem;
  width: 80%;
  margin-bottom: 0.5rem;
  background-color: white;
`
const ApsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  background-color: white;
  box-shadow: rgb(64 60 67 / 16%) 0px 2px 5px 1px;
  border-radius: 0.5rem;

  @media (max-width: 815px) {
    flex-wrap: wrap;
    padding: 1rem;
  }
`
const ApsListHeader = styled.div`
  margin: 0 2rem;
  font-size: 2rem;
`

const ApartmentPage = () => {
  const { apartmentId } = useParams()
  const dispatch = useDispatch()
  const apartmentById = useSelector((store) => store.apartments.apartmentById)
  const isLoadingById = useSelector((store) => store.apartments.isLoadingById)

  useEffect(() => {
    dispatch(getServerApartmentsById(apartmentId))
  }, [apartmentId])

  return (
    <PageWrapper>
      { isLoadingById && <Loader />}
      <TopBar>
        <ApsListHeader> Информация о квартире </ApsListHeader>
      </TopBar>
      {apartmentById && apartmentById.map((apt) => (
        <ApsWrapper>
          <AptImage apt={apt} />
          <Table apt={apt} />
        </ApsWrapper>
      ))}
    </PageWrapper>
  )
}

export default ApartmentPage
