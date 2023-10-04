import { FC } from 'react'
import styled from '@emotion/styled'

const StyledHeader = styled.header`
  height: 5rem;
  background-color: #95cdff;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Header: FC = () => {
  return (
    <StyledHeader>
      <h1>Ohm Value Calculator</h1>
    </StyledHeader>
  )
}

export default Header