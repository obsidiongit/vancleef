'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  Float,
  Instance,
  Instances,
  Lightformer,
  OrbitControls,
  Sparkles,
} from '@react-three/drei'
import * as THREE from 'three'

/* ----------------------------------------------------------------
   The actual prize: a Sweet Alhambra-style bracelet — ONE carnelian
   red clover charm inlaid into a rose gold quatrefoil with a beaded
   rim, hanging on a delicate rose gold cable chain. Red inlay on
   the front face only; the back of the charm stays rose gold.
   ---------------------------------------------------------------- */

const RING_R = 2.2
const CHARM_ANGLE = -Math.PI / 2 /* charm sits at the bottom, like the product shot */
const CHARM_SCALE = 0.68
/* Angular half-width the charm occupies on the ring (keeps chain clear) */
const CHARM_HALF = 0.42

const ROSE_GOLD = {
  color: '#f0b49b',
  metalness: 1,
  roughness: 0.16,
  envMapIntensity: 1.5,
} as const

/**
 * Outline of a quatrefoil: the union of four circles (radius lobeR)
 * centered `dist` from the origin on each axis, sampled as the max
 * ray–circle intersection per angle. Origin is inside every lobe
 * circle, so every ray hits at least one.
 */
function quatrefoilOutline(
  samples = 220,
  lobeR = 0.62,
  dist = 0.52,
): THREE.Vector2[] {
  const centers: Array<[number, number]> = [
    [dist, 0],
    [0, dist],
    [-dist, 0],
    [0, -dist],
  ]
  const pts: THREE.Vector2[] = []
  for (let i = 0; i < samples; i++) {
    const t = (i / samples) * Math.PI * 2
    const ux = Math.cos(t)
    const uy = Math.sin(t)
    let best = 0
    for (const [cx, cy] of centers) {
      const proj = ux * cx + uy * cy
      const disc = proj * proj - (cx * cx + cy * cy) + lobeR * lobeR
      if (disc >= 0) best = Math.max(best, proj + Math.sqrt(disc))
    }
    pts.push(new THREE.Vector2(ux * best, uy * best))
  }
  return pts
}

function Charm({
  geometry,
  beads,
}: {
  geometry: THREE.ExtrudeGeometry
  beads: THREE.Vector2[]
}) {
  return (
    <group
      position={[
        Math.cos(CHARM_ANGLE) * RING_R,
        Math.sin(CHARM_ANGLE) * RING_R,
        0,
      ]}
      rotation={[0, 0, CHARM_ANGLE]}
      scale={CHARM_SCALE}
    >
      {/* rose gold quatrefoil body (this is all you see from the back) */}
      <mesh geometry={geometry}>
        <meshStandardMaterial {...ROSE_GOLD} />
      </mesh>

      {/* carnelian inlay — slightly smaller, seated into the FRONT face
          so it sits just proud of the gold, inside the beaded rim */}
      <mesh geometry={geometry} position={[0, 0, 0.07]} scale={[0.86, 0.86, 0.62]}>
        <meshPhysicalMaterial
          color="#b73527"
          roughness={0.1}
          metalness={0}
          clearcoat={1}
          clearcoatRoughness={0.06}
          sheen={0.4}
          sheenColor="#ff6a4d"
        />
      </mesh>

      {/* beaded rose gold rim */}
      <Instances limit={beads.length}>
        <sphereGeometry args={[0.06, 10, 10]} />
        <meshStandardMaterial {...ROSE_GOLD} />
        {beads.map((p, i) => (
          <Instance key={i} position={[p.x * 1.04, p.y * 1.04, 0]} />
        ))}
      </Instances>
    </group>
  )
}

/** Delicate cable chain filling the ring everywhere the charm isn't. */
function ChainLinks() {
  const links = useMemo(() => {
    const items: Array<{ angle: number; flip: boolean }> = []
    const from = CHARM_ANGLE + CHARM_HALF
    const to = CHARM_ANGLE + Math.PI * 2 - CHARM_HALF
    const count = 40
    for (let i = 0; i < count; i++) {
      const t = from + ((i + 0.5) / count) * (to - from)
      items.push({ angle: t, flip: i % 2 === 1 })
    }
    return items
  }, [])

  return (
    <>
      {links.map(({ angle, flip }, i) => (
        <group
          key={i}
          position={[Math.cos(angle) * RING_R, Math.sin(angle) * RING_R, 0]}
          rotation={[0, 0, angle + Math.PI / 2]}
        >
          <mesh rotation={[flip ? Math.PI / 2 : 0, 0, 0]} scale={[1.45, 1, 1]}>
            <torusGeometry args={[0.075, 0.021, 10, 26]} />
            <meshStandardMaterial {...ROSE_GOLD} />
          </mesh>
        </group>
      ))}
    </>
  )
}

function Bracelet() {
  const spin = useRef<THREE.Group>(null)

  const { geometry, beads } = useMemo(() => {
    const outline = quatrefoilOutline()
    const shape = new THREE.Shape(outline)
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.14,
      bevelEnabled: true,
      bevelThickness: 0.07,
      bevelSize: 0.07,
      bevelSegments: 4,
      curveSegments: 4,
    })
    geo.center()
    /* every ~7th outline point becomes a rim bead */
    const rim = outline.filter((_, i) => i % 7 === 0)
    return { geometry: geo, beads: rim }
  }, [])

  useFrame((_, delta) => {
    if (spin.current) spin.current.rotation.y += delta * 0.4
  })

  return (
    <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.3}>
      {/* lift the whole piece so the charm hanging at the bottom sits inside
          the frame — the ring is centered on the origin but the charm reaches
          well below it, so without this the bottom clips */}
      <group position={[0, 0.35, 0]} rotation={[0.28, 0, 0]}>
        <group ref={spin}>
          <Charm geometry={geometry} beads={beads} />
          <ChainLinks />
        </group>
      </group>
    </Float>
  )
}

export default function Bracelet3D() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 1.1, 8.1], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.45} />
      <spotLight
        position={[4, 6, 6]}
        intensity={40}
        angle={0.5}
        penumbra={1}
        color="#fff0f5"
      />

      <Bracelet />

      <Sparkles
        count={80}
        scale={[8, 5, 4]}
        size={2.8}
        speed={0.3}
        color="#e0508f"
        opacity={0.8}
      />

      <ContactShadows
        position={[0, -2.7, 0]}
        opacity={0.28}
        scale={12}
        blur={2.6}
        far={4}
        color="#8f1f53"
        frames={1}
      />

      {/* custom jewelry-studio lighting — no external HDR fetch */}
      <Environment resolution={256}>
        <Lightformer
          intensity={4}
          position={[0, 3, 4]}
          scale={[6, 3, 1]}
          color="#fff8fb"
        />
        <Lightformer
          intensity={2.2}
          position={[-5, 1, -1]}
          rotation-y={Math.PI / 2}
          scale={[4, 6, 1]}
          color="#ffd9e8"
        />
        <Lightformer
          intensity={2.2}
          position={[5, -1, -1]}
          rotation-y={-Math.PI / 2}
          scale={[4, 6, 1]}
          color="#ffe9dc"
        />
        <Lightformer
          intensity={1.4}
          position={[0, -3, 2]}
          scale={[6, 2, 1]}
          color="#ffdce9"
        />
      </Environment>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        /* stop at eye level so the camera never dips below the shadow plane,
           where its underside flickers as a dark box (worst on mobile) */
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}
