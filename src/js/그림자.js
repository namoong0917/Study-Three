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
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// 도형
const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshStandardMaterial({ color: 0x2e6ff2 });
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

// scene 에 그림자를 추가하기 위한 3가지 속성을 지정해줘야 한다.
// 1. renderer에 shadowMap을 활성화 해준다 - renderer.shadowMap.enabled = true;
// 2. 빛에 그림자를 생성하는 속성을 적용 - ?.castShadow = true;
// 3. 그림자를 만들거나 그림자를 맺히게 할 Mesh의 속성을 적용 -
// 그림자를 만들 Mesh에 - ?.castShadow = true;
// 그림자가 맺힐 Mesh에 - ?.receiveShadow = true;
// 3-1. 그림자 해상도 shadow.mapSize 를 이용해 그림자의 해상도를 변경할 수 있다.
// 그림자와 블러는 크면 클수록 부드러운 가장자리 효과를 주며, 랜더링 소스가 증가해서 속도가 느려질 수있다.
// dl.shadow.mapSize.width = 1024;
// dl.shadow.mapSize.height = 1024;
// 그림자 블러
// dl.shadow.radius = 5;

// 빛 - DirectionalLight, PointLight, SpotLight
const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(0, 2, 2);
scene.add(dl);
dl.castShadow = true;

// 랜더링 속도와 그림자의 표현을 고려하여 그림자,블러의 속성값을 줘야한다.
// 그림자 해상도
dl.shadow.mapSize.width = 1024; // 기본값 512 높일수록 랜더링 소스가 증가해서 속도가 느려질 수있다.
dl.shadow.mapSize.height = 1024;

// 그림자 블러
dl.shadow.radius = 5; // 크면 클수록 부드러운 가장자리 효과, 랜더링 소스가 증가해서 속도가 느려질 수있다.

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
