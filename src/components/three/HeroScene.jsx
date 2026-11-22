import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#3ddc84";

/* ------------------------------------------------------------------ */
/*  Orbiting fragments                                                 */
/* ------------------------------------------------------------------ */

const SATELLITES = [
  { radius: 2.05, speed: 0.42, offset: 0.0, height: 0.42, size: 0.12, color: ACCENT },
  { radius: 2.45, speed: 0.3, offset: 2.1, height: -0.55, size: 0.09, color: "#eafff3" },
  { radius: 1.85, speed: 0.55, offset: 4.0, height: 0.1, size: 0.075, color: ACCENT },
  { radius: 2.75, speed: 0.24, offset: 5.3, height: 0.75, size: 0.1, color: "#9aa7a0" },
  { radius: 2.3, speed: 0.48, offset: 1.2, height: -0.85, size: 0.07, color: ACCENT },
];

function Satellites() {
  const refs = useRef([]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    SATELLITES.forEach((satellite, index) => {
      const mesh = refs.current[index];
      if (!mesh) return;

      const angle = time * satellite.speed + satellite.offset;
      mesh.position.set(
        Math.cos(angle) * satellite.radius,
        satellite.height + Math.sin(angle * 1.4) * 0.22,
        Math.sin(angle) * satellite.radius
      );
      mesh.rotation.x = angle;
      mesh.rotation.y = angle * 1.6;
    });
  });

  return (
    <>
      {SATELLITES.map((satellite, index) => (
        <mesh
          key={`${satellite.offset}-${index}`}
          ref={(node) => {
            refs.current[index] = node;
          }}
        >
          <octahedronGeometry args={[satellite.size, 0]} />
          <meshStandardMaterial
            color={satellite.color}
            emissive={satellite.color}
            emissiveIntensity={0.65}
            metalness={0.6}
            roughness={0.28}
          />
        </mesh>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Core object                                                        */
/* ------------------------------------------------------------------ */

function Core({ pulse }) {
  const group = useRef(null);
  const burst = useRef(0);

  useEffect(() => {
    if (pulse > 0) burst.current = 1;
  }, [pulse]);

  useFrame((state, delta) => {
    const node = group.current;
    if (!node) return;

    node.rotation.y += delta * 0.14;
    node.rotation.z += delta * 0.035;

    if (burst.current > 0) {
      burst.current = Math.max(0, burst.current - delta * 1.4);
      node.scale.setScalar(1 + Math.sin(burst.current * Math.PI) * 0.16);
    } else {
      node.scale.setScalar(1);
    }
  });

  return (
    <group ref={group}>
      {/* soft halo */}
      <mesh scale={2.4}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshBasicMaterial
          color={ACCENT}
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>

      {/* faceted core */}
      <mesh>
        <icosahedronGeometry args={[1.32, 2]} />
        <meshStandardMaterial
          color="#0d1712"
          emissive="#0b3a23"
          emissiveIntensity={0.55}
          metalness={0.88}
          roughness={0.24}
        />
      </mesh>

      {/* wireframe shell */}
      <mesh scale={1.035}>
        <icosahedronGeometry args={[1.32, 1]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.22} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Rings                                                              */
/* ------------------------------------------------------------------ */

function Rings() {
  const group = useRef(null);

  useFrame((state, delta) => {
    const node = group.current;
    if (!node) return;

    node.rotation.z += delta * 0.07;
    node.rotation.x += delta * 0.035;
  });

  return (
    <group ref={group} rotation={[Math.PI / 2.6, 0, 0]}>
      <mesh>
        <torusGeometry args={[2.1, 0.012, 8, 180]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0.5, 0]}>
        <torusGeometry args={[2.5, 0.007, 8, 180]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.16} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/*  Particle field                                                     */
/* ------------------------------------------------------------------ */

function Particles({ count = 620 }) {
  const ref = useRef(null);

  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 3.1 + Math.random() * 4.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      array[index * 3] = radius * Math.sin(phi) * Math.cos(theta);
      array[index * 3 + 1] = radius * Math.cos(phi) * 0.68;
      array[index * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    return array;
  }, [count]);

  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.018;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.026}
        sizeAttenuation
        color="#c9d3cd"
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Camera rig: mouse parallax + scroll drift                          */
/* ------------------------------------------------------------------ */

function Rig() {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const scroll =
      typeof window === "undefined"
        ? 0
        : Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1.2);

    target.set(state.pointer.x * 0.55, state.pointer.y * 0.4 + scroll * 0.9, 6.6 + scroll * 1.9);

    const damping = 1 - Math.pow(0.0016, delta);
    camera.position.lerp(target, damping);
    camera.lookAt(0, scroll * 0.25, 0);
  });

  return null;
}

/* ------------------------------------------------------------------ */
/*  Drag to spin                                                       */
/* ------------------------------------------------------------------ */

function DragControls({ drag }) {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;
    let lastX = 0;
    let lastY = 0;

    const onDown = (event) => {
      if (event.button !== 0 && event.pointerType === "mouse") return;

      drag.active = true;
      lastX = event.clientX;
      lastY = event.clientY;
      drag.velocityY = 0;
      drag.velocityX = 0;

      canvas.classList.add("is-dragging");
      canvas.setPointerCapture?.(event.pointerId);
    };

    const onMove = (event) => {
      if (!drag.active) return;

      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;

      drag.y += dx * 0.006;
      drag.x = THREE.MathUtils.clamp(drag.x + dy * 0.0032, -0.85, 0.85);
      drag.velocityY = dx * 0.005;
      drag.velocityX = dy * 0.0026;
    };

    const onUp = (event) => {
      if (!drag.active) return;

      drag.active = false;
      canvas.classList.remove("is-dragging");
      canvas.releasePointerCapture?.(event.pointerId);
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);

    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.classList.remove("is-dragging");
    };
  }, [drag, gl]);

  return null;
}

