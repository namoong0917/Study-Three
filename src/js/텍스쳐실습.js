import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import printTangerine from "../mesh/tangerine.js";
import printTree from "../mesh/tree.js";
import printMountain from "../mesh/mountain.js";

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
camera.position.set(0, 10, 20);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: $result,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.5)); // 전체 색 확인용 밝기

// 한라봉
const fruit = printTangerine();
fruit.position.x = -5;
scene.add(fruit);

// 나무
const tree = printTree();
tree.position.x = 5;
scene.add(tree);

// 산
const mountain = printMountain();
scene.add(mountain);

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
