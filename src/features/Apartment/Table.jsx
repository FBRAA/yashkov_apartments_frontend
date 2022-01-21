import React from 'react'
import styled from 'styled-components'

const ApsContent = styled.div`
  display: flex;
  width: 54%;
  @media (max-width: 815px) {
    width: 50%;
  }
`

const TableWrapper = styled.ul`
  display: flex;
  flex-flow: column nowrap;
  flex-direction: column;
  width: 100%;
  font-size: 1.25rem;
  @media (max-width: 815px) {
    padding: 1rem;
    margin-bottom: 0rem;
  }

`

const TableDots = styled.div`
  border-bottom: 1px dotted #b8b8b8;
  height: 1rem;
  margin: 0 0.25rem;
  flex: 1;
`

const TableRow = styled.li`
  display: flex;
  flex-flow: row nowrap;
`

const Table = ({ apt }) => (
  <TableWrapper>
    <TableRow>
      <div>Этаж:</div>
      <TableDots />
      <ApsContent>
        {apt.floor} этаж
      </ApsContent>
    </TableRow>
    <TableRow>
      <div>Комнатность:</div>
      <TableDots />
      <ApsContent>
        {apt.rooms}-комн. квартира
      </ApsContent>
    </TableRow>
    <TableRow>
      <div>Общая площадь:</div>
      <TableDots />
      <ApsContent>
        {apt.area_total}м²
      </ApsContent>
    </TableRow>
    <TableRow>
      <div>Площадь кухни:</div>
      <TableDots />
      <ApsContent>
        {apt.area_kitchen}м²
      </ApsContent>
    </TableRow>
    <TableRow>
      <div>Жилая площадь:</div>
      <TableDots />
      <ApsContent>
        {apt.area_live}м²
      </ApsContent>
    </TableRow>
    <TableRow>
      <div>Стоимость:</div>
      <TableDots />
      <ApsContent>
        {apt.price}₽
      </ApsContent>
    </TableRow>
    <TableRow>
      <div>Цена за 1 кв. метр:</div>
      <TableDots />
      <ApsContent>
        {Math.round(apt.price / apt.area_total)} ₽/м²
      </ApsContent>
    </TableRow>
  </TableWrapper>
)

export default Table
