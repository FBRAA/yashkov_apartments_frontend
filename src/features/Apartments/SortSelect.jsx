import React from 'react'
import { Select } from 'antd';
import styled from 'styled-components'

const { Option } = Select;

const StyledSelect = styled(Select)`
  width: auto;
  margin-left: 0.5rem;
  @media (max-width: 815px) {
    margin-left: 0rem;
    padding: 0rem 0rem 0rem 0rem;
    
  }
`

const SortSelect = ({ onSelectChange }) => (
  <StyledSelect
    defaultValue={0}
    defaultActiveFirstOption
    dropdownMatchSelectWidth={false}
    onChange={onSelectChange}
  >
    <Option value={0}>По умолчанию</Option>
    <Option value={1}>По цене, сначала дешевые</Option>
    <Option value={2}>По цене, сначала дорогие</Option>
    <Option value={3}>По площади, сначала малые</Option>
    <Option value={4}>По площади, сначала большие</Option>
  </StyledSelect>
)

export default SortSelect
