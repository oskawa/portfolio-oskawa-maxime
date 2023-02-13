<template>
  <div class="">
    <div v-if="!isMobile()">
      <div class="loadingScreen">
        <div id="loader" class="loader">
          <div id="progressBar">
            <div id="bar"></div>
            <p id="progressText">{{ test }}</p>
          </div>
        </div>
      </div>
      <div id="canvas1"></div>
      <video loop muted src="" id="video"></video>
      <video loop muted src="" id="video_superbyte"></video>
      <div v-if="!isHidden" class="container">
        <div class="row align-content-center" style="height: 100vh">
          <div class="col-12 col-lg-6" style="z-index: 100">
            <img src="/logo/logo_white.svg" />
            <h1 id="sous_titre">Graphist || Web Developer</h1>
            <button @click="initCamera" class="btn_stroke_white">See my projects</button>
            <p>{{ object_ID }}</p>
          </div>
        </div>
      </div>

      <div class="container" style="height: 100vh">
        <div class="row h-100 align-content-center">
          <div
            v-bind:class="{ translation: showInformation }"
            v-bind:style="[
              showInformation ? { visibility: 'visible' } : { visibility: 'hidden' },
            ]"
            class="col-12 col-lg-6 bloc_Blanc"
          ></div>
          <div
            v-if="showInformation"
            v-bind:class="{ leftTranslation: showInformation }"
            v-bind:style="[
              showInformation ? { visibility: 'visible' } : { visibility: 'hidden' },
            ]"
            id="bloc_left"
            class="left"
          >
            <h2 id="titre_Projects">{{ informationsProjets.Titre }}</h2>
            <h3 id="soustitre_Projects">
              {{ informationsProjets.TypeDeProjet }}
            </h3>
            <p id="paragraphe_Projects" v-html="informationsProjets.Descriptif"></p>

            <nuxt-link
              v-for="lien in lienProjets"
              :key="lien.id"
              :to="`/projects/${lien.id}`"
              class="project_link"
              v-html="lien.title.rendered"
            >
              {{ lien.title.rendered }}
            </nuxt-link>
          </div>
        </div>
      </div>

      <div v-if="showInformation" id="backToCamera" @click="returnToCamera">
        <p>Back to projects</p>
      </div>
    </div>
    <div v-else>
      <div class="mobileContainer">
        <div class="container">
          <div class="row">
            <div class="col-12">
              <img src="logo/logo_white.svg" alt="" />
              <h2>Please visit my website on a larger screen :)</h2>

              <div class="liensClass">
                <nuxt-link class="mobileLiens" to="/project">Projects</nuxt-link>
                <nuxt-link class="mobileLiens" to="/about">About</nuxt-link>
                <nuxt-link class="mobileLiens" to="/contact">Contact</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three/build/three.module";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import TWEEN from "@tweenjs/tween.js";
import axios from "axios";

