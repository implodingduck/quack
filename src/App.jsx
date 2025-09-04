import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Stackandqueue from './stackandqueue'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Stackandqueue />
      <p>Words brought to you by <a href="https://www.datamuse.com/api/">Datamuse</a></p>
    </>
  )
}

export default App
