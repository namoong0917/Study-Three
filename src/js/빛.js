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

// 도형
const geometry = new THREE.SphereGeometry(1);
const material = new THREE.MeshStandardMaterial({ color: 0x2e6ff2 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const geometry2 = new THREE.PlaneGeometry(10, 10);
const material2 = new THREE.MeshStandardMaterial({
  color: 0x81a8f7,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry2, material2);
plane.rotation.x = Math.PI / -2;
plane.position.y = -1;
scene.add(plane);

// 빛 의 종류

// 1. ambientLight
// 객체의 출력이나 재질을 확인할때 좋음
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // 빛, 강도
// scene.add(ambientLight);

// 2. directionalLight
// 해빛과 같은 방향성 광원, 모든 점에서 일정한 방향으로 빛을 발산 거리에 관계없이 동일한 빛의 효과를 주게된다.
// 빛의 기본위치로 (0, 1, 0)을 비추며, 빛은 원점인 (0,0,0) 을 향한다.
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 빛, 강도
directionalLight.position.set(-2, 2, 0);
// console.log(directionalLight); // target 속성에 position이 (0,0,0) 으로 되어있다.
directionalLight.target.position.set(0, 2, 0);
// scene.add(directionalLight);

// 2-1. directionalLight의 형태를 시각화 하기 위해 LightHelper를 사용
const dlHelper = new THREE.DirectionalLightHelper(
  // Helper를 적용할 빛의 인자, Helper의 크기, Helper의 색상
  directionalLight,
  1,
  0xff0000
);
// scene.add(dlHelper);

// 3. pointLight
// 전구와 같은 역할, 한 점에서 방출되는 빛
const pointLight = new THREE.PointLight(0xff0000);
pointLight.position.set(1, 1, 0);
// scene.add(pointLight);

// 3-1. pointLight 시각화 Helper 추가
// 빛의 Helper는 ambientLight 를 제외하는 모든 빛에서 사용할 수 있다.
const plHelper = new THREE.PointLightHelper(pointLight, 1, 0x00ff00);
// pointLight는 8면체의 중심에서 모든 방향으로 빛을 발산하는것을 볼 수 있다.
// scene.add(plHelper);

// 4. Spotlight
// 무대 빛
const spotLight = new THREE.SpotLight(
  0xffffff,
  1,
  0,
  // 앵글값 spotlight 크기 값 조절
  Math.PI / 6,
  // penumbra
  0.5
); // 빛의 색상, 강도, 거리, penumbra
// scene.add(spotLight);

// 4-1. spotlight Helper
const slHelper = new THREE.SpotLightHelper(
  // 크기 값을 받지 않고 바로 색성입력
  spotLight,
  0xff0000
);
// scene.add(slHelper);
spotLight.position.y = 2; // 기본 위치가 (0,1,0) 이기 때문에 y를 2로 바꿔줌

// 5. hemisphereLight
// ambientLight 와 마찬가지로 그림자가 발생하지 않는다.
// 하늘을 향하는 면과 바닥을 향하는 면의 색상을 지정해 줄수 있는 빛
const hemisphereLight = new THREE.HemisphereLight(0xffaaaa, 0x00ff00);
scene.add(hemisphereLight);

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
