import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const $result = document.getElementById("result");

// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);

// 2. Camera: Scene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(
  50,
  $result.clientWidth / $result.clientHeight,
  0.1,
  1000
);
camera.position.set(5, 5, 5);
camera.lookAt(0, 0, 0);

// 3. Renderer: Scene + Camera, 화면을 그려주는 역할
const renderer = new THREE.WebGL1Renderer({
  canvas: $result,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // 캔버스 생성
renderer.setSize($result.clientWidth, $result.clientHeight);

// 빛 추가
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);

// 한라봉
// const bodyMaterial = new THREE.MeshStandardMaterial({
//   color: 0xff7f00,
//   // wireframe: true,
// });
// const bottomGeometry = new THREE.DodecahedronGeometry(2, 1);
// const bottom = new THREE.Mesh(bottomGeometry, bodyMaterial);
// scene.add(bottom);

// // 한라봉 윗 부분
// const topGeometry = new THREE.TetrahedronGeometry(0.8, 3);
// const top = new THREE.Mesh(topGeometry, bodyMaterial);
// scene.add(top);
// top.position.y = 1.7;

// const leafMaterial = new THREE.MeshStandardMaterial({
//   color: 0x008000,
//   side: THREE.DoubleSide, // 양면 활용
// });

// // 한라봉 심지
// const steamGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.4);
// const steam = new THREE.Mesh(steamGeometry, leafMaterial);
// scene.add(steam);
// steam.position.y = 2.5;

// // 나뭇잎 부분
// const leafGeometry = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI / 3);
// const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
// scene.add(leaf);
// leaf.position.set(-0.5, 2.4, -0.1);
// leaf.rotation.z = Math.PI / -2;

// 나무
const trunkMaterial = new THREE.MeshStandardMaterial({
  color: 0xa38049,
});
const trunkGeometry = new THREE.CylinderGeometry(0.8, 1, 1.5);
const trunk1 = new THREE.Mesh(trunkGeometry, trunkMaterial);
scene.add(trunk1);

const trunk2 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk2.position.set(0.1, 1.3, 0);
trunk2.scale.set(0.9, 0.9, 0.9);
trunk2.rotation.z = THREE.MathUtils.degToRad(-5);
scene.add(trunk2);

const trunk3 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk3.position.set(0.2, 2.5, 0);
trunk3.scale.set(0.8, 0.8, 0.8);
trunk3.rotation.z = THREE.MathUtils.degToRad(-5);
scene.add(trunk3);

const trunk4 = new THREE.Mesh(trunkGeometry, trunkMaterial);
trunk4.position.set(0.3, 3.5, 0);
trunk4.scale.set(0.7, 0.7, 0.7);
trunk4.rotation.z = THREE.MathUtils.degToRad(-8);
scene.add(trunk4);

const leafMaterial = new THREE.MeshStandardMaterial({
  color: 0x84ad88,
  side: THREE.DoubleSide,
});
const leafGeometry = new THREE.SphereGeometry(
  2,
  32,
  16,
  Math.PI / 3,
  Math.PI / 3
);
const leaf1 = new THREE.Mesh(leafGeometry, leafMaterial);
leaf1.rotation.x = Math.PI / -2;
leaf1.position.set(0, 3.2, 2);
scene.add(leaf1);

const leaf2 = new THREE.Mesh(leafGeometry, leafMaterial);
// leaf2.rotation.reorder("ZXY"); // 순서 기준을 z x y 로 바꿈
leaf2.rotation.x = Math.PI / -2;
leaf2.rotation.z = Math.PI / 2;
leaf2.position.set(2, 3.2, 0);
scene.add(leaf2);

const leaf3 = new THREE.Mesh(leafGeometry, leafMaterial);
leaf3.rotation.x = Math.PI / -2;
leaf3.rotation.z = Math.PI;
leaf3.position.set(0, 3.2, -2);
scene.add(leaf3);

const leaf4 = new THREE.Mesh(leafGeometry, leafMaterial);
leaf4.rotation.x = Math.PI / -2;
leaf4.rotation.z = Math.PI / -2;
leaf4.position.set(-2, 3.2, 0);
scene.add(leaf4);

const axes = new THREE.AxesHelper(10);
scene.add(axes);

// OrbitControls 드래그 휠
const controls = new OrbitControls(camera, renderer.domElement);

// 조작 범위 지정 (최소 최대 확대 거리 설정)
// controls.maxPolarAngle = Math.PI / 3; // 드래그 해서 회전 되는 각도를 지정해 줄수 있다.

// controls.autoRotate = true; // 움직이게 설정
// controls.autoRotateSpeed = -10; // 움직임 속도

// controls.enableDamping = true; // 드래그로 회전시 관성 적용

// 움직이게 하기
function animate() {
  renderer.render(scene, camera);
  controls.update(); // 드래그 휠 가능
  requestAnimationFrame(animate);
}
animate();

// 반응형
window.addEventListener("resize", () => {
  // 1. 카메라의 종횡비
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // 카메라 속성 업데이트

  // 2. 렌더러의 크기
  renderer.setSize(window.innerWidth, window.innerHeight);
});
