import * as THREE from "three";

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
camera.position.set(5, 5, 5);
camera.lookAt(1, 1, 1);

// 3. Renderer: Scene + Camera, 화면을 그려주는 역할
const renderer = new THREE.WebGL1Renderer({
  canvas: $result,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setSize($result.clientWidth, $result.clientHeight);

// 빛 추가
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);

// 정 12면체
const geometry = new THREE.DodecahedronGeometry(1);
const material = new THREE.MeshStandardMaterial({
  color: 0xffaaa,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// 1. 위치
// mesh.position.x = 2;
// mesh.position.y = 1;
mesh.position.set(0, 2, 1); // x, y, z

// 2. 회전
// mesh.rotation.y = 360;
mesh.rotation.y = THREE.MathUtils.degToRad(30); // y축을 기준으로 30도 회전

// 3. 크기
mesh.scale.x = 1.2; // mesh를 기준으로 1보다 크면 확대
mesh.scale.z = 0.8; // mesh를 기준으로 1보다 작으면 축소

// axesHelper 좌표축 추가
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);
// mesh.position.x = 3; // 이동

// 움직이게 하기
function animate() {
  mesh.rotation.y += 0.01;
  // console.log(box.rotation.y);
  renderer.render(scene, camera);
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
