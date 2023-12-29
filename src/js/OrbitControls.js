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
camera.position.set(2, 2, 2);
camera.lookAt(1, 1, 1);

// 3. Renderer: Scene + Camera, 화면을 그려주는 역할
const renderer = new THREE.WebGL1Renderer({
  canvas: $result,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
// console.log(renderer);
document.body.appendChild(renderer.domElement); // 캔버스 생성
renderer.setSize($result.clientWidth, $result.clientHeight);

// 빛 추가
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);

// 예시 도형
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x2e6ff2,
});
const box = new THREE.Mesh(geometry, material);
scene.add(box);

// OrbitControls 드래그 휠
const controls = new OrbitControls(camera, renderer.domElement);
// 속성을 이용하여 조작 설정
// controls.enableZoom = false; // 확대 축소 방지
// controls.enableRotate = false; // 카메라 확대 축소 방지
// controls.enablePan = false; // 커맨드 or 컨트롤 + 드래그 방지

// 조작 범위 지정 (최소 최대 확대 거리 설정)
// controls.minDistance = 2;
// controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI / 3; // 드래그 해서 회전 되는 각도를 지정해 줄수 있다.

controls.autoRotate = true; // 움직이게 설정
controls.autoRotateSpeed = -10; // 움직임 속도

controls.enableDamping = true; // 드래그로 회전시 관성 적용

// 움직이게 하기
function animate() {
  // box.rotation.y += 0.01;
  renderer.render(scene, camera);
  controls.update(); // 드래그 휠 가능
  // THREE.js 애니메이션 표현
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