/* ------------------------------------------------------------------ */
/*  Scene                                                              */
/* ------------------------------------------------------------------ */

function Scene({ pulse, drag }) {
  const group = useRef(null);

  useFrame((state, delta) => {
    const node = group.current;
    if (!node) return;

    if (!drag.active && (Math.abs(drag.velocityY) > 0.0001 || Math.abs(drag.velocityX) > 0.0001)) {
      drag.y += drag.velocityY;
      drag.x = THREE.MathUtils.clamp(drag.x + drag.velocityX, -0.85, 0.85);

      const friction = Math.pow(0.02, delta);
      drag.velocityY *= friction;
      drag.velocityX *= friction;
    }

    const damping = 1 - Math.pow(0.002, delta);
    node.rotation.y = THREE.MathUtils.lerp(node.rotation.y, state.pointer.x * 0.38 + drag.y, damping);
    node.rotation.x = THREE.MathUtils.lerp(node.rotation.x, -state.pointer.y * 0.26 + drag.x, damping);
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.45} floatIntensity={1.1}>
        <Core pulse={pulse} />
      </Float>

      <Rings />
      <Satellites />
      <Particles />
      <Sparkles count={60} scale={[7, 6, 6]} size={2.2} speed={0.35} color={ACCENT} opacity={0.45} />
    </group>
  );
}

export default function HeroScene({ pulse = 0, active = true }) {
  const drag = useRef({
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    active: false,
  }).current;

  return (
    <Canvas
      className="hero-canvas"
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6.6], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
    >
      <Rig />
      <DragControls drag={drag} />

      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={2.4} />
      <pointLight position={[-4, -2, 3]} intensity={45} distance={14} color={ACCENT} />
      <pointLight position={[4, 3, -2]} intensity={28} distance={16} color="#eafff3" />

      <Scene pulse={pulse} drag={drag} />
    </Canvas>
  );
}
