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

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x2e6ff2,
});
const box = new THREE.Mesh(geometry, material);
scene.add(box); // 화면에 box 보여주기
renderer.render(scene, camera);
