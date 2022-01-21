import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 8rem;
  width: 80%;
  margin-top: 15%;
  font-size: 1.25rem;
  background-color: white;
`

const NoApsWarning = () => (
  <Container>Подходящих квартир не найдено, попробуйте изменить условия поиска.</Container>
)

export default NoApsWarning
