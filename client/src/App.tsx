import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import socketIO, {io, Socket, SocketOptions} from "socket.io-client"

// const socket: Socket<SocketOptions> = socketIO.connect("http://localhost:8000")
function App() {
  const [count, setCount] = useState(0)

  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path='/'></Route>
        <Route></Route>
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
