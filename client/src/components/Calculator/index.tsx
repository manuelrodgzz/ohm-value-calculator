import { FC, useState } from 'react'
import Resistor from './Resistor'
import { ApiError, Color, OhmApiResponse, Resistor as ResistorType, typeguard } from 'common'
import Form from './Form'
import styled from '@emotion/styled'
import Result from './Result'

const Section = styled.section`
  height: 100%;

  .container {
    display: flex;
    flex-direction: column;
    height: 100%;

    .left, .right {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  @media only screen and (min-width: 1025px) {
    .container {
      flex-direction: row;

      .left, .right {
        width: 50%;
      }
    }
  }
`

const Calculator: FC = () => {
  const [resistor, setResistor] = useState<ResistorType>({
    bandA: 'red',
    bandB: 'brown',
    bandC: 'orange',
    bandD: 'yellow'
  })

  const [result, setResult] = useState<number>()

  const handleFormChange = (band: keyof ResistorType, color: Color) => {
    setResistor(prev => ({
      ...prev,
      [band]: color
    }))
  }

  const handleSubmit = async () => {
    try {
      const searchParams = new URLSearchParams(resistor).toString()
      const res = await fetch(`http://localhost:3001/api/ohm?${searchParams}`).then(r => r.json()) as OhmApiResponse | ApiError
      
      if (typeguard<ApiError>(res, 'error')) {
        return
      }

      setResult(res.ohms)
    } catch(e) {
      console.error('Something went wrong while trying to get the result from the API')
    }
  }

  return (
    <Section>
      <div className='container'>

        <div className='left'>
          <Resistor {...resistor}/>

          <Form
            resistor={resistor}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
          />
        </div>

        <div className='right'>
          <Result result={result}/>
        </div>        
      </div>
    </Section>
  )
}

export default Calculator