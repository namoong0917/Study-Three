import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

const $result = document.getElementById("result");

// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287); // scene은 기본값이 검정이므로 변경
// scene.add(요소);

// 배경
const loader = new THREE.TextureLoader();
const texture = loader.load(
  "../../src/data/blaubeuren_church_square.jpg",
  () => {
    const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
    rt.fromEquirectangularTexture(renderer, texture);
    scene.background = rt.texture;
  }
);

// 2. Camera: Scene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(
  50, // fov : 시야각, 커질 수록 화면에 많은 영역을 출력 기본값 50,사람의 시야와 유사한 45~75 사이 값 사용
  $result.clientWidth / $result.clientHeight, // aspect 카메라의 종횡비
  0.1, // near 카메라로 볼 수 있는 최소 거리
  1000 // far 카메라로 볼 수 있는 최대 거리
);
camera.position.set(2, 2, 2); // 객체 위치 (x, y, z)
camera.lookAt(1, 1, 1); // 바라볼 좌푝값 (x, y, z)

// 3. Renderer: Scene + Camera, 화면을 그려주는 역할
// 원하는곳에 canvas를 출력하기위해 WebGLRenderer() 안에 속성값으로
// { canvas: 선택한 돔 요소 } 를 넣어준다.
// antialias: true : 계단현상 안티엘리징
const renderer = new THREE.WebGLRenderer({
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
const geometry = new THREE.SphereGeometry(1, 64, 32);
const material = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0.1,
  roughness: 0.05,
  // ior: 1.7, // 굴절률
  thickness: 0.2, // 두께 (클수록 유리뒷쪽이 왜곡되어보임)
  reflectivity: 1,
  specularIntensity: 1,

  // wireframe: true,

  transparent: true,
  opacity: 1,
  transmission: 1,
  // side: THREE.DoubleSide,
});
console.log(material);
const won = new THREE.Mesh(geometry, material);
scene.add(won); // 화면에 보여주기
renderer.render(scene, camera); // scene 과 camera 정보를 담아 화면에 출력 연결

// 움직이게 하기
// OrbitContorls
const controls = new OrbitControls(camera, renderer.domElement);

controls.minDistance = 3;
controls.maxDistance = 5;
// controls.maxPolarAngle = Math.PI / 3;

controls.autoRotate = true;
controls.autoRotateSpeed = 1;

controls.enableDamping = true;

function animate() {
  controls.update();
  // console.log(won.rotation.y);
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
