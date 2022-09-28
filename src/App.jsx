import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import UserInput from './Components/UserInput'
import Pokedex from './Components/Pokedex'
import { HashRouter, Routes, Route } from 'react-router-dom'
import PokeDetails from './Components/PokeDetails'
import ProtectedRoutes from './Components/protectedRoutes'
function App() {
  const [count, setCount] = useState(0)

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<UserInput />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/Pokedex' element={<Pokedex />} />
            <Route path='/PokeDetails/:id' element={<PokeDetails />} />
          </Route >
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App
