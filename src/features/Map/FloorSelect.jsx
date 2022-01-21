import React, { useEffect, useState } from 'react'
import { Select } from 'antd'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { getServerApartments } from '../../slices/apartmentsSlice'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  text-align: center;

  & .ant-select {
    width: 15rem;
  }
`

const { Option } = Select

const FloorSelect = () => {
  const dispatch = useDispatch()
  const floorList = useSelector(({ apartments }) => apartments.floorList)
  const [floor, setFloor] = useState(null)

  const handleFloorChange = (floorId) => {
    setFloor(floorId)
    dispatch(getServerApartments({
      floorMin: floorId,
      floorMax: floorId,
    }))
  }

  useEffect(() => {
    if (floorList.length && !floor) {
      handleFloorChange(floorList[0])
    }
  }, [floorList])

  return (
    <Container>
      <h2>Выберите этаж</h2>
      <Select
        value={floor}
        onChange={handleFloorChange}
      >
        {floorList.map((floorName) => (
          <Option
            key={floorName}
            value={floorName}
          >
            {floorName}
          </Option>
        ))}
      </Select>
    </Container>
  )
}

export default FloorSelect
