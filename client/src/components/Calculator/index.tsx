import { FC, useState } from 'react'
import Resistor from './Resistor'
import { Color } from 'common'

const INITIAL_STATE: Color[] = ['none', 'brown', 'orange', 'yellow']

const Calculator: FC = () => {
  const [bands, setBands] = useState<Color[]>(INITIAL_STATE)

  const handleBandClick = (bandIndex: number) => {
    // setBands(bands => bands.map((band, i) => ))
  }

  return (
    <section>
      <Resistor bands={bands} onBandClick={handleBandClick}/>
    </section>
  )
}

export default Calculator