export default {
  data() {
    return {
      hdr: "/models/venice.hdr",
      lienProjets: null,
      isHidden: false,
      showInformation: false,
      camera: null,
      scene: null,
      renderer: null,
      geometry: null,
      material: null,
      mesh: null,
      clock: null,
      modele: "",
      light: null,
      mixer: null,
      envMap: null,
      test: "",
      projectDiv: null,
      labelRenderer: null,
      object_ID: null,
      targetPosition: null,
      cameraRotation: null,
      hide: false,
      informationsProjets: {
        Titre: "",
        TypeDeProjet: "",
        Description: "",
      },
      arrayProject: [
        {
          name: "globe",
          targetPosition: {
            x: -230,
            y: 400,
            z: -200,
          },
          cameraRotation: {
            x: 0,
            y: 0,
            z: 0,
          },
        },

        {
          name: "informatique",
          targetPosition: {
            x: -350,
            y: 400,
            z: -50,
          },
          cameraRotation: {
            x: 0,
            y: 0.4,
            z: 0,
          },
        },
        {
          name: "telescope",
          targetPosition: {
            x: 320,
            y: 400,
            z: 100,
          },
          cameraRotation: {
            x: 0,
            y: 0.3,
            z: 0,
          },
        },
        {
          name: "nuage",
          targetPosition: {
            x: 0,
            y: 500,
            z: 0,
          },
          cameraRotation: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
        {
          name: "tele",
          targetPosition: {
            x: 100,
            y: 340,
            z: 0,
          },
          cameraRotation: {
            x: 0,
            y: -0.3,
            z: 0,
          },
        },
        {
          name: "peinture",
          targetPosition: {
            x: -650,
            y: 200,
            z: -200,
          },
          cameraRotation: {
            x: 0,
            y: -0.8,
            z: 0,
          },
        },
        {
          name: "oskawa",
          targetPosition: {
            x: -250,
            y: 250,
            z: -150,
          },
          cameraRotation: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
        {
          name: "matisse",
          targetPosition: {
            x: 150,
            y: 225,
            z: 150,
          },
          cameraRotation: {
            x: 0,
            y: -0.1,
            z: 0,
          },
        },
        {
          name: "efi",
          targetPosition: {
            x: -80,
            y: 205,
            z: -90,
          },
          cameraRotation: {
            x: 0,
            y: -1,
            z: 0,
          },
        },
        {
          name: "biere",
          targetPosition: {
            x: -130,
            y: 250,
            z: -190,
          },
          cameraRotation: {
            x: 0,
            y: 0,
            z: 0,
          },
        },
        {
          name: "tente",
          targetPosition: {
            x: -160,
            y: 190,
            z: -20,
          },
          cameraRotation: {
            x: 0,
            y: 0.2,
            z: 0,
          },
        },
      ],
    };
  },
  head() {
    return {
      title: "Portfolio Maxime Eloir - Homepage",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "My portfolio ! A selection of print & web projects and missions carried out during my studies and my business.",
          hid: "description",
        },
      ],
    };
  },
  destroyed() {
    
    if (this.renderer !== null) {
      this.renderer.domElement = null;

      this.renderer = null;
    }
  },
  mounted() {
    document.body.style.overflow = "hidden";
    if (!this.isMobile()) {
      this.init();
      window.addEventListener("resize", this.onWindowResize);
      this.animate();
    }
    if (!this.show) {
    }
   
  },
  watch: {
    $route(to, from) {
      this.hide = true;
    },
  },
  methods: {
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    init() {
      this.scene = new THREE.Scene();
      this.renderer = new THREE.WebGLRenderer({});
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.shadowMap.enabled = true;
      this.renderer.outputEncoding = THREE.sRGBEncoding;

      this.renderer.toneMapping = THREE.ReinhardToneMapping;
      this.renderer.toneMappingExposure = 1.3;
      this.renderer.domElement.style.position = "fixed";
      this.renderer.domElement.style.top = "0px";
      this.renderer.domElement.style.zIndex = "10";

      this.camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        3000
      );
      this.camera.position.set(0, 300, 600);
      this.camera.rotation.set(0, 0.3, 0);

      this.clock = new THREE.Clock();

      // new RGBELoader()
      //   .setDataType(THREE.UnsignedByteType)
      //   .load("/models/venice.hdr", (texture) => {
      //     this.scene.background = texture;
      //     this.scene.environment = texture;
      //   });
      const test = this.scene;
      const pmremGenerator = new THREE.PMREMGenerator(this.renderer);

      new RGBELoader()
        .setDataType(THREE.UnsignedByteType)
        .load("/models/venice.hdr", function (texture) {
          const envMap = pmremGenerator.fromEquirectangular(texture).texture;
          test.background = envMap;
          test.environment = envMap;
          texture.dispose();
          pmremGenerator.dispose();
        });

      new GLTFLoader().load(
        "/models/test_40.gltf",
        (result) => {
          this.modele = result.scene;

          result.scene.traverse(function (node) {
            if (node.isMesh) {
              node.castShadow = true;
              node.receiveShadow = true;
            }
          });
          this.scene.add(this.modele);

          this.createLabel(this.modele);

          var video = document.getElementById("video");
          video.src = "/video.mp4";
          video.load();
          video.play();
          var texture = new THREE.VideoTexture(video);
          texture.needsUpdate;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.format = THREE.RGBFormat;
          texture.crossOrigin = "anonymous";

          this.modele.children[1].children[3].material = new THREE.MeshBasicMaterial({
            map: texture,
          });

          var video_superbyte = document.getElementById("video_superbyte");
          video_superbyte.src = "/superbyte.webm";
          video_superbyte.load();
          video_superbyte.play();

          const superByte = new THREE.VideoTexture(
            video_superbyte,
            THREE.CubeReflectionMapping
          );
          superByte.wrapS = THREE.RepeatWrapping;
          superByte.repeat.x = -10;

          var materialVideo = new THREE.MeshPhongMaterial({
            map: superByte, // Set texture map
          });
          
          this.modele.children[5].children[1].material = materialVideo;
          this.modele.children[5].children[1].material.side = THREE.DoubleSide;

          this.modele.scale.set(1, 1, 1);

          this.mixer = new THREE.AnimationMixer(result.scene);

          result.animations.forEach((clip) => {
            this.mixer.clipAction(clip).play();
          });
        },
        (xhr) => {
          var totalSize = 21201140;

          const loadbar = document.getElementById("bar");
          const visibilityLoader = document.querySelector(".loadingScreen");

          const bar = Math.floor((250 * xhr.loaded) / totalSize);

          const percentage = Math.round((xhr.loaded / totalSize) * 100);

          loadbar.style.width = bar + "px";

          if (bar == 250) {
            setTimeout(function () {
              visibilityLoader.style.opacity = "0";
              visibilityLoader.style.visibility = "hidden";
            }, 2000);
          }

          this.test = percentage.toString();
        }
      );

      this.labelRenderer = new CSS2DRenderer();
      this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
      this.labelRenderer.domElement.id = "allLabels";
      this.labelRenderer.domElement.style.position = "absolute";
      this.labelRenderer.domElement.style.top = "0px";
      this.labelRenderer.domElement.style.zIndex = "11";
      this.labelRenderer.domElement.style.visibility = "hidden";

      const directional = new THREE.DirectionalLight(0xffffbb, 1);
      directional.position.set(0, 600, 600);
      this.scene.add(directional);

      const distance = 2000;
      const angle = Math.PI / 4.0;
      const penumbra = 0.5;
      const decay = 1.0;

      this.light = new THREE.SpotLight(0xffa95c, 5, distance, angle, penumbra, decay);

      this.light.position.set(500, 800, 200);
      this.light.castShadow = true;
      this.scene.add(this.light);

      document.getElementById("canvas1").appendChild(this.renderer.domElement);
      document.getElementById("canvas1").appendChild(this.labelRenderer.domElement);
    },
    animate() {
      TWEEN.update();
      //
      if (this.renderer) {
        this.renderer.render(this.scene, this.camera);
        this.labelRenderer.render(this.scene, this.camera);
      }
      var delta = this.clock.getDelta();

      if (this.mixer) this.mixer.update(delta);
      requestAnimationFrame(this.animate);
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    },
    createLabel(model) {
      for (var i = 0; i < this.arrayProject.length; i++) {
        this.projectDiv = document.createElement("div");
        this.projectDiv.className = "label ";
        this.projectDiv.setAttribute("id", model.children[i].name);
        this.projectDiv.style.marginTop = "-1em";
        this.projectDiv.style.zIndex = "200 !important";
        this.projectDiv.style.width = "20px";
        this.projectDiv.style.height = "20px";
        this.projectDiv.style.cursor = "pointer";
        this.projectDiv.addEventListener("click", this.onClick_label, false);
        const projectLabel = new CSS2DObject(this.projectDiv);
        model.children[i].add(projectLabel);
      }
    },
    tweenCamera(targetPosition, duration) {
      var position = this.camera.position;
      var tween = new TWEEN.Tween(position)
        .to(targetPosition, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function () {
          position.copy(position);
        })
        .onComplete(function () {
          position.copy(targetPosition);
        })
        .start();
    },

    tweenCamera1(rotationCamera, duration) {
      var rotation1 = this.camera.rotation;

      var tween1 = new TWEEN.Tween(rotation1)
        .to(rotationCamera, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)
        .onUpdate(function () {
          rotation1.copy(rotation1);
        })
        .onComplete(function () {
          rotation1.copy(rotationCamera);

          rotation1.set(rotationCamera.x, rotationCamera.y, rotationCamera.z, "XYZ");
        })
        .start();
    },
    onClick_label(event) {
      this.showInformation = true;
      this.object_ID = event.currentTarget.id;
      this.fetchDataCategory(this.object_ID);

      const found = this.arrayProject.find((x) => x.name === this.object_ID);

      this.targetPosition = new THREE.Vector3(
        found.targetPosition.x,
        found.targetPosition.y,
        found.targetPosition.z
      );
      this.cameraRotation = new THREE.Vector3(
        found.cameraRotation.x,
        found.cameraRotation.y,
        found.cameraRotation.z
      );

      var duration = 2000;
      this.tweenCamera(this.targetPosition, duration);
      this.tweenCamera1(this.cameraRotation, duration);
    },
    fetchDataCategory(id) {
      axios
        .get(process.env.wordpressAPI + "wp/v2/categories?slug=" + id)
        .then((response) => {
          let category_id = response.data[0].id;

          if (window.localStorage.getItem("language") == "en") {
            this.informationsProjets = {
              Titre: response.data[0].name_en,
              TypeDeProjet: response.data[0].acf.type_de_projet_en,
              Descriptif: response.data[0].acf.descriptif_du_projet_en,
            };
          } else {
            this.informationsProjets = {
              Titre: response.data[0].name,
              TypeDeProjet: response.data[0].acf.type_de_projet,
              Descriptif: response.data[0].acf.descriptif_du_projet,
            };
          }
          axios
            .get(process.env.wordpressAPI + "wp/v2/portfolio?categories=" + category_id)
            .then((response) => {
              this.lienProjets = response.data;
              
            });
        });
    },
    
    initCamera() {
      var duration = 2000;
      this.cameraRotation = new THREE.Vector3(0, 0, 0);
      this.tweenCamera1(this.cameraRotation, duration);
      this.isHidden = true;
      this.labelRenderer.domElement.style.visibility = "visible";
      document.getElementById("__layout").style.zIndex = "0";
    },
    returnToCamera() {
      this.showInformation = false;
      this.targetPosition = new THREE.Vector3(0, 300, 600);
      this.cameraRotation = new THREE.Vector3(0, 0, 0);
      // camera.rotation.set(0, 0, 0)
      var duration = 2000;
      this.tweenCamera(this.targetPosition, duration);
      this.tweenCamera1(this.cameraRotation, duration);
    },
  },
};
</script>

