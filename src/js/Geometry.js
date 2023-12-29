import * as THREE from "three";

const $result = document.getElementById("result");

// 1. Scene: 화면에서 보여주려는 객체를 담는 공간
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe287);
// scene.add(요소);

// 2. Camera: Scene을 바라볼 시점을 결정
const camera = new THREE.PerspectiveCamera(
  50, // fov : 시야각, 커질 수록 화면에 많은 영역을 출력 기본값 50,사람의 시야와 유사한 45~75 사이 값 사용
  $result.clientWidth / $result.clientHeight, // aspect 카메라의 종횡비
  0.1, // near 출력되는 범위
  1000 // far 출력되는 범위
);
camera.position.set(2, 2, 2); // 객체 위치 (x, y, z)
// camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0); // 바라볼 좌푝값 (x, y, z)

// 3. Renderer: Scene + Camera, 화면을 그려주는 역할
// 원하는곳에 canvas를 출력하기위해 WebGLRenderer() 안에 속성값으로
// { canvas: 선택한 돔 요소 } 를 넣어준다.
// antialias: true : 계단현상 안티엘리징
const renderer = new THREE.WebGLRenderer({ canvas: $result, antialias: true });
renderer.setSize($result.clientWidth, $result.clientHeight);
// console.log(renderer);
// document.body.appendChild(renderer.domElement);

// 빛 추가
const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);

const material = new THREE.MeshStandardMaterial({
  color: 0x2e6ff2,
});

// Mesh -> 3차원의 객체
// Mesh(형태, 재질)
// 육면체
const geo1 = new THREE.BoxGeometry(1, 1, 1); // width, height, depth
const obj1 = new THREE.Mesh(geo1, material);
// scene.add(obj1);

// 원뿔
const geo2 = new THREE.ConeGeometry(0.5, 1, 32); // radius (아래 면 넓이), height, depth
const obj2 = new THREE.Mesh(geo2, material);
// scene.add(obj2);

// 원기둥
// 위 넓이, 아래 넓이, 길이, 각
const geo3 = new THREE.CylinderGeometry(0.5, 0.8, 1, 8); // radiusTop, radiusBottom, height
const obj3 = new THREE.Mesh(geo3, material);
// scene.add(obj3);

// 구
const geo4 = new THREE.SphereGeometry(1, 32, 32); // radius (구 크기), widthSegments, heightSegments
const obj4 = new THREE.Mesh(geo4, material);
scene.add(obj4);

// 평면
const geo5 = new THREE.PlaneGeometry(1, 2); // width, height
const obj5 = new THREE.Mesh(geo5, material);
// scene.add(obj5);

// 원
const geo6 = new THREE.CircleGeometry(1, 32); // 반지름, 세그먼츠(분할되는 면의 갯수)
const obj6 = new THREE.Mesh(geo6, material);
// scene.add(obj6);

// 튜브
const geo7 = new THREE.TorusGeometry(1.5, 0.2); // radius 튜브의 반지름 길이 , tube 반경 (굵기)
const obj7 = new THREE.Mesh(geo7, material);
scene.add(obj7);

function animate() {
  obj7.rotation.y += 0.01;
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
  camera.updateProjectionMatrix(); // 카메라 업데이트

  // 2. 렌더러의 크기
  renderer.setSize(window.innerWidth, window.innerHeight);
});
