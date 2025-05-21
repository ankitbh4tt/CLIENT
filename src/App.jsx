import { useState } from 'react'
import './App.css'
import Todos from './components/Todos'
import { Route, Routes } from 'react-router-dom'
import ExpensePage from './pages/ExpensePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-red-200 min-h-screen'>
      {/* <Todos/> */}
      <Routes>
        <Route path='/todos' element={<Todos/>} />
        <Route path='/expense' element={<ExpensePage/>}>

        </Route>
        <Route path='*' element={<ExpensePage/>}/>
      </Routes>
    </div>
  )
}

export default App
