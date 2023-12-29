import * as THREE from "three";

const $result = document.getElementById("result");

// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);
// scene.add(요소);

// 2. Camera: Scene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(
  50,
  $result.clientWidth / $result.clientHeight,
  0.1,
  1000
);
camera.position.set(2, 2, 2);
camera.lookAt(0, 0, 0);

// 3. Renderer: Scene + Camera, 화면을 그려주는 역할
const renderer = new THREE.WebGLRenderer({ canvas: $result, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const basic = new THREE.MeshBasicMaterial({
  color: 0xffaaa,
  // wireframe: true,
  transparent: true, // 투명도를 주려면 transparent 가 무조건 true 여야 한다.
  opacity: 0.4, // 투명도
});

// 스탠다드 재질
const standard = new THREE.MeshStandardMaterial({
  color: 0xffaaa,
  roughness: 0.2, // 거칠기
  metalness: 0.8, // 금속질감
  // map: // 텍스쳐
  // side: THREE.BackSide, // 렌더링 면 지정할수있음 DoubleSide는 양면 가능
});

// 스탠다드 머터리얼의 확장 버전 고급 물리 기반의 렌더링 제공, 스탠다드 보다 물리적 특성을 표현할 수 있다.
const physical = new THREE.MeshPhysicalMaterial({
  color: 0xffaaaa,
  clearcoat: 0.8,
  clearcoatRoughness: 0.2, // 클리어 코트의 거칠기는 주로 표면의 부드러움과 광택을 결정짓는 중요한 요소
});

// mesh phong 머터리얼은 빛의 반사율
const phong = new THREE.MeshPhongMaterial({
  color: 0xffaaaa,
  shininess: 100, // 빛의 반사율 정도
  specular: 0x2e6ff2, // 물체가 반사하는 빛의 색을 지정할수있다.
});
const mesh = new THREE.Mesh(geometry, standard);
scene.add(mesh);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), standard);
// scene.add(plane);

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// 반응형
window.addEventListener("resize", () => {
  // 1. 카메라의 종횡비
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix(); // 카메라 업데이트

  // 2. 렌더러의 크기
  renderer.setSize(window.innerWidth, window.innerHeight);
});
