<!--
 * @Description:  
 * @Author: owen
 * @Date: 2021-08-27 10:32:33
 * @LastEditTime: 2021-08-28 16:58:01
-->
<template>
  <canvas ref="webgl" class="webgl"></canvas>
</template>
<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MeshBasicMaterial } from "three";
import { MMDAnimationHelper } from "three/examples/jsm/animation/MMDAnimationHelper.js";
import { MMDLoader } from "three/examples/jsm/loaders/MMDLoader.js";
import Stats from "three/examples/jsm/libs/stats.module";
export default {
  name: "Dance2",
  mounted() {
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    const canvas = this.$refs.webgl;
    const scene = new THREE.Scene();
    // eslint-disable-next-line prettier/prettier
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 30000);
    camera.position.set(0, 20, 100);
    scene.add(camera);

    let stats = new Stats();
    canvas.appendChild(stats.dom);
    document.body.appendChild(stats.dom);

    const axesHelper = new THREE.AxesHelper();
    scene.add(axesHelper);

    const controls = new OrbitControls(camera, canvas);
    scene.add(controls);

    const loader = new THREE.TextureLoader();

    //湖
    const lake = new THREE.BoxGeometry(20000, 20000, 20000);
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

    //  光源
    const light = new THREE.PointLight("white", 1, 100);
    light.position.set(0, 20, 0);
    scene.add(light);
    const lightHelper = new THREE.PointLightHelper(light);
    scene.add(lightHelper);

    //球1
    // const box = new THREE.SphereGeometry(10, 70, 70);
    // const boxMaterial = new THREE.MeshNormalMaterial();
    // const boxCube = new THREE.Mesh(box, boxMaterial);
    // boxCube.position.y = 1;
    // scene.add(boxCube);

    //模型
    function onProgress(xhr) {
      if (xhr.lengthComputable) {
        const percentComplete = (xhr.loaded / xhr.total) * 100;
        console.log(Math.round(percentComplete, 2) + "% downloaded");
      }
    }

    const modelFile = "/mmd/miku_v2.pmd";
    const vmdFiles = ["/mmd/wavefile_v2.vmd"];
    const helper = new MMDAnimationHelper();
    const mmdLoader = new MMDLoader();

    mmdLoader.loadWithAnimation(
      modelFile,
      vmdFiles,
      function (mmd) {
        console.log(mmd);
        const mesh = mmd.mesh;
        scene.add(mesh);

        helper.add(mesh, {
          animation: mmd.animation,
          physics: true,
        });

        let ikHelper = helper.objects.get(mesh).ikSolver.createHelper();
        ikHelper.visible = false;
        scene.add(ikHelper);

        let physicsHelper = helper.objects.get(mesh).physics.createHelper();
        physicsHelper.visible = false;
        scene.add(physicsHelper);

        // initGui();
      },
      onProgress,
      null
    );

    const plan = new THREE.PlaneGeometry(200, 20000);
    const planTexture = loader.load("/pic/1.png");
    planTexture.wrapS = planTexture.wrapT = THREE.RepeatWrapping;
    planTexture.repeat.set(1, 200);

    const planMaterial = new THREE.MeshMatcapMaterial({
      map: planTexture,
      side: THREE.DoubleSide,
    });
    const planCube = new THREE.Mesh(plan, planMaterial);
    planCube.rotation.x = -(Math.PI / 2);
    scene.add(planCube);

    scene.fog = new THREE.Fog("#ecf0f1", 10, 20000);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setClearColor("#1abc9c");
    renderer.render(scene, camera);

    const clock = new THREE.Clock();
    const animate = () => {
      light.position.x = Math.cos((clock.getElapsedTime() + 2) * 2) * 10;
      light.position.z = Math.sin((clock.getElapsedTime() + 2) * 2) * 10;
      planCube.position.z -= 0.1;

      camera.position.x = Math.cos(clock.getElapsedTime() * 0.2) * 50;
      camera.position.z = Math.sin(clock.getElapsedTime() * 0.2) * 100;
      camera.position.y = Math.sin(clock.getElapsedTime()) * 5 + 10;

      requestAnimationFrame(animate);
      controls.update();
      helper.update(0.02);
      stats.begin();
      renderer.render(scene, camera);
      stats.end();
    };
    animate();
  },
};
</script>
