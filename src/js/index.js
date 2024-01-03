import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

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

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(2, 4, 3);
scene.add(light);

scene.add(new THREE.AmbientLight(0xffffff, 0.5));

const loader = new GLTFLoader();
loader.load(
  "../../src/models/furry_ball_2_electric_boogaloo_real_fur_test.glb",
  (gltf) => {
    console.log(gltf);
    const model = gltf.scene;
    model.position.x = 0;
    model.position.y = -1;
    // model.rotation.y = Math.PI / -2;
    // model.rotation.y = THREE.MathUtils.degToRad(30);
    controls.autoRotate = 10; // 움직임 속도
    // controls.enableDamping = true; // 드래그시 관성
    scene.add(model);
  }
);

// OrbitContorls
const controls = new OrbitControls(camera, renderer.domElement);

// controls.autoRotate = true;
// controls.autoRotateSpeed = -10;

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
