import React from 'react'
import styled from 'styled-components'

const ImageTag = styled.img`
  width: 25rem;
  height: 25rem;
  object-fit: scale-down;
  padding: 1rem;
  border-radius: 3rem;
`
const ApsContent = styled.div`
  display: flex;
  width: 54%;
  @media (max-width: 815px) {
    width: auto;
  }
`

const AptImage = ({ apt }) => (
  <ApsContent>
    <ImageTag src={apt.layout_image} alt="apt scheme" />
  </ApsContent>
)

export default AptImage
