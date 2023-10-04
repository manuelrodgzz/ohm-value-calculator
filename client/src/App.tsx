import Calculator from "./components/Calculator"
import Header from "./components/Header"
import styled from '@emotion/styled'

const Main = styled.main`
  flex: 1;
`

function App() {

  return (
    <>
      <Header />
      <Main>
        <Calculator />
      </Main>
    </>
  )
}

export default App
