import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RotateCw, Pause, Play, Sparkles, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';

interface InnovationLabCanvasProps {
  className?: string;
}

export const InnovationLabCanvas: React.FC<InnovationLabCanvasProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // User Interactive Settings
  const [finish, setFinish] = useState<'gold' | 'obsidian' | 'platinum'>('gold');
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [lightingPreset, setLightingPreset] = useState<'warm' | 'cool' | 'dramatic'>('warm');
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);

  // References for live shader/material updates without re-mounting the canvas
  const materialsRef = useRef<{
    primary?: THREE.MeshPhysicalMaterial;
    accent?: THREE.MeshPhysicalMaterial;
    wireframe?: THREE.MeshBasicMaterial;
  }>({});
  const lightsRef = useRef<{
    keyLight?: THREE.DirectionalLight;
    rimLight?: THREE.DirectionalLight;
    pointLight?: THREE.PointLight;
  }>({});
  const kineticSpeedRef = useRef<number>(1);
  const isPausedRef = useRef<boolean>(false);
  const wireframeRef = useRef<boolean>(false);

  useEffect(() => {
    kineticSpeedRef.current = speedMultiplier;
  }, [speedMultiplier]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    wireframeRef.current = wireframe;
    if (materialsRef.current.primary) {
      materialsRef.current.primary.wireframe = wireframe;
    }
    if (materialsRef.current.accent) {
      materialsRef.current.accent.wireframe = wireframe;
    }
  }, [wireframe]);

  // Update finish colors dynamically
  useEffect(() => {
    if (!materialsRef.current.primary || !materialsRef.current.accent) return;
    if (finish === 'gold') {
      materialsRef.current.primary.color.setHex(0xd6b477);
      materialsRef.current.primary.metalness = 0.95;
      materialsRef.current.primary.roughness = 0.16;
      materialsRef.current.accent.color.setHex(0xf4e6c8);
    } else if (finish === 'obsidian') {
      materialsRef.current.primary.color.setHex(0x1a1a1c);
      materialsRef.current.primary.metalness = 0.88;
      materialsRef.current.primary.roughness = 0.22;
      materialsRef.current.accent.color.setHex(0xd6b477);
    } else {
      // Platinum
      materialsRef.current.primary.color.setHex(0xe4e7eb);
      materialsRef.current.primary.metalness = 0.96;
      materialsRef.current.primary.roughness = 0.12;
      materialsRef.current.accent.color.setHex(0xb8c2cc);
    }
    materialsRef.current.primary.needsUpdate = true;
    materialsRef.current.accent.needsUpdate = true;
  }, [finish]);

  // Update lighting preset dynamically
  useEffect(() => {
    if (!lightsRef.current.keyLight || !lightsRef.current.rimLight || !lightsRef.current.pointLight) return;
    if (lightingPreset === 'warm') {
      lightsRef.current.keyLight.color.setHex(0xffecc2);
      lightsRef.current.rimLight.color.setHex(0xffaa5e);
      lightsRef.current.pointLight.color.setHex(0xd6b477);
    } else if (lightingPreset === 'cool') {
      lightsRef.current.keyLight.color.setHex(0xd8eaff);
      lightsRef.current.rimLight.color.setHex(0x8cb6ff);
      lightsRef.current.pointLight.color.setHex(0xaec7e8);
    } else {
      // Dramatic
      lightsRef.current.keyLight.color.setHex(0xffffff);
      lightsRef.current.rimLight.color.setHex(0xd6b477);
      lightsRef.current.pointLight.color.setHex(0xfff5ea);
    }
  }, [lightingPreset]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Software WebGL detector
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: true,
      });
    } catch {
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 550;

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.2);

    // Procedural reflection map
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = roomEnv;
    pmremGenerator.dispose();

    // Lighting
    const amb = new THREE.AmbientLight(0xfff5e6, 0.5);
    scene.add(amb);

    const keyL = new THREE.DirectionalLight(0xffecc2, 2.2);
    keyL.position.set(4, 5, 5);
    scene.add(keyL);

    const rimL = new THREE.DirectionalLight(0xd6b477, 1.4);
    rimL.position.set(-4, -3, -4);
    scene.add(rimL);

    const ptL = new THREE.PointLight(0xd6b477, 1.5, 10);
    ptL.position.set(0, 0, 3);
    scene.add(ptL);

    lightsRef.current = { keyLight: keyL, rimLight: rimL, pointLight: ptL };

    // Procedural Astrolabe Kinetic Mechanism (5 composite components)
    const kineticRig = new THREE.Group();

    const matPrimary = new THREE.MeshPhysicalMaterial({
      color: 0xd6b477,
      metalness: 0.95,
      roughness: 0.16,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      wireframe: wireframeRef.current,
    });

    const matAccent = new THREE.MeshPhysicalMaterial({
      color: 0xf4e6c8,
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 0.5,
      wireframe: wireframeRef.current,
    });

    const matDark = new THREE.MeshPhysicalMaterial({
      color: 0x141416,
      metalness: 0.85,
      roughness: 0.3,
    });

    materialsRef.current = { primary: matPrimary, accent: matAccent };

    // 1. Outer Gyroscope Armillary Ring
    const ring1Geo = new THREE.TorusGeometry(1.9, 0.04, 20, 100);
    const ring1 = new THREE.Mesh(ring1Geo, matPrimary);
    kineticRig.add(ring1);

    // 2. Middle Gimbal Ring with tick notches
    const ring2Geo = new THREE.TorusGeometry(1.6, 0.035, 20, 90);
    const ring2 = new THREE.Mesh(ring2Geo, matAccent);
    ring2.rotation.x = Math.PI / 4;
    kineticRig.add(ring2);

    // 3. Inner Astrolabe Ring
    const ring3Geo = new THREE.TorusGeometry(1.3, 0.03, 16, 80);
    const ring3 = new THREE.Mesh(ring3Geo, matDark);
    ring3.rotation.y = Math.PI / 3;
    kineticRig.add(ring3);

    // 4. Central Kinetic Chrono Core (Icosahedron + Octahedron nested cage)
    const coreGroup = new THREE.Group();
    const cageGeo = new THREE.IcosahedronGeometry(0.75, 1);
    const coreCage = new THREE.Mesh(cageGeo, matPrimary);
    coreGroup.add(coreCage);

    const innerGeo = new THREE.OctahedronGeometry(0.45, 0);
    const innerJewel = new THREE.Mesh(innerGeo, matAccent);
    coreGroup.add(innerJewel);

    kineticRig.add(coreGroup);

    // 5. Orbital Balance Pivots
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      const pivotGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.3, 16);
      const pivot = new THREE.Mesh(pivotGeo, matAccent);
      pivot.position.set(Math.cos(angle) * 1.6, Math.sin(angle) * 1.6, 0);
      pivot.rotation.z = angle + Math.PI / 2;
      kineticRig.add(pivot);
    }

    // Contact ground plane shadow
    const shadowGeo = new THREE.PlaneGeometry(5, 5);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.1;
    scene.add(shadowPlane);

    scene.add(kineticRig);

    // Interactive Drag to Rotate logic
    let isDragging = false;
    let previousPointerPosition = { x: 0, y: 0 };
    const targetRotation = { x: 0.2, y: 0.3 };
    const currentRotation = { x: 0.2, y: 0.3 };

    const handlePointerDown = (e: MouseEvent) => {
      isDragging = true;
      previousPointerPosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousPointerPosition.x;
      const deltaY = e.clientY - previousPointerPosition.y;

      targetRotation.y += deltaX * 0.008;
      targetRotation.x += deltaY * 0.008;

      previousPointerPosition = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    const clock = new THREE.Clock();
    let frameId = 0;
    let isDisposed = false;

    const tick = () => {
      if (isDisposed) return;
      const delta = Math.min(clock.getDelta(), 0.1);
      const speed = isPausedRef.current ? 0 : kineticSpeedRef.current;

      // Rotate kinetic mechanism rings independently
      ring1.rotation.z += 0.35 * speed * delta;
      ring2.rotation.x += 0.5 * speed * delta;
      ring3.rotation.y -= 0.65 * speed * delta;
      coreGroup.rotation.y += 1.2 * speed * delta;
      coreGroup.rotation.x -= 0.8 * speed * delta;

      // Base rotation interpolation
      currentRotation.x = THREE.MathUtils.damp(currentRotation.x, targetRotation.x, 6, delta);
      currentRotation.y = THREE.MathUtils.damp(currentRotation.y, targetRotation.y, 6, delta);

      kineticRig.rotation.x = currentRotation.x;
      kineticRig.rotation.y = currentRotation.y;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      isDisposed = true;
      cancelAnimationFrame(frameId);
      domElem.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      ring1Geo.dispose();
      ring2Geo.dispose();
      ring3Geo.dispose();
      cageGeo.dispose();
      innerGeo.dispose();
      shadowGeo.dispose();
      matPrimary.dispose();
      matAccent.dispose();
      matDark.dispose();
      shadowMat.dispose();
      roomEnv.dispose();
      renderer.dispose();

      if (container && domElem && container.contains(domElem)) {
        container.removeChild(domElem);
      }
    };
  }, []);

  return (
    <div className={`relative w-full h-[520px] lg:h-[600px] rounded-xl overflow-hidden bg-[#0A0A0A] border border-gold/15 ${className}`}>
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Click and drag to rotate kinetic artifact"
      />

      {/* Top minimal spec label */}
      <div className="absolute top-4 left-5 pointer-events-none flex items-center gap-3 text-xs tracking-wider uppercase text-neutral-400">
        <span className="font-display text-gold font-medium">Kinetic Astrolabe Model AX-001</span>
        <span aria-hidden="true">·</span>
        <span>Interactive Viewport</span>
      </div>

      <div className="absolute top-4 right-5 text-xs text-neutral-400 hidden sm:flex items-center gap-2 pointer-events-none">
        <span>Click + Drag to rotate</span>
      </div>

      {/* Unified Bottom Collapsible Control Dock (Per Three.js Guidelines) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[92%] sm:max-w-xl z-20 transition-all duration-300">
        {/* Toggle Expand/Collapse Drawer Handle */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#141414]/90 border border-b-0 border-gold/20 rounded-t-md text-[11px] text-neutral-300 hover:text-gold transition-colors backdrop-blur-md cursor-pointer"
            aria-label={isDockCollapsed ? 'Expand 3D Controls' : 'Collapse 3D Controls'}
          >
            <SlidersHorizontal className="w-3 h-3 text-gold" />
            <span>{isDockCollapsed ? 'Show Controls' : 'Hide Controls'}</span>
            {isDockCollapsed ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        </div>

        {/* Control Dock Panel */}
        {!isDockCollapsed && (
          <div className="p-3 bg-[#111111]/95 border border-gold/20 rounded-lg shadow-2xl backdrop-blur-xl flex flex-col gap-2.5 text-xs text-neutral-300">
            {/* Row 1: Material Finish Swatches */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-neutral-800">
              <span className="text-[11px] uppercase tracking-wider text-neutral-400">Finish:</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setFinish('gold')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    finish === 'gold' ? 'bg-[#D6B477] text-black font-semibold' : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  Champagne Gold
                </button>
                <button
                  onClick={() => setFinish('obsidian')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    finish === 'obsidian' ? 'bg-neutral-800 text-gold border border-gold/40' : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  Obsidian Chrome
                </button>
                <button
                  onClick={() => setFinish('platinum')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    finish === 'platinum' ? 'bg-[#E4E7EB] text-black font-semibold' : 'bg-neutral-900 text-neutral-400 hover:text-white'
                  }`}
                >
                  Rose Platinum
                </button>
              </div>
            </div>

            {/* Row 2: Kinetic Speed, Wireframe & Atmosphere */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
              {/* Play/Pause & Speed */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-1.5 bg-neutral-900 hover:bg-neutral-800 rounded border border-neutral-700 text-gold cursor-pointer"
                  title={isPaused ? 'Resume Motion' : 'Pause Motion'}
                  aria-label={isPaused ? 'Resume Motion' : 'Pause Motion'}
                >
                  {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                </button>

                <div className="flex items-center gap-1 bg-neutral-950 p-0.5 rounded border border-neutral-800 text-[11px]">
                  <button
                    onClick={() => setSpeedMultiplier(0.5)}
                    className={`px-1.5 py-0.5 rounded cursor-pointer ${speedMultiplier === 0.5 ? 'text-gold font-bold' : 'text-neutral-500'}`}
                  >
                    0.5x
                  </button>
                  <button
                    onClick={() => setSpeedMultiplier(1)}
                    className={`px-1.5 py-0.5 rounded cursor-pointer ${speedMultiplier === 1 ? 'text-gold font-bold' : 'text-neutral-500'}`}
                  >
                    1.0x
                  </button>
                  <button
                    onClick={() => setSpeedMultiplier(2)}
                    className={`px-1.5 py-0.5 rounded cursor-pointer ${speedMultiplier === 2 ? 'text-gold font-bold' : 'text-neutral-500'}`}
                  >
                    2.0x
                  </button>
                </div>
              </div>

              {/* Wireframe Toggle */}
              <button
                onClick={() => setWireframe(!wireframe)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                  wireframe ? 'bg-gold/20 text-gold border border-gold/40' : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <RotateCw className="w-3 h-3" />
                <span>{wireframe ? 'CAD Wireframe' : 'PBR Surface'}</span>
              </button>

              {/* Lighting Tone */}
              <div className="flex items-center gap-1 text-[11px]">
                <button
                  onClick={() => setLightingPreset('warm')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${lightingPreset === 'warm' ? 'text-gold underline underline-offset-4' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                  Warm
                </button>
                <button
                  onClick={() => setLightingPreset('cool')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${lightingPreset === 'cool' ? 'text-blue-300 underline underline-offset-4' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                  Cool
                </button>
                <button
                  onClick={() => setLightingPreset('dramatic')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${lightingPreset === 'dramatic' ? 'text-white underline underline-offset-4' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                  Dramatic
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
