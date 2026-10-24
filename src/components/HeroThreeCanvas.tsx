import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface HeroThreeCanvasProps {
  theme?: string;
}

export const HeroThreeCanvas: React.FC<HeroThreeCanvasProps> = ({ theme = 'solaris-gold' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL
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

    // Initialize renderer
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: true,
      });
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070707, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Procedural Room Environment for real specular PBR reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = roomEnv;
    pmremGenerator.dispose();

    // Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xfff5e6, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffdfa8, 2.5);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7fb5ff, 1.2);
    rimLight.position.set(-5, -4, -4);
    scene.add(rimLight);

    const centerPointLight = new THREE.PointLight(0xd6b477, 1.8, 12);
    centerPointLight.position.set(0, 0, 2);
    scene.add(centerPointLight);

    // Group for procedural multi-part infinity sculpture
    const sculptureGroup = new THREE.Group();

    // Material finishes based on luxury palette
    const goldColor = theme === 'platinum-aurora' 
      ? new THREE.Color(0xdce5ea)
      : theme === 'midnight-obsidian'
      ? new THREE.Color(0xa89980)
      : new THREE.Color(0xd6b477);

    const goldMaterial = new THREE.MeshPhysicalMaterial({
      color: goldColor,
      metalness: 0.94,
      roughness: 0.18,
      clearcoat: 0.8,
      clearcoatRoughness: 0.12,
      reflectivity: 0.9,
    });

    const obsidianMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x121212),
      metalness: 0.8,
      roughness: 0.25,
      clearcoat: 0.9,
    });

    // 1. Primary Torus Knot (Sculptural Core)
    const torusKnotGeo = new THREE.TorusKnotGeometry(1.65, 0.28, 180, 28, 2, 3);
    const torusKnotMesh = new THREE.Mesh(torusKnotGeo, goldMaterial);
    torusKnotMesh.castShadow = !isSoftwareGl;
    sculptureGroup.add(torusKnotMesh);

    // 2. Secondary Gimbal Orbital Rings
    const outerRingGeo = new THREE.TorusGeometry(2.4, 0.035, 24, 120);
    const outerRing = new THREE.Mesh(outerRingGeo, obsidianMaterial);
    sculptureGroup.add(outerRing);

    const innerRingGeo = new THREE.TorusGeometry(2.1, 0.025, 24, 100);
    const innerRing = new THREE.Mesh(innerRingGeo, goldMaterial);
    innerRing.rotation.x = Math.PI / 3;
    sculptureGroup.add(innerRing);

    // 3. Accent Floating Gold Spherical Jewels
    const jewelGeo = new THREE.SphereGeometry(0.1, 24, 24);
    const jewel1 = new THREE.Mesh(jewelGeo, goldMaterial);
    jewel1.position.set(2.4, 0, 0);
    outerRing.add(jewel1);

    const jewel2 = new THREE.Mesh(jewelGeo, goldMaterial);
    jewel2.position.set(-2.4, 0, 0);
    outerRing.add(jewel2);

    // 4. Stardust floating golden particles
    const particleCount = isSoftwareGl ? 80 : 300;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      scales[i] = Math.random() * 0.03 + 0.01;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xd6b477,
      size: 0.03,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    scene.add(sculptureGroup);

    // Interaction variables
    const mouseTarget = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };

    const handlePointerMove = (e: MouseEvent) => {
      mouseTarget.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseTarget.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop with Clock and software guard
    const clock = new THREE.Clock();
    let frameId = 0;
    let isDisposed = false;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (isDisposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 8);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 60);
        }
      };
      frameId = window.setTimeout(poll, 8);
    }

    const tick = () => {
      if (isDisposed) return;
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsedTime = clock.getElapsedTime();

      // Fluid rotations
      sculptureGroup.rotation.y += 0.25 * delta;
      sculptureGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15;
      outerRing.rotation.z += 0.18 * delta;
      innerRing.rotation.y -= 0.3 * delta;

      // Particle subtle drift
      particles.rotation.y = elapsedTime * 0.02;

      // Mouse Parallax interpolation with exponential damping
      currentMouse.x = THREE.MathUtils.damp(currentMouse.x, mouseTarget.x, 2.5, delta);
      currentMouse.y = THREE.MathUtils.damp(currentMouse.y, mouseTarget.y, 2.5, delta);

      sculptureGroup.position.x = currentMouse.x * 0.45;
      sculptureGroup.position.y = -currentMouse.y * 0.35;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => {
      isDisposed = true;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (isSoftwareGl) {
        clearTimeout(frameId);
      } else {
        cancelAnimationFrame(frameId);
      }

      // Dispose Geometries & Materials
      torusKnotGeo.dispose();
      outerRingGeo.dispose();
      innerRingGeo.dispose();
      jewelGeo.dispose();
      particleGeo.dispose();
      goldMaterial.dispose();
      obsidianMaterial.dispose();
      particleMat.dispose();
      roomEnv.dispose();
      renderer.dispose();

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme]);

  if (!hasWebGL) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gold-glow pointer-events-none">
        <div className="w-96 h-96 rounded-full border border-gold/20 opacity-30 animate-pulse" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
      aria-hidden="true"
    />
  );
};
