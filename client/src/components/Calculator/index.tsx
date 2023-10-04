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

type State = {
  resistor: ResistorType
  result: number | null
  error: string | null
  fetching: boolean
}

const Calculator: FC = () => {
  const [state, setState] = useState<State>({
    resistor: {
      bandA: 'red',
      bandB: 'brown',
      bandC: 'orange',
      bandD: 'yellow'
    },
    result: null,
    error: null,
    fetching: false
  })

  const handleFormChange = (band: keyof ResistorType, color: Color) => {
    setState(({resistor, ...prev}) => ({
      ...prev,
      resistor: {
        ...resistor,
        [band]: color
      }
    }))
  }

  const handleSubmit = async () => {
    try {
      const searchParams = new URLSearchParams(state.resistor).toString()
      const res = await fetch(`http://localhost:3001/api/ohm?${searchParams}`).then(r => r.json()) as OhmApiResponse | ApiError

      if (typeguard<ApiError>(res, 'error')) {
        setState(prev => ({
          ...prev,
          result: null,
          error: res.error
        }))
        return
      }

      setState(prev => ({
        ...prev,
        result: res.ohms,
        error: null
      }))
    } catch(e) {
      setState(prev => ({
        ...prev,
        error: 'Something went wrong while trying to get the result from the API'
      }))
    }
  }

  return (
    <Section>
      <div className='container'>

        <div className='left'>
          <Resistor {...state.resistor}/>

          <Form
            resistor={state.resistor}
            onChange={handleFormChange}
            onSubmit={handleSubmit}
          />
        </div>

        <div className='right'>
          <Result error={state.error} result={state.result}/>
        </div>        
      </div>
    </Section>
  )
}

export default Calculator