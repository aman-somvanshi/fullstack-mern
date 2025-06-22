import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RevenueCard from './components/RevenueCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* Flex ensured that the divs are aligned right next to each other. Without flex, divs are placed one below the other. */}

      {/* Using normal styles<br/>
      <div style={{display : "flex", justifyContent: "space-between"}}>
        <div style={{backgroundColor: "red"}}>Hi</div>
        <div style={{backgroundColor: "green"}}>Hi</div>
        <div style={{backgroundColor: "blue"}}>Hi</div>
      </div>

      <br/>
      <br/>
      <br/>
      Using tailwind flex <br/>
      <div className='flex justify-between'>
        <div className='bg-red-500'>Hi</div>
        <div className='bg-green-500'>Hi</div>
        <div className='bg-blue-500'>Hi</div>
        <div className='bg-purple-500'>Hi</div>
        <div className='bg-yellow-500'>Hi</div>
        <div className='bg-grey-500'>Hi</div>
      </div>


      <br/>
      <br/>
      <br/>
      Using tailwind grid <br/>
      <div className='grid grid-cols-10'>
        <div className='bg-red-500 col-span-5'>Hi</div>
        <div className='bg-green-500 col-span-3'>Hi</div>
        <div className='bg-blue-500 col-span-2'>Hi</div>
        <div className='bg-blue-500'>Hi</div>
        <div className='bg-blue-500'>Hi</div>
      </div> */}

      {/* <br/>
      <br/>
      <br/>
      <br/>
      Using responsive design
      <div className='bg-red-500 md:bg-blue-500'>Heyyy There</div>


      <br/>
      <br/>
      <br/>
      <br/>
      <div className='grid grid-cols-1 md:grid-cols-3'>
        <div className='bg-red-500'>First Child</div>
        <div className='bg-green-500'>Second Child</div>
        <div className='bg-yellow-500 text-red-500'>Third Child</div>
      </div> */}
      <div className='grid grid-cols-4'>
        <RevenueCard title={"Amount Pending"} amount={"92,312.20"}
      orderCount={13}/>
      </div>
      
    </>
  )
}

export default App
