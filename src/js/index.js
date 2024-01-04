import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import printIsland from "../mesh/island.js";
import printTangerine from "../mesh/tangerine.js";
import printTree from "../mesh/tree.js";
import printMountain from "../mesh/mountain.js";
import printStone from "../mesh/stone.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// 장면구조
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x7ccad5);

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 15, 15);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 그림자
renderer.shadowMap.enabled = true;

// 처음 시작 기본 도형
// const geo = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshStandardMaterial({
//   color: 0xffe272,
// });
// const mesh = new THREE.Mesh(geo, material);
// scene.add(mesh);

// 섬
const island = printIsland();
scene.add(island);

// 한라봉
const tangerine = printTangerine();
tangerine.position.set(-5, 1, -1);
scene.add(tangerine);

const miniTan = printTangerine();
miniTan.scale.set(0.7, 0.7, 0.7);
miniTan.position.set(-6, 0.4, 1.5);
scene.add(miniTan);
// console.log(miniTan);

// 나무
const tree = printTree();
tree.position.set(5, -0.5, -1);
tree.rotation.y = Math.PI / -3;
scene.add(tree);

const miniTree = printTree();
miniTree.position.set(6.5, -0.5, 1);
miniTree.scale.set(0.6, 0.6, 0.6);
scene.add(miniTree);

// 산
const mountain = printMountain();
mountain.scale.set(1.2, 1.6, 1);
mountain.position.set(0, 2.3, -1.8);
scene.add(mountain);

const myChar = printStone();
myChar.position.set(3, -0.5, 1);
myChar.scale.set(0.9, 0.9, 0.9);
myChar.rotation.y = Math.PI / -8;
scene.add(myChar);

// 외부 모델
const modelLoader = new GLTFLoader().setPath("../../src/models/");
modelLoader.load("furry_ball_2_electric_boogaloo_real_fur_test.glb", (gltf) => {
  const model = gltf.scene;
  model.position.set(-2.8, 0.6, 1);
  model.rotation.y = Math.PI / 8;
  scene.add(model);
  // 외부 모델에 그림자
  // console.log(model);
  // model.castShadow = true;
  // model.receiveShadow = true;
  for (const mesh of model.children) {
    // 그림자를 만드는 mesh에는 castShadow를 사용하며
    // 그림자를 받는 mesh에는 receiveShadow을 이용
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }
});

// 빛
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 1, 2);
scene.add(directionalLight);
// 그림자 적용 시킬 빛에 설정
directionalLight.castShadow = true;

const pl1 = new THREE.PointLight(0xff8c00, 1.5);
pl1.position.set(5, 0, 0);
scene.add(pl1);

const pl2 = new THREE.PointLight(0xffe287, 2);
pl2.position.set(-3, 2, 0);
scene.add(pl2);

// OrbitControls
const control = new OrbitControls(camera, renderer.domElement);
control.autoRotate = true;
control.autoRotateSpeed = -1;
control.minDistance = 10;
control.maxDistance = 30;

function animate() {
  control.update();
  renderer.render(scene, camera);

  requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
