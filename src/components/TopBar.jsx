import styled from 'styled-components'

const TopBar = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-around;
  height: 8rem;
  width: 80%;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: rgb(64 60 67 / 16%) 0px 2px 5px 1px;
  background-color: #fcfcfc;

  @media (max-width: 815px) {
    height: auto;
    padding: 1rem 1rem 1rem 1rem;
    width: 90%;
  } 
`

export default TopBar
