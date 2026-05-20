import * as THREE from 'three';
import './style.css';

import img1 from './img/img1.jpg';
import img2 from './img/img2.jpg';

const container = document.querySelector('.three_bg');

const loader = new THREE.TextureLoader();

// ========================================
// SCENE
// ========================================

const scene = new THREE.Scene();

// ========================================
// CAMERA
// ========================================

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 7;

// ========================================
// RENDERER
// ========================================

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setClearColor(0x000000, 0);

container.appendChild(renderer.domElement);

// ========================================
// TEXTURE
// ========================================

const texture1 = loader.load(img1);
const texture2 = loader.load(img2);

texture1.wrapS = THREE.ClampToEdgeWrapping;
texture1.wrapT = THREE.ClampToEdgeWrapping;

texture2.wrapS = THREE.ClampToEdgeWrapping;
texture2.wrapT = THREE.ClampToEdgeWrapping;

// ========================================
// GEOMETRY
// ========================================

const geometry = new THREE.PlaneGeometry(
    20,
    12,
    100,
    100
);

// ========================================
// MATERIAL
// ========================================

const material = new THREE.MeshBasicMaterial({
    map: texture1
});

// ========================================
// MESH
// ========================================

const mesh = new THREE.Mesh(
    geometry,
    material
);

scene.add(mesh);

// ========================================
// ANIMATION
// ========================================

const vertexCount = geometry.attributes.position.count;

const clock = new THREE.Clock();

function animate() {

    const time = clock.getElapsedTime();

    for (let i = 0; i < vertexCount; i++) {

        const x = geometry.attributes.position.getX(i);
        const y = geometry.attributes.position.getY(i);

        const wave1 =
            0.25 * Math.sin(x * 0.8 + time);

        const wave2 =
            0.25 * Math.sin(y * 1.2 + time);

        const wave3 =
            0.15 * Math.sin((x + y) * 1.5 + time);

        geometry.attributes.position.setZ(
            i,
            wave1 + wave2 + wave3
        );
    }

    geometry.computeVertexNormals();

    geometry.attributes.position.needsUpdate = true;

    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

animate();

// ========================================
// RESIZE
// ========================================

window.addEventListener('resize', () => {

    camera.aspect =
        window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );
});

// ========================================
// CHANGE IMAGE ON CLICK
// ========================================

let currentImage = 1;

window.addEventListener('click', () => {

    currentImage++;

    if (currentImage % 2 === 0) {

        material.map = texture2;

    } else {

        material.map = texture1;
    }

    material.needsUpdate = true;
});