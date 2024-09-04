// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set background color
renderer.setClearColor('#03071e'); // Changed to black for contrast

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
    const menuToggle = document.getElementById('menu-toggle');
    const overlay = document.getElementById('overlay');
    const menu = document.querySelector('.menu');
    const mainContent = document.querySelector('.main-container'); // Selecciona el contenedor principal

    menuToggle.addEventListener('change', () => {
        if (menuToggle.checked) {
            overlay.classList.add('show');
            menu.classList.add('show');
            mainContent.classList.add('blur'); // Aplica el efecto de desenfoque
        } else {
            overlay.classList.remove('show');
            menu.classList.remove('show');
            mainContent.classList.remove('blur'); // Elimina el efecto de desenfoque
        }
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            menuToggle.checked = false;
            overlay.classList.remove('show');
            menu.classList.remove('show');
            mainContent.classList.remove('blur'); // Elimina el efecto de desenfoque
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuLinks = document.querySelectorAll('.menu a');

    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});



/*VISTA DE SKILLS*/
/*VISTA DE SKILLS*/
const skills = [
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', description: 'HTML es el lenguaje de marcado estándar para crear páginas web.' },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', description: 'CSS es el lenguaje utilizado para describir la presentación de un documento escrito en HTML.' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', description: 'JavaScript es un lenguaje de programación que permite crear contenido dinámico en la web.' },
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', description: 'Python es un lenguaje de programación versátil y de alto nivel, utilizado en desarrollo web, análisis de datos, inteligencia artificial y más.' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', description: 'Node.js es un entorno de ejecución para JavaScript en el servidor, que permite desarrollar aplicaciones web escalables y eficientes.' },
    { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', description: 'SQL es un lenguaje estándar para gestionar y manipular bases de datos relacionales.' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', description: 'Git es un sistema de control de versiones distribuido utilizado para gestionar el código fuente y colaborar en proyectos de desarrollo.' },
    { name: 'npm', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg', description: 'npm es el gestor de paquetes para Node.js, que facilita la instalación y gestión de dependencias de proyectos JavaScript.' },
    { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', description: 'Visual Studio Code es un editor de código fuente ligero y potente, con soporte para depuración, control de versiones y extensiones.' },
    { name: 'Canva', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg', description: 'Canva es una herramienta de diseño gráfico en línea que permite crear y editar gráficos, presentaciones y otros contenidos visuales.' },
    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', description: 'GitHub es una plataforma de desarrollo colaborativo que utiliza Git para el control de versiones y proporciona herramientas para la gestión de proyectos y código.' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', description: 'Figma es una herramienta de diseño de interfaces y prototipos colaborativos en la web, ideal para el diseño de UI/UX.' },
    { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', description: 'Linux es un sistema operativo de código abierto conocido por su estabilidad, seguridad y flexibilidad en servidores y sistemas embebidos.' },
    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', description: 'MongoDB es una base de datos NoSQL orientada a documentos, que permite almacenar datos en formatos JSON-like y proporciona alta escalabilidad.' },
    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', description: 'MySQL es un sistema de gestión de bases de datos relacional de código abierto, ampliamente utilizado en aplicaciones web y de software.' },
    { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', description: 'Express es un framework web para Node.js que facilita la creación de aplicaciones web y APIs con una arquitectura flexible y minimalista.' }
];


const columns = document.querySelectorAll('.carousel-column');
const infoCard = document.getElementById('info-card');
const infoTitle = document.getElementById('info-title');
const infoDescription = document.getElementById('info-description');
const closeBtn = document.getElementById('close-btn');

skills.forEach((skill, index) => {
    const skillElement = document.createElement('div');
    skillElement.className = 'skill-cube';
    
    // Crear las caras del cubo
    ['front', 'back', 'right', 'left', 'top', 'bottom'].forEach(face => {
        const faceElement = document.createElement('div');
        faceElement.className = `face ${face}`;
        
        if (['front', 'right', 'top','left'].includes(face)) {
            const img = document.createElement('img');
            img.src = skill.icon;
            img.alt = skill.name;
            faceElement.appendChild(img);
        } else {
            faceElement.textContent = skill.name;
        }
        
        skillElement.appendChild(faceElement);
    });

    // Añadir evento de clic para mostrar la tarjeta de información
    skillElement.addEventListener('click', () => {
        infoTitle.textContent = skill.name;
        infoDescription.textContent = skill.description;
        infoCard.style.display = 'block';
    });

    // Distribuir los cubos en las columnas
    columns[index % columns.length].appendChild(skillElement);
});

// Cerrar la tarjeta de información
closeBtn.addEventListener('click', () => {
    infoCard.style.display = 'none';
});