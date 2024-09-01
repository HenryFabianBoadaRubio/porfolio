// script.js
let scene, camera, renderer, hexagons = [];
const hexagonSize = 1;
const hexagonSpacing = hexagonSize * 1.5;
const hexagonRadius = Math.sqrt(3) * hexagonSize / 2;

const init = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);

    camera.position.z = 20;

    // Create hexagon geometry and material
    const geometry = new THREE.CircleGeometry(hexagonSize, 6);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });

    // Create a grid of hexagons
    for (let x = -10; x < 10; x++) {
        for (let y = -10; y < 10; y++) {
            if ((x + y) % 2 === 0) {
                const hexagon = new THREE.Mesh(geometry, material);
                hexagon.position.x = x * hexagonSpacing;
                hexagon.position.y = y * hexagonSpacing * 0.75;
                scene.add(hexagon);
                hexagons.push(hexagon);
            }
        }
    }

    // Animation loop
    animate();

    // Event listener for mouse movement
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);

    // Set up the grid reveal effect
    setInterval(revealHexagonPattern, 2000);
};

const onMouseMove = (event) => {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (mouseY - camera.position.y) * 0.05;
};

const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

const revealHexagonPattern = () => {
    hexagons.forEach(hexagon => {
        hexagon.material.opacity = 0.7;
        setTimeout(() => {
            hexagon.material.opacity = 0.0;
        }, 500);
    });
};

const animate = () => {
    requestAnimationFrame(animate);

    // Rotate scene for some dynamic effect
    scene.rotation.y += 0.001;

    renderer.render(scene, camera);
};

init();
