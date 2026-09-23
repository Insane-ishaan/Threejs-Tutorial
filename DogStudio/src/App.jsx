import { useState } from 'react'
import { Canvas } from "@react-three/fiber"
import './App.css';
import Dog from './Components/Dog.jsx'

function App() {

  return (
    <main >
      <div className="canvas-container">
        <Canvas style={{ position: "fixed", height: "100vh", width: "100vw", backgroundImage: "url(/background-l.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundAttachment: "fixed" }}>
          <Dog />
        </Canvas>
      </div>

      <section className="section section1"></section>
      <section className="section section2"></section>
      <section className="section section3"></section>
    </main>
  )
}

export default App
