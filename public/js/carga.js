// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set background color
renderer.setClearColor('#293133'); // Changed to black for contrast

// Create a sphere with interactive shader
// const geometry = new THREE.SphereGeometry(2.5, 80, 80); 
// const geometry = new THREE.TorusKnotGeometry(2.5, 0.5, 100, 16);
const geometry = new THREE.TorusGeometry(3, 0.9, 26, 80);



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
            vec3 baseColor = vec3(1.0, 0.0, 0.0); // Bright orange
            
            // Gradient effect based on position and time
            float r = baseColor.r + 0.2 * sin(time * 0.5 + vPosition.x * 2.0);
            float g = baseColor.g + 0.2 * sin(time * 0.5 + vPosition.y * 2.0);
            float b = baseColor.b + 0.2 * sin(time * 0.5 + vPosition.z * 2.0);
            vec3 color = vec3(r, g, b);
            
            // Smooth transition effect
            float intensity = abs(sin(vPosition.x * 10.0)) * 0.5 + 0.5;
            color = mix(baseColor, color, intensity);
            
            // Add a subtle glow effect
            float glow = max(0.0, 1.0 - length(vPosition) * 0.1);
            vec3 glowColor = vec3(1.0, 0.8, 0.3) * glow; // Soft orange glow
            
            gl_FragColor = vec4(color + glowColor, 1.0);
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
sphere.position.set(8.5, 0, 0); // X, Y, Z position
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


// document.addEventListener('DOMContentLoaded', () => {
//     const menuItems = document.querySelectorAll('.menu-item');

//     menuItems.forEach(item => {
//         item.addEventListener('click', () => {
//             menuItems.forEach(i => i.classList.remove('active'));
//             item.classList.add('active');
//             const section = item.getAttribute('data-section');
//             console.log(`Navegando a la sección: ${section}`);
//             // Aquí puedes agregar la lógica para cambiar de sección
//         });
//     });
// });
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById("mySidebar");
    const content = document.getElementById("main");
    const menuItems = document.querySelectorAll('.sidebar a');
    const themeSwitch = document.getElementById('themeSwitch');

    function toggleSidebar() {
        sidebar.classList.toggle("active");
        // content.classList.toggle("active");
    }

    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {

            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const section = item.getAttribute('data-section');
            console.log(`Navegando a la sección: ${section}`);
            // Aquí puedes agregar la lógica para cambiar de sección
            toggleSidebar();
        });
    });

   
});





