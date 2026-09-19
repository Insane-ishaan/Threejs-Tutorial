import { useState } from 'react'
import { Canvas } from "@react-three/fiber"
import './App.css';
import Dog from './Components/Dog.jsx'

function App() {

  return (
    <Canvas>
      <Dog />
    </Canvas>
  )
}

export default App
