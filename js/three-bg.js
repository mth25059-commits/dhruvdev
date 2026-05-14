/* three-bg.js — Three.js Particle Network Background */

(function () {
  if (typeof THREE === 'undefined') return;

  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 200;

  // --- Particle System ---
  const PARTICLE_COUNT = 120;
  const positions = [];
  const velocities = [];
  const geometry = new THREE.BufferGeometry();
  const posArray = new Float32Array(PARTICLE_COUNT * 3);
  const spread = 300;

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const x = (Math.random() - 0.5) * spread * 2;
    const y = (Math.random() - 0.5) * spread;
    const z = (Math.random() - 0.5) * spread;
    positions.push({ x, y, z });
    velocities.push({
      x: (Math.random() - 0.5) * 0.15,
      y: (Math.random() - 0.5) * 0.08,
      z: (Math.random() - 0.5) * 0.05
    });
    posArray[i * 3] = x;
    posArray[i * 3 + 1] = y;
    posArray[i * 3 + 2] = z;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

  const pointMaterial = new THREE.PointsMaterial({
    color: 0x00ffaa,
    size: 1.5,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true
  });

  const points = new THREE.Points(geometry, pointMaterial);
  scene.add(points);

  // --- Connection Lines ---
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x00ffaa,
    transparent: true,
    opacity: 0.15
  });

  const lineGroup = new THREE.Group();
  scene.add(lineGroup);
  const MAX_DIST = 70;
  const MAX_LINES = 200;
  const lineSegments = [];

  function updateLines() {
    // Remove old lines
    while (lineGroup.children.length > 0) {
      lineGroup.remove(lineGroup.children[0]);
    }

    let lineCount = 0;
    for (let i = 0; i < PARTICLE_COUNT && lineCount < MAX_LINES; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT && lineCount < MAX_LINES; j++) {
        const dx = positions[i].x - positions[j].x;
        const dy = positions[i].y - positions[j].y;
        const dz = positions[i].z - positions[j].z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < MAX_DIST) {
          const opacity = (1 - dist / MAX_DIST) * 0.3;
          const mat = new THREE.LineBasicMaterial({
            color: dist < MAX_DIST * 0.4 ? 0x7000ff : 0x00ffaa,
            transparent: true,
            opacity
          });
          const geo = new THREE.BufferGeometry();
          const pts = new Float32Array([
            positions[i].x, positions[i].y, positions[i].z,
            positions[j].x, positions[j].y, positions[j].z
          ]);
          geo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
          const line = new THREE.Line(geo, mat);
          lineGroup.add(line);
          lineCount++;
        }
      }
    }
  }

  // --- Mouse Influence ---
  let mouseX = 0, mouseY = 0;
  let targetRotX = 0, targetRotY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
  });

  // --- Animation ---
  let frame = 0;
  function animate() {
    requestAnimationFrame(animate);
    frame++;

    // Update positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i].x += velocities[i].x;
      positions[i].y += velocities[i].y;
      positions[i].z += velocities[i].z;

      // Bounce
      if (Math.abs(positions[i].x) > spread) velocities[i].x *= -1;
      if (Math.abs(positions[i].y) > spread * 0.5) velocities[i].y *= -1;
      if (Math.abs(positions[i].z) > spread * 0.5) velocities[i].z *= -1;

      posArray[i * 3] = positions[i].x;
      posArray[i * 3 + 1] = positions[i].y;
      posArray[i * 3 + 2] = positions[i].z;
    }
    geometry.attributes.position.needsUpdate = true;

    // Update lines every 3 frames for performance
    if (frame % 3 === 0) updateLines();

    // Camera mouse follow
    targetRotY = mouseX * 0.3;
    targetRotX = mouseY * 0.2;
    scene.rotation.y += (targetRotY - scene.rotation.y) * 0.02;
    scene.rotation.x += (targetRotX - scene.rotation.x) * 0.02;

    // Slow auto-rotation
    scene.rotation.y += 0.0008;

    renderer.render(scene, camera);
  }

  updateLines();
  animate();

  // --- Resize ---
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

})();
