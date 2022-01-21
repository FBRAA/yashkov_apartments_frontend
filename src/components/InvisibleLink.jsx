import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(Link)`
  display: none;
`

const InvisibleLink = ({
  to,
  forwardRef,
}) => (
  <StyledLink
    ref={forwardRef}
    to={to}
    target='_blank'
    rel='noopener noreferrer'
  />
)

export default InvisibleLink
