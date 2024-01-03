import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const $result = document.getElementById("result");

// 장면
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

const camera = new THREE.PerspectiveCamera(
  50,
  $result.clientWidth / $result.clientHeight,
  0.1,
  1000
);
camera.position.set(3, 3, 3);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: $result,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 텍스처 객체 만드는 방법 loader.load();
const loader = new THREE.TextureLoader();
const basecolor = loader.load("../../src/textures/bark/Bark_06_basecolor.jpg");
const normal = loader.load("../../src/textures/bark/Bark_06_normal.jpg");
const rough = loader.load("../../src/textures/bark/Bark_06_roughness.jpg");
const height = loader.load("../../src/textures/bark/Bark_06_height.png");

// 도형
const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshStandardMaterial({
  // color: 0x2e6ff2,
  map: basecolor, // map 속성은 재질의 색상을 결정
  normalMap: normal, // 표면의 빛을 왜곡시켜 입체감 표현
  // normalScale: new THREE.Vector2(0, 0), // 빝의 왜곡의 정도 2차원의 vector 값을 갖는 normalScale 로 조절 가능 기본값(1, 1),
  roughness: 0.4, // 표면의 빛을 반사
  roughnessMap: rough, // 거칠기,관택,질감에 따른 빛의 굴곡을 표현 / 밝은 곳은 매끈한 표면, 어두운 곳은 거친곳
  displacementMap: height, // 명암에 따라서 표면의 높낮이 조절 / 밝은 부분은 높게 어두운 부분은 낮게 표현
  displacementScale: 0.2, // 높낮이의 정도 조절
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
cube.castShadow = true;

const geometry2 = new THREE.PlaneGeometry(10, 10);
const material2 = new THREE.MeshStandardMaterial({
  color: 0x81a8f7,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry2, material2);
plane.rotation.x = Math.PI / -2;
plane.position.y = -1;
scene.add(plane);
plane.receiveShadow = true;

// 빛 - DirectionalLight, PointLight, SpotLight
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0, 2, 2);
scene.add(dl);
dl.castShadow = true;

// OrbitContorls
const controls = new OrbitControls(camera, renderer.domElement);

// controls.autoRotate = true;
controls.autoRotateSpeed = -10;

controls.enableDamping = true;

function animate() {
  renderer.render(scene, camera);
  controls.update();
  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // 카메라 업데이트

  renderer.setSize(window.innerWidth, window.innerHeight);
});
