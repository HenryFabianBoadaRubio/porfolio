// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set background color
renderer.setClearColor('rgba(17,17,17,255)');
// Create a sphere with interactive shader
const geometry = new THREE.SphereGeometry(3, 70, 70); // Increased size
const material = new THREE.ShaderMaterial({
    vertexShader: `
        varying vec3 vPosition;
        varying vec2 vUv;
        uniform float time;
        uniform vec2 mousePos;
        void main() {
            vPosition = position;
            vUv = uv;
            vec3 pos = position;
            
            // Calculate distance from center to mouse position
            float dist = length(mousePos - (vPosition.xy * 0.5));
            
            // Apply wave distortion based on mouse position
            float wave = sin(pos.x * 15.0 + time) * 0.6;
            wave += sin(pos.y * 15.0 + time) * 0.6;
            wave *= (1.0 - dist); // Deform more based on mouse distance
            pos += normalize(position) * wave;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
    fragmentShader: `
        varying vec3 vPosition;
        varying vec2 vUv;
        uniform float time;
        void main() {
            // Base color
            vec3 baseColor = vec3(0.348 , 0.017, 0.000); // Color #3b0300

            // Gradient effect based on position and time
            float r = baseColor.r + 0.1 * sin(time * 0.5 + vPosition.x * 2.0);
            float g = baseColor.g + 0.1 * sin(time * 0.5 + vPosition.y * 2.0);
            float b = baseColor.b + 0.1 * sin(time * 0.5 + vPosition.z * 2.0);
            vec3 color = vec3(r, g, b);
            
            // Smooth transition effect
            float intensity = abs(sin(vPosition.x * 10.0)) * 0.5 + 0.5;
            color = mix(baseColor, color, intensity);
            
            gl_FragColor = vec4(color, 1.0);
        }
    `,
    uniforms: {
        time: { value: 0 },
        mousePos: { value: new THREE.Vector2(0.5, 0.5) }
    }
});
const sphere = new THREE.Mesh(geometry, material);
sphere.scale.set(1, 1, 1); // Scale the sphere
scene.add(sphere);
// Move the sphere to the right
sphere.position.set(6, 0, 0); // X, Y, Z position
// Set camera position
camera.position.z = 7; // Adjusted position to accommodate larger sphere

// Track mouse position
function onMouseMove(event) {
    // Convert mouse position to normalized device coordinates (-1 to +1)
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    material.uniforms.mousePos.value.set(mouseX, mouseY);
}

window.addEventListener('mousemove', onMouseMove, false);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update shader uniform
    material.uniforms.time.value += 0.04;

    // Rotate the sphere for a dynamic effect
    sphere.rotation.x += 0.005;
    sphere.rotation.y += 0.005;

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});




document.addEventListener('DOMContentLoaded', () => {
    const h1 = document.querySelector('h1');
    const text = h1.textContent;
    const japaneseChars = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
    const chars = text.split('');

    // Crea un efecto de texto tipo Matrix con caracteres japoneses
    const interval = setInterval(() => {
        let currentText = '';
        chars.forEach((char) => {
            if (Math.random() > 0.5) {
                currentText += japaneseChars[Math.floor(Math.random() * japaneseChars.length)];
            } else {
                currentText += char;
            }
        });
        h1.textContent = currentText;
    }, 50);

    // Detener el intervalo y mostrar el texto original después de un tiempo
    setTimeout(() => {
        clearInterval(interval);
        h1.textContent = text;
    }, 1000); // Cambia el tiempo según lo necesites
});


