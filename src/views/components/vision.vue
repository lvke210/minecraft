<!--
 * @Description:  
 * @Author: owen
 * @Date: 2021-08-27 10:32:33
 * @LastEditTime: 2021-08-28 14:19:19
-->
<template>
  <canvas ref="webgl" class="webgl"></canvas>
</template>
<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MeshBasicMaterial } from "three";
export default {
  name: "Vision",
  mounted() {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const canvas = this.$refs.webgl;
    const scene = new THREE.Scene();
    // eslint-disable-next-line prettier/prettier
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 10000);
    camera.position.set(5, 5, 15);
    scene.add(camera);

    const axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);

    const controls = new OrbitControls(camera, canvas);
    scene.add(controls);

    const loader = new THREE.TextureLoader();

    //湖
    const lake = new THREE.BoxGeometry(2000, 2000, 2000);
    const lakeMaterial = [
      new MeshBasicMaterial({
        map: loader.load("/2/px.png"),
        side: THREE.DoubleSide,
      }),
      new MeshBasicMaterial({
        map: loader.load("/2/nx.png"),
        side: THREE.DoubleSide,
      }),
      new MeshBasicMaterial({
        map: loader.load("/2/py.png"),
        side: THREE.DoubleSide,
      }),
      new MeshBasicMaterial({
        map: loader.load("/2/ny.png"),
        side: THREE.DoubleSide,
      }),
      new MeshBasicMaterial({
        map: loader.load("/2/pz.png"),
        side: THREE.DoubleSide,
      }),
      new MeshBasicMaterial({
        map: loader.load("/2/nz.png"),
        side: THREE.DoubleSide,
      }),
    ];
    const cubeLake = new THREE.Mesh(lake, lakeMaterial);
    scene.add(cubeLake);

    //球1
    const box = new THREE.SphereGeometry(1, 70, 70);
    const boxMaterial = new THREE.MeshNormalMaterial();
    const boxCube = new THREE.Mesh(box, boxMaterial);
    boxCube.position.y = 1;
    scene.add(boxCube);
    //球2
    const boxCube1 = new THREE.Mesh(box, boxMaterial);
    boxCube1.position.y = 1;
    scene.add(boxCube1);

    const plan = new THREE.PlaneGeometry(200, 200);
    const planTexture = loader.load("/pic/1.png");
    // planTexture.wrapS = planTexture.wrapT = THREE.RepeatWrapping;
    // planTexture.repeat.set(10, 10);

    const planMaterial = new THREE.MeshMatcapMaterial({
      map: planTexture,
      side: THREE.DoubleSide,
    });
    const planCube = new THREE.Mesh(plan, planMaterial);
    planCube.rotation.x = -(Math.PI / 2);
    scene.add(planCube);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setClearColor("#1abc9c");
    renderer.render(scene, camera);

    const clock = new THREE.Clock();
    const animate = () => {
      boxCube.position.x = Math.cos(clock.getElapsedTime() * 0.5) * 50;
      boxCube.position.z = Math.sin(clock.getElapsedTime() * 0.5) * 100;
      camera.position.x = Math.cos(clock.getElapsedTime() * 0.5) * 50 + 10;
      camera.position.z = Math.sin(clock.getElapsedTime() * 0.5) * 100 + 10;

      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  },
};
</script>
