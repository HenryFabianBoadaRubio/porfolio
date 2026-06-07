// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

renderer.setClearColor('#black');
const textureLoader = new THREE.TextureLoader();

const geometry = new THREE.TorusGeometry(4, 0.9, 76, 80);

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
            float dist = length(mousePos - (vPosition.xy * 0.5));
            float wave = sin(pos.x * 15.0 + time) * 0.6;
            wave += sin(pos.y * 15.0 + time) * 0.6;
            wave *= (1.0 - dist);
            pos += normalize(position) * wave;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
    `,
    fragmentShader: `
        varying vec3 vPosition;
        varying vec2 vUv;
        uniform float time;
        void main() {
            vec3 baseColor = vec3(1.0, 0.0, 0.0);
            float r = baseColor.r + 0.2 * sin(time * 0.5 + vPosition.x * 2.0);
            float g = baseColor.g + 0.2 * sin(time * 0.5 + vPosition.y * 2.0);
            float b = baseColor.b + 0.2 * sin(time * 0.5 + vPosition.z * 2.0);
            vec3 color = vec3(r, g, b);
            float intensity = abs(sin(vPosition.x * 10.0)) * 0.5 + 0.5;
            color = mix(baseColor, color, intensity);
            float glow = max(0.0, 1.0 - length(vPosition) * 0.1);
            vec3 glowColor = vec3(1.0, 0.3, 0.0);
            gl_FragColor = vec4(color + glowColor, 1.0);
        }
    `,
    uniforms: {
        time: { value: 0 },
        mousePos: { value: new THREE.Vector2(0.5, 0.5) }
    }
});

const sphere = new THREE.Mesh(geometry, material);
sphere.scale.set(1, 1, 1);
scene.add(sphere);
sphere.position.set(8.5, 0, 0);
camera.position.z = 7;

function onMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    material.uniforms.mousePos.value.set(mouseX, mouseY);
}
window.addEventListener('mousemove', onMouseMove, false);

function animate() {
    requestAnimationFrame(animate);
    material.uniforms.time.value += 0.04;
    sphere.rotation.x += 0.005;
    sphere.rotation.y += 0.005;
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

document.addEventListener('DOMContentLoaded', () => {
    const h1 = document.querySelector('h1');
    if (!h1) return;
    const text = h1.textContent;
    const japaneseChars = 'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん';
    const chars = text.split('');
    const interval = setInterval(() => {
        let currentText = '';
        chars.forEach((char) => {
            currentText += Math.random() > 0.5
                ? japaneseChars[Math.floor(Math.random() * japaneseChars.length)]
                : char;
        });
        h1.textContent = currentText;
    }, 50);
    setTimeout(() => { clearInterval(interval); h1.textContent = text; }, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const overlay = document.getElementById('overlay');
    const menu = document.querySelector('.menu');
    const mainContent = document.querySelector('.main-container');
    if (!menuToggle || !overlay || !menu) return;
    menuToggle.addEventListener('change', () => {
        if (menuToggle.checked) {
            overlay.classList.add('show'); menu.classList.add('show');
            mainContent && mainContent.classList.add('blur');
        } else {
            overlay.classList.remove('show'); menu.classList.remove('show');
            mainContent && mainContent.classList.remove('blur');
        }
    });
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            menuToggle.checked = false;
            overlay.classList.remove('show'); menu.classList.remove('show');
            mainContent && mainContent.classList.remove('blur');
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

window.addEventListener('scroll', function() {
    const section = document.querySelector('.contenedor__vista__perfil');
    const texto = document.querySelector('.texto__acerca p');
    if (!section || !texto) return;
    if (section.getBoundingClientRect().top < window.innerHeight / 1.3)
        texto.classList.add('visible');
});

/* SKILLS */
const skills = [
    { name: 'HTML',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',           description: 'HTML es el lenguaje de marcado estandar para crear paginas web.' },
    { name: 'CSS',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',             description: 'CSS describe la presentacion de un documento HTML.' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', description: 'JavaScript permite crear contenido dinamico en la web.' },
    { name: 'Python',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',         description: 'Python: versatil y de alto nivel, usado en web, datos e IA.' },
    { name: 'Node.js',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',         description: 'Node.js: entorno de ejecucion JavaScript en el servidor.' },
    { name: 'SQL',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',           description: 'SQL: lenguaje estandar para bases de datos relacionales.' },
    { name: 'Git',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',               description: 'Git: sistema de control de versiones distribuido.' },
    { name: 'npm',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg',      description: 'npm: gestor de paquetes para Node.js.' },
    { name: 'VS Code',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',         description: 'VS Code: editor de codigo ligero y potente.' },
    { name: 'Canva',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg',           description: 'Canva: herramienta de diseno grafico en linea.' },
    { name: 'GitHub',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',         description: 'GitHub: plataforma de desarrollo colaborativo con Git.' },
    { name: 'Figma',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',           description: 'Figma: diseno de interfaces y prototipos colaborativos.' },
    { name: 'Linux',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg',           description: 'Linux: SO de codigo abierto, estable y flexible.' },
    { name: 'MongoDB',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',       description: 'MongoDB: base de datos NoSQL orientada a documentos.' },
    { name: 'MySQL',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',           description: 'MySQL: sistema de gestion de bases de datos relacional.' },
    { name: 'Express',    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',       description: 'Express: framework web minimalista para Node.js.' }
];

const columns = document.querySelectorAll('.carousel-column');
const infoCard = document.getElementById('info-card');
const infoTitle = document.getElementById('info-title');
const infoDescription = document.getElementById('info-description');
const closeBtn = document.getElementById('close-btn');

skills.forEach((skill, index) => {
    const skillElement = document.createElement('div');
    skillElement.className = 'skill-cube';
    ['front', 'back', 'right', 'left', 'top', 'bottom'].forEach(face => {
        const faceElement = document.createElement('div');
        faceElement.className = `face ${face}`;
        if (['front', 'right', 'top', 'left'].includes(face)) {
            const img = document.createElement('img');
            img.src = skill.icon; img.alt = skill.name;
            faceElement.appendChild(img);
        } else { faceElement.textContent = skill.name; }
        skillElement.appendChild(faceElement);
    });
    skillElement.addEventListener('click', () => {
        infoTitle.textContent = skill.name;
        infoDescription.textContent = skill.description;
        infoCard.style.display = 'block';
    });
    columns[index % columns.length].appendChild(skillElement);
});
closeBtn && closeBtn.addEventListener('click', () => { infoCard.style.display = 'none'; });

/* CARRUSEL DE SERVICIOS */
let slideIndex = 0;
function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-item');
    if (!slides.length) return;
    if (index >= slides.length) slideIndex = 0;
    else if (index < 0) slideIndex = slides.length - 1;
    else slideIndex = index;
    const carousel = document.querySelector('.carousel');
    if (carousel) carousel.style.transform = `translateX(${-slideIndex * 100}%)`;
}
function moveSlide(step) { showSlide(slideIndex + step); }
document.addEventListener('DOMContentLoaded', () => { showSlide(slideIndex); });

/* FONDO bolitas */
document.addEventListener('DOMContentLoaded', () => {
    const bg = document.getElementById('background');
    if (!bg) return;
    const colors = ['#e67e22', '#f39c12', '#d35400'];
    const balls = [];
    for (let i = 0; i < 50; i++) {
        const ball = document.createElement('div');
        ball.classList.add('ball');
        const size = Math.random() * 7 + 1;
        ball.style.cssText = `width:${size}px;height:${size}px;top:${Math.random()*100}vh;left:${Math.random()*100}vw;background-color:${colors[Math.floor(Math.random()*colors.length)]};`;
        bg.appendChild(ball);
        balls.push({ element: ball, top: parseFloat(ball.style.top), left: parseFloat(ball.style.left), deltaX: (Math.random()-0.5)*0.04, deltaY: (Math.random()-0.5)*0.04 });
    }
    function animateBalls() {
        balls.forEach(b => {
            b.top += b.deltaY; b.left += b.deltaX;
            if (b.top > 110 || b.top < -10 || b.left > 110 || b.left < -10) {
                b.top = Math.random()*100; b.left = Math.random()*100;
                b.deltaX = (Math.random()-0.5)*0.04; b.deltaY = (Math.random()-0.5)*0.04;
            }
            b.element.style.top = `${b.top}vh`; b.element.style.left = `${b.left}vw`;
        });
        requestAnimationFrame(animateBalls);
    }
    animateBalls();
    document.addEventListener('mousemove', event => {
        balls.forEach(b => {
            const r = b.element.getBoundingClientRect();
            const cx = r.left + r.width/2, cy = r.top + r.height/2;
            const dx = event.clientX - cx, dy = event.clientY - cy;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 50) { b.deltaX += (dx/dist)*(1-dist/50); b.deltaY += (dy/dist)*(1-dist/50); }
        });
    });
});

/* PROYECTOS flip */
document.addEventListener('DOMContentLoaded', function() {
    const items = document.querySelectorAll('.item');
    const modal = document.getElementById('modal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('.close');
    let isZoomed = false;
    const flipTimeouts = new Map();
    function startFlipTimeout(item) {
        if (flipTimeouts.has(item)) clearTimeout(flipTimeouts.get(item));
        flipTimeouts.set(item, setTimeout(() => item.classList.remove('flipped'), 7000));
    }
    items.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (!isZoomed) {
                if (modal && modalImg && img) {
                    modalImg.src = img.src; modal.style.display = 'flex'; isZoomed = true;
                    setTimeout(() => {
                        if (isZoomed) { modal.style.display = 'none'; this.classList.add('flipped'); isZoomed = false; startFlipTimeout(this); }
                    }, 1500);
                }
            } else {
                this.classList.toggle('flipped');
                if (this.classList.contains('flipped')) startFlipTimeout(this);
                else { clearTimeout(flipTimeouts.get(this)); flipTimeouts.delete(this); }
            }
        });
        item.addEventListener('mouseenter', function() { if (this.classList.contains('flipped')) startFlipTimeout(this); });
    });
    if (closeBtn) closeBtn.onclick = () => { modal.style.display = 'none'; isZoomed = false; };
    window.onclick = e => { if (e.target === modal) { modal.style.display = 'none'; isZoomed = false; } };
});

/* ============================================================
   CARRUSEL DE PROYECTOS — escritorio infinito / movil swipe
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

    const esMovil = window.innerWidth <= 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const carruseles = document.querySelectorAll('.carrusel__proyectos');

    if (esMovil) {
        /* Wrapper global para los dos carruseles + sus puntos */
        const wrapper = document.createElement('div');
        wrapper.style.cssText = 'width:100%;display:flex;flex-direction:column;gap:32px;padding:0 0 16px;';

        /* Insertar el wrapper donde estaba el primer carrusel */
        const primerCarrusel = carruseles[0];
        primerCarrusel.parentElement.insertBefore(wrapper, primerCarrusel);

        carruseles.forEach(carrusel => {
            const galerias = Array.from(carrusel.querySelectorAll('.galeria'));
            if (!galerias.length) return;

            let current = 0;

            /* Bloque por carrusel: slider + puntos */
            const bloque = document.createElement('div');
            bloque.style.cssText = 'width:100%;display:flex;flex-direction:column;align-items:center;gap:12px;';

            /* Slider */
            const slider = document.createElement('div');
            slider.style.cssText = 'width:100%;overflow:hidden;position:relative;';

            const inner = document.createElement('div');
            inner.style.cssText = 'display:flex;width:100%;transition:transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94);will-change:transform;';

            galerias.forEach(g => {
                g.style.cssText = 'min-width:100%;flex-shrink:0;padding:0 12px;box-sizing:border-box;';
                inner.appendChild(g);
            });

            slider.appendChild(inner);

            /* Puntos */
            const dots = document.createElement('div');
            dots.style.cssText = 'display:flex;justify-content:center;gap:8px;';

            galerias.forEach((_, i) => {
                const dot = document.createElement('span');
                dot.style.cssText = `display:inline-block;width:8px;height:8px;border-radius:50%;background:${i === 0 ? 'orangered' : 'rgba(255,255,255,0.3)'};transition:background 0.3s;cursor:pointer;`;
                dot.addEventListener('click', () => goTo(i));
                dots.appendChild(dot);
            });

            function updateDots() {
                Array.from(dots.children).forEach((dot, i) => {
                    dot.style.background = i === current ? 'orangered' : 'rgba(255,255,255,0.3)';
                });
            }
            function goTo(n) {
                current = (n + galerias.length) % galerias.length;
                inner.style.transform = `translateX(-${current * 100}%)`;
                updateDots();
            }

            /* Swipe tactil */
            let startX = 0, startY = 0, isDragging = false;
            inner.addEventListener('touchstart', e => {
                startX = e.touches[0].clientX; startY = e.touches[0].clientY; isDragging = true;
            }, { passive: true });
            inner.addEventListener('touchmove', e => {
                if (!isDragging) return;
                if (Math.abs(e.touches[0].clientX - startX) > Math.abs(e.touches[0].clientY - startY))
                    e.preventDefault();
            }, { passive: false });
            inner.addEventListener('touchend', e => {
                if (!isDragging) return;
                isDragging = false;
                const diff = startX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
            }, { passive: true });

            bloque.appendChild(slider);
            bloque.appendChild(dots);
            wrapper.appendChild(bloque);
        });

        return; /* no clonar en movil */
    }

    /* ESCRITORIO: carrusel infinito animado */
    carruseles.forEach((carrusel, index) => {
        const direction = index === 0 ? -1 : 1;
        const elementos = Array.from(carrusel.children);
        let count = 0;
        while (count < 20) {
            elementos.forEach(el => { if (count >= 20) return; carrusel.appendChild(el.cloneNode(true)); count++; });
        }
        let posicion = 0;
        function mover() {
            posicion += 0.4;
            const hijos = Array.from(carrusel.children);
            const anchoTotal = hijos.reduce((t, el) => t + el.offsetWidth + 30, 0);
            hijos.forEach(el => { el.style.transform = `translateX(${posicion * direction}px)`; });
            if (posicion >= anchoTotal) posicion = 0;
            requestAnimationFrame(mover);
        }
        requestAnimationFrame(mover);
    });

});