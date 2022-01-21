import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

const StyledLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 0 1rem;
  font-size: larger;
  text-decoration: none;
  color: #292929;
  transition: all 0.5s;

  &.active {
    text-decoration: underline;
  }
  &:hover {
    background-color: #e2e2e2;
  }
`

const RouteLink = ({
  children,
  to,
}) => (
  <StyledLink
    to={to}
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    {children}
  </StyledLink>
)

export default RouteLink