<style scoped lang="scss">
body {
  overflow: hidden;
}
video {
  position: absolute;
  pointer-events: none;
  opacity: 0;
}
.loadingScreen {
  overflow: hidden;
  position: absolute;
  background-color: black;
  z-index: 1001;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 1;
  visibility: visible;
  transition: opacity 1s ease-out;

  .loader {
    color: red;
    top: 7em;
    width: 100%;
    font-size: 3em;
    font-variant: small-caps;
    font-weight: bold;
    position: absolute;
    z-index: 100;
    text-align: center;
    text-shadow: #000000 0px 0px 10px;
    z-index: 1001;

    #progressBar {
      text-align: center;
      background-color: #808080;
      width: 250px;
      height: 10px;
      margin: auto;

      #bar {
        background-color: white;
        width: 1px;
        height: 10px;
      }
      #progressText {
        color: white;
        font-size: 14px;
      }
    }
  }
}

#__layout {
  position: absolute;
  width: 100%;
  height: 100vh;
}

.left {
  width: 42%;
  z-index: 101;
  visibility: hidden;
}

.leftTranslation {
  animation-duration: 1.5s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    margin-left: -20%;
    opacity: 0;
  }

  to {
    margin-left: 0%;
    opacity: 1;
  }
}
.bloc_Blanc {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100vh;

  z-index: 100;
  background: linear-gradient(to right, #fff, #fff);
  background-repeat: no-repeat;
  background-size: 0 100%;
  transition: background-size 0.6s 0s;
}

.translation {
  background-size: 100% 100%;
}

#backToCamera {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  color: white;
  padding: 1rem;
  line-height: 0;
  border: 2px solid white;
  z-index: 200;
  width: auto;
  height: 20px;
  cursor: pointer;
}

.project_link {
  background-color: #f3db12;
  color: black;
  padding: 0.5rem 4rem;
  display: table;
  margin-bottom: 0.5rem;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  &:hover {
    text-decoration: none;
    background-color: #fae525;
  }
}
h3 {
  font-family: "Open Sans", sans-serif;
  font-weight: 200;
  font-size: 1.2rem;
}
h2 {
  font-family: "Open Sans", sans-serif;
  font-weight: 800;
  font-size: 2rem;
}
#sous_titre {
  font-size: 16px;
  font-weight: 200;
  color: white;
  font-family: "Open Sans", sans-serif;
}
.mobileContainer {
  height: 100vh;
  width: 100%;
  background-color: #181818;
  .container {
    height: 100%;
    .row {
      height: 100%;
      align-content: center;
      img {
        margin-bottom: 2rem;
      }
      h2 {
        color: white;
        text-align: center;
        font-weight: 300;
      }
    }
  }
}
.liensClass {
  margin-top: 2rem;
  display: inline-grid;
  width: 100%;
  .mobileLiens {
    margin-bottom: 1rem;
    color: white;
    text-align: center;
  }
}
</style>
