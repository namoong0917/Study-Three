import * as THREE from "three";

export default function printIsland() {
  const island = new THREE.Group();

  const topGeo = new THREE.CylinderGeometry(5, 5, 0.5, 9);
  const topMaterial = new THREE.MeshStandardMaterial({
    color: 0x6ca06e,
  });
  const top = new THREE.Mesh(topGeo, topMaterial);
  top.scale.x = 2;
  // 받는 그림자 receiveShadow속성 적용
  top.receiveShadow = true;

  island.add(top);

  // 섬 아래 부분
  const bottomGeo = new THREE.ConeGeometry(5, 6, 9);
  const bottomMaterial = new THREE.MeshStandardMaterial({
    color: 0xdeb887,
  });
  const bottom = new THREE.Mesh(bottomGeo, bottomMaterial);
  bottom.scale.x = 2;
  bottom.rotation.z = THREE.MathUtils.degToRad(180);
  bottom.position.y = -3;
  island.add(bottom);

  return island;
}
