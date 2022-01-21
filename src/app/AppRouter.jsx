/* eslint-disable arrow-body-style */
import React from 'react'
import styled from 'styled-components'
import {
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import RouteLink from '../components/RouteLink'
import Apartments from '../features/Apartments/Apartments'
import MapPage from '../features/Map/MapPage'
import ApartmentPage from '../features/Apartment/ApartmentPage'

const Page = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
`

const NavBar = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  width: 100%;
  background-color: white;

  & a:hover {
    color: black;
  }
`

const Content = styled.main`
  padding-top: 4rem;
  background-color: #FFFFFF;
`

const AppRouter = () => {
  return (
    <Page>
      <NavBar>
        <RouteLink to='apartments'>КВАРТИРЫ</RouteLink>
        <RouteLink to='map'>КАРТА</RouteLink>
      </NavBar>
      <Content>
        <Routes>
          <Route path='apartments/:apartmentId' element={<ApartmentPage />} />
          <Route path='apartments' element={<Apartments />} />
          <Route path='map' element={<MapPage />} />
          <Route exact path='*' element={<Navigate to='apartments' />} />
        </Routes>
      </Content>
    </Page>
  )
}

export default AppRouter
