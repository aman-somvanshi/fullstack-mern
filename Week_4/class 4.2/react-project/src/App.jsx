import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0) // This is something that react is going to aggresively watch that if this changes, DOM should be updated

  return (
    <div>
        <button onClick={() => setCount((count) => count + 1)}>
          {/* Math.random() generates a random value between 0 and 1 */}
          count is {count}
        </button>
    </div>
  )
}

export default App
