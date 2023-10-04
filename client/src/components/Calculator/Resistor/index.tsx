import { FC } from 'react'
import { Color, Resistor as ResistorType } from 'common'
import styled from '@emotion/styled'

type BandProps = {
  color?: Color
  letter: string
}

type ResistorProps = ResistorType

const ResistorWrapper = styled.div`
  display: flex;
  justify-content: center;

  .resistor {
    border: 1px solid black;
    display: flex;
    height: 10rem;
    width: 30rem;
    border-top-left-radius: 12rem;
    border-bottom-left-radius: 12rem;
    border-top-right-radius: 12rem;
    border-bottom-right-radius: 12rem;
    justify-content: space-evenly;
    background-color: rgb(255, 222, 172);
    overflow: hidden;

    .band {
      border: 1px solid black;
      border-top: none;
      border-bottom: none;
      width: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
    }
  }
`

const Band: FC<BandProps> = ({color = 'none', letter}) => (
  <div
    style={{backgroundColor: color === 'none' ? 'transparent' : color}}
    className='band'
  >
    <span>{letter}</span>
  </div>
)

const Resistor: FC<ResistorProps> = ({ bandA, bandB, bandC, bandD }) => {

  return (
    <ResistorWrapper>
      <div className='resistor'>
        <Band color={ bandA } letter='A'/>
        <Band color={ bandB } letter='B'/>
        <Band color={ bandC } letter='C'/>
        <Band color={ bandD } letter='D'/>
      </div>
    </ResistorWrapper>
  )
}

export default Resistor