import { FC } from 'react'
import styled from '@emotion/styled'

type Props = {
  result?: number
}

const formatNumber = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format

const Div = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .result {
    display: flex;
    .number-container {
      text-align: end;
      min-width: 10rem;
      border: 1px solid black;
      margin-right: .5rem;
      padding: 0 .5rem;
    }
  }
`

const Result: FC<Props> = ({result}) => {

  return (
    <Div>
      <h2>Result</h2>
      <div className='result'>
        <div className='number-container'>
          <p className='number'>{formatNumber(result || 0)}</p>
        </div>
        <p><i>Ohms</i></p>
      </div>
    </Div>
  )
}

export default Result