import { FC, useState } from 'react'
import Resistor from './Resistor'
import { Color, Resistor as ResistorType} from 'common'
import Form from './Form'

const Calculator: FC = () => {
  const [resistor, setResistor] = useState<ResistorType>({
    bandA: 'red',
    bandB: 'brown',
    bandC: 'orange',
    bandD: 'yellow'
  })

  const handleFormChange = (band: keyof ResistorType, color: Color) => {
    setResistor(prev => ({
      ...prev,
      [band]: color
    }))
  }

  return (
    <section>
      <Resistor {...resistor}/>
      <Form resistor={resistor} onChange={handleFormChange}/>
    </section>
  )
}

export default Calculator