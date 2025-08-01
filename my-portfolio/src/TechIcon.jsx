// src/TechIcon.jsx
import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Color } from 'three'

function SpinningKnot() {
  const mesh = useRef()
  const col1 = useRef(new Color())
  const col2 = useRef(new Color())

  // Grab CSS vars and lighten them on mount
  useEffect(() => {
    const styles = getComputedStyle(document.documentElement)
    const p = styles.getPropertyValue('--primary-color').trim() || '#7bdaf5ff'
    const a = styles.getPropertyValue('--accent-color').trim()  || '#f583bcff'
    col1.current.set(p)
    col2.current.set(a)
    const white = new Color('#ffffff')
    col1.current.lerp(white, 0.2)
    col2.current.lerp(white, 0.2)
  }, [])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    const t = ((Math.sin(time * 1) + 1) / 2) * 0.6 + 0.2
    mesh.current.material.color.lerpColors(col1.current, col2.current, t)

    mesh.current.rotation.x = time * 0.5
    mesh.current.rotation.y = time * 0.3
    mesh.current.position.y = Math.sin(time * 2) * 0.2
  })

  return (
    <mesh ref={mesh} scale={[0.8, 0.8, 0.8]}>
      <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />
      <meshStandardMaterial metalness={0.7} roughness={0.2} />
    </mesh>
  )
}

export default function TechIcon() {
  return (
    <Canvas
      style={{ width: 200, height: 200, overflow: 'visible' }}
      camera={{ position: [0, 0, 6], fov: 35 }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <SpinningKnot />
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  )
}
