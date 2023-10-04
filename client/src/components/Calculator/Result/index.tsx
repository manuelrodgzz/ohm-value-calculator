import { FC } from 'react'
import styled from '@emotion/styled'
import Alert from '@mui/material/Alert'

type Props = {
  result?: number | null
  error?: string | null
}

const formatNumber = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format

const Div = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .result {
    display: flex;
    margin-bottom: 1rem;

    .number-container {
      text-align: end;
      min-width: 10rem;
      border: 1px solid black;
      margin-right: .5rem;
      padding: 0 .5rem;
    }
  }
`

const Result: FC<Props> = ({result, error}) => {

  return (
    <Div>
      <h2>Result</h2>
      <div className='result'>
        <div className='number-container'>
          <p className='number'>{formatNumber(result || 0)}</p>
        </div>
        <p><i>Ohms</i></p>
      </div>
      { error && <Alert severity='error'><strong>Error:&nbsp;</strong>{ error }</Alert> }
    </Div>
  )
}

export default Result