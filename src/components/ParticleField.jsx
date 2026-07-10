import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ count = 1400 }) {
  const pointsRef = useRef(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 18
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.getElapsedTime()
    pointsRef.current.rotation.y = t * 0.015
    pointsRef.current.rotation.x = Math.sin(t * 0.05) * 0.05
    // subtle parallax toward the pointer
    pointsRef.current.position.x = state.pointer.x * 0.4
    pointsRef.current.position.y = state.pointer.y * 0.2
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#38BDF8"
        transparent
        opacity={0.75}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function ParticleField() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 55 }} dpr={[1, 1.5]}>
        <Particles />
      </Canvas>
    </div>
  )
}
