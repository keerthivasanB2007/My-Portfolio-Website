import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls, Line } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { skills, categories } from '../data/skills'
import SectionHeading from './SectionHeading'
import TechnicalExpertise from './TechnicalExpertise'

// Arrange skills on a few concentric rings by category so related
// technologies naturally cluster together, and draw faint connective
// lines between skills that share a category — this is what stands in
// for the "Tech Stack Universe" as one unified, legible scene.
function usePositions() {
  return useMemo(() => {
    const byCategory = categories.map((cat) => skills.filter((s) => s.category === cat))
    const positions = {}
    byCategory.forEach((group, ringIndex) => {
      const radius = 2.2 + ringIndex * 1.15
      group.forEach((skill, i) => {
        const angle = (i / group.length) * Math.PI * 2 + ringIndex * 0.4
        const y = Math.sin(ringIndex * 1.3 + i) * 0.6
        positions[skill.id] = [Math.cos(angle) * radius, y, Math.sin(angle) * radius]
      })
    })
    return positions
  }, [])
}

function useConstellationLabels() {
  return useMemo(() => {
    return categories.map((cat, ringIndex) => {
      const group = skills.filter((s) => s.category === cat)
      const radius = 2.2 + ringIndex * 1.15
      const angle = ringIndex * 0.4 - Math.PI / Math.max(group.length, 1)
      return {
        category: cat,
        color: group[0]?.color || '#38BDF8',
        position: [Math.cos(angle) * (radius + 0.55), 0.9, Math.sin(angle) * (radius + 0.55)],
      }
    })
  }, [])
}

function Planet({ skill, position, onHover, hovered }) {
  const meshRef = useRef(null)
  const isHovered = hovered === skill.id

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.getElapsedTime()
    meshRef.current.position.y = position[1] + Math.sin(t * 0.6 + position[0]) * 0.15
    const target = isHovered ? 1.6 : 1
    meshRef.current.scale.lerp({ x: target, y: target, z: target }, 0.15)
  })

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); onHover(skill.id) }}
      onPointerOut={(e) => { e.stopPropagation(); onHover(null) }}
    >
      <sphereGeometry args={[0.22, 24, 24]} />
      <meshStandardMaterial
        color={skill.color}
        emissive={skill.color}
        emissiveIntensity={isHovered ? 1.4 : 0.6}
        roughness={0.35}
        metalness={0.2}
      />
    </mesh>
  )
}

function Connections({ positions }) {
  const lines = useMemo(() => {
    const result = []
    categories.forEach((cat) => {
      const group = skills.filter((s) => s.category === cat)
      for (let i = 0; i < group.length; i++) {
        const next = group[(i + 1) % group.length]
        if (group.length > 1) {
          result.push([positions[group[i].id], positions[next.id], group[i].color])
        }
      }
    })
    return result
  }, [positions])

  return (
    <>
      {lines.map(([a, b, color], i) => (
        <Line key={i} points={[a, b]} color={color} transparent opacity={0.15} lineWidth={1} />
      ))}
    </>
  )
}

function ConstellationLabels({ labels }) {
  return (
    <>
      {labels.map((label) => (
        <Html key={label.category} position={label.position} center distanceFactor={8}>
          <div
            className="pointer-events-none whitespace-nowrap rounded-full border px-3 py-1 text-[10px] font-display uppercase tracking-[0.2em] backdrop-blur-md"
            style={{
              color: label.color,
              borderColor: `${label.color}40`,
              background: `${label.color}12`,
            }}
          >
            {label.category}
          </div>
        </Html>
      ))}
    </>
  )
}

function Scene({ positions, labels, hovered, setHovered }) {
  const groupRef = useRef(null)
  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.04
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#38BDF8" />
      <pointLight position={[5, 5, 5]} intensity={0.6} color="#A855F7" />
      <group ref={groupRef}>
        <Connections positions={positions} />
        <ConstellationLabels labels={labels} />
        {skills.map((skill) => (
          <Planet
            key={skill.id}
            skill={skill}
            position={positions[skill.id]}
            hovered={hovered}
            onHover={setHovered}
          />
        ))}
      </group>
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        autoRotate={!hovered}
        autoRotateSpeed={0.6}
        minDistance={4}
        maxDistance={11}
      />
    </>
  )
}

export default function SkillsGalaxy() {
  const positions = usePositions()
  const labels = useConstellationLabels()
  const [hovered, setHovered] = useState(null)
  const hoveredSkill = skills.find((s) => s.id === hovered)

  return (
    <section id="skills" className="relative py-28 px-6 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="Skills Galaxy"
        title="Every skill, a glowing planet"
        subtitle="Drag to rotate, scroll to zoom, and hover a planet to see what it powers."
        center
      />

      <div className="relative mt-14 h-[520px] rounded-3xl glass overflow-hidden">
        <Canvas camera={{ position: [0, 2, 8], fov: 50 }} dpr={[1, 1.5]}>
          <Scene positions={positions} labels={labels} hovered={hovered} setHovered={setHovered} />
        </Canvas>

        <AnimatePresence>
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-5 left-5 right-5 sm:right-auto sm:w-80 glass-strong rounded-2xl p-5 pointer-events-none"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: hoveredSkill.color }} />
                <h3 className="font-display font-semibold text-slate-100">{hoveredSkill.name}</h3>
                {hoveredSkill.learning && (
                  <span className="ml-auto rounded-full border border-highlight/25 bg-highlight/10 px-2 py-0.5 text-[10px] font-medium text-highlight">
                    Learning
                  </span>
                )}
              </div>
              <div className="space-y-2 text-xs text-slate-500">
                <p>Category: <span className="text-slate-300">{hoveredSkill.category}</span></p>
                <p>Current Level: <span className="text-slate-300">{hoveredSkill.currentLevel}</span></p>
                <p>Experience Source: <span className="text-slate-300">{hoveredSkill.experienceSource}</span></p>
              </div>
              <p className="text-sm text-slate-400 mt-3">{hoveredSkill.description}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {!hoveredSkill && (
          <div className="absolute bottom-5 left-5 text-xs text-slate-500 pointer-events-none">
            Hover a planet for details
          </div>
        )}
      </div>

      <TechnicalExpertise />
    </section>
  )
}
