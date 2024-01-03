import * as THREE from "three";

export default function printTangerine() {
  // 한라봉 그룹화
  const tangerine = new THREE.Group();
  const body = new THREE.Group();

  // 한라봉
  // 한라봉 텍스처 loader
  const loader = new THREE.TextureLoader();
  // 재질에 적용할 텍스처 객체
  const basecolor = loader.load(
    "../../src/textures/orange/Orange_001_COLOR.jpg"
  );
  const normal = loader.load("../../src/textures/orange/Orange_001_NORM.jpg");
  const rough = loader.load("../../src/textures/orange/Orange_001_ROUGH.jpg");

  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: 0xffb48c,
    map: basecolor, // 색상을 나타내는 텍스처
    normalMap: normal, // 빛의 왜곡 효과
    roughness: 0.2,
    roughnessMap: rough, // 현실감있는 재질 표현
    // wireframe: true,
  });
  const bottomGeometry = new THREE.DodecahedronGeometry(2, 1);
  const bottom = new THREE.Mesh(bottomGeometry, bodyMaterial);
  body.add(bottom);

  // 한라봉 윗 부분
  const topGeometry = new THREE.TetrahedronGeometry(0.8, 3);
  const top = new THREE.Mesh(topGeometry, bodyMaterial);
  top.position.y = 1.7;
  body.add(top);

  const leaves = new THREE.Group(); // 꼭따리 그룹화
  const leafMaterial = new THREE.MeshStandardMaterial({
    color: 0x6ca06e,
    side: THREE.DoubleSide, // 양면 활용
  });

  // 한라봉 심지
  const steamGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.4);
  const steam = new THREE.Mesh(steamGeometry, leafMaterial);
  steam.position.y = 2.5;
  leaves.add(steam);

  // 나뭇잎 부분
  const leafGeometry = new THREE.SphereGeometry(0.5, 32, 16, 0, Math.PI / 3);
  const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
  leaf.position.set(-0.5, 2.4, -0.1);
  leaf.rotation.z = Math.PI / -2;
  leaves.add(leaf);

  tangerine.add(body, leaves);

  return tangerine;
}
