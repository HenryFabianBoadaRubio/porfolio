// // Three.js: Meteoritos y Cámara
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.getElementById('container').appendChild(renderer.domElement);

// // Generar meteoritos
// const meteorites = [];
// const meteoriteGeometry = new THREE.SphereGeometry(0.1, 16, 16);
// const meteoriteMaterial = new THREE.MeshBasicMaterial({ color: 0x461920 });

// for (let i = 0; i < 100; i++) {
//     const meteorite = new THREE.Mesh(meteoriteGeometry, meteoriteMaterial);
//     meteorite.position.set(
//         Math.random() * 20 - 10,
//         Math.random() * 20 - 10,
//         Math.random() * 20 - 10
//     );
//     meteorite.velocity = new THREE.Vector3(
//         Math.random() - 0.5,
//         Math.random() - 0.5,
//         Math.random() - 0.5
//     ).normalize().multiplyScalar(Math.random() * 0.1);
//     scene.add(meteorite);
//     meteorites.push(meteorite);
// }

// camera.position.z = 10;

// const animate = function () {
//     requestAnimationFrame(animate);

//     // Actualizar posición de meteoritos
//     meteorites.forEach(meteorite => {
//         meteorite.position.add(meteorite.velocity);

//         // Reciclar meteoritos fuera del rango
//         if (meteorite.position.length() > 20) {
//             meteorite.position.set(
//                 Math.random() * 20 - 10,
//                 Math.random() * 20 - 10,
//                 Math.random() * 20 - 10
//             );
//             meteorite.velocity = new THREE.Vector3(
//                 Math.random() - 0.5,
//                 Math.random() - 0.5,
//                 Math.random() - 0.5
//             ).normalize().multiplyScalar(Math.random() * 0.1);
//         }
//     });

//     renderer.render(scene, camera);
// };

// animate();

// window.addEventListener('mousemove', function(event) {
//     const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
//     const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
//     camera.position.x += (mouseX - camera.position.x) * 0.05;
//     camera.position.y += (mouseY - camera.position.y) * 0.05;
// });

// window.addEventListener('resize', function() {
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
// });

// // CSS: Cubo interactivo
// document.addEventListener('DOMContentLoaded', () => {
//     const sphere = document.querySelector('.sphere');
    
//     document.addEventListener('mousemove', (event) => {
//         const x = event.clientX / window.innerWidth - 0.5; // Normalize to range [-0.5, 0.5]
//         const y = event.clientY / window.innerHeight - 0.5; // Normalize to range [-0.5, 0.5]
        
//         // Map x and y to rotation angles
//         const rotateX = y * 20; // Adjust sensitivity as needed
//         const rotateY = x * 20; // Adjust sensitivity as needed
        
//         sphere.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
//     });
// });



  document.getElementById("myButton").addEventListener("click", function() {
    window.location.href = "./views/carga.html"
  });

