import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import { OrbitControls } from "three/addons/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

const ambientLight = new THREE.AmbientLight(0x666666, 3);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(10, 10, 10);
scene.add(dirLight);

const loader = new GLTFLoader();
loader.load("scan2.glb", function (gltf) {
  scene.add(gltf.scene);
});

loader.load("scan5.glb", function (gltf) {
  console.log(gltf.scene);
  const baseMesh = gltf.scene.children[0];
  for (let i = 0; i < 40; i++) {
    let x = Math.random() * 10 - 5;
    let y = Math.random() * 10 - 5;
    let z = Math.random() * 10 - 5;

    const newMesh = baseMesh.clone();
    newMesh.position.x = x;
    newMesh.position.y = y;
    newMesh.position.z = z;
    const mirrorMesh = baseMesh.clone();
    mirrorMesh.position.x = -x;
    mirrorMesh.position.y = y;
    mirrorMesh.position.z = z;
    mirrorMesh.rotation.y = Math.PI;
    scene.add(mirrorMesh);
    scene.add(newMesh);
  }

  //   scene.add(gltf.scene);
});

camera.position.z = 5;

function animate() {
  requestAnimationFrame(animate);

  //   cube.rotation.x += 0.01;
  //   cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();
