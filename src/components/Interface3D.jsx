"use client"

import { useRef, useState, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Text, Float, Sphere, Torus, Box } from "@react-three/drei"
import { Vector3 } from "three"


export function Interface3D({ activeSection, setActiveSection }) {
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t / 4) / 4
      groupRef.current.position.y = Math.sin(t / 2) / 4
    }
  })

  return (
    <group ref={groupRef}>
      {/* Central Solana Sphere */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
          <meshStandardMaterial
            color="#9945FF"
            emissive="#9945FF"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </Sphere>
        <Text position={[0, 0, 1.6]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
          SOLANA
        </Text>
      </Float>

      {/* Orbiting Features */}
      {FEATURES.map((feature, index) => (
        <FeatureOrbit key={index} {...feature} active={activeSection === feature.section} setActiveSection={setActiveSection} />
      ))}
    </group>
  )
}

// 📌 Features Data
const FEATURES = [
  { position: [4, 0, 0], name: "Airdrop", color: "#14F195", shape: "box", section: "dashboard" },
  { position: [-2, 3, 0], name: "Balance", color: "#00C2FF", shape: "sphere", section: "dashboard" },
  { position: [-2, -3, 0], name: "Send SOL", color: "#FF9C00", shape: "torus", section: "dashboard" },
  { position: [-4, 0, 0], name: "Sign", color: "#FF3B9A", shape: "box", section: "dashboard" },
  { position: [2, 3, 0], name: "Token", color: "#FFFFFF", shape: "torus", section: "tokenLaunchpad" },
]

// 🎨 Feature Component
function FeatureOrbit({ position, name, color, shape, active, setActiveSection }) {
  const meshRef = useRef()
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto"
    return () => (document.body.style.cursor = "auto")
  }, [hovered])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t / 2) / 2
      meshRef.current.rotation.y = Math.sin(t / 4) / 2
      meshRef.current.scale.lerp(new Vector3(hovered ? 1.3 : 1, hovered ? 1.3 : 1, hovered ? 1.3 : 1), 0.1)
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={() => setActiveSection(name)}
        >
          {shape === "box" && <StyledBox color={color} active={active} />}
          {shape === "sphere" && <StyledSphere color={color} active={active} />}
          {shape === "torus" && <StyledTorus color={color} active={active} />}
        </mesh>

        <Text position={[0, -1, 0]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">
          {name}
        </Text>
      </group>
    </Float>
  )
}

// 🔷 Styled Components for Clean Code
const StyledBox = ({ color, active }) => (
  <Box args={[0.8, 0.8, 0.8]}>
    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 1 : 0.5} metalness={0.9} roughness={0.2} />
  </Box>
)

const StyledSphere = ({ color, active }) => (
  <Sphere args={[0.5, 32, 32]}>
    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 1 : 0.5} metalness={0.9} roughness={0.2} />
  </Sphere>
)

const StyledTorus = ({ color, active }) => (
  <Torus args={[0.4, 0.2, 16, 32]}>
    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={active ? 1 : 0.5} metalness={0.9} roughness={0.2} />
  </Torus>
)
