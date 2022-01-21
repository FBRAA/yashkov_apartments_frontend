import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';

const ApsBar = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 8rem;
  width: 80%;
  margin: 0.5rem 0;
  border-radius: 0.5rem;
  box-shadow: rgb(64 60 67 / 16%) 0px 2px 5px 1px;
  background-color: white;
  @media (max-width: 815px) {
    width: 90%;
  }
`

const ImageTag = styled.img`
  width: 7rem;
  height: 7rem;
  object-fit: scale-down;
  border-radius: 1rem;
`

const ApsContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  font-size: 1.25rem;
  color: black;
`

const ApsList = ({ apt }) => (
  <ApsBar to={`${apt.id}`}>
    <ApsContent>
      <ImageTag src={apt.layout_image} alt="apt scheme" />
    </ApsContent>
    <ApsContent>
      {apt.floor} этаж
    </ApsContent>
    <ApsContent>
      {apt.rooms}-комн. квартира
    </ApsContent>
    <ApsContent>
      Общая площадь: {apt.area_total}м²
    </ApsContent>
    <ApsContent>
      {apt.price}₽
    </ApsContent>
    <ApsContent>
      {Math.round(apt.price / apt.area_total)} ₽/м²
    </ApsContent>
  </ApsBar>
)

export default ApsList
