import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Pane } from "tweakpane";
import './style.css'
import App from './App/App.js'

const app = new App();

const mesh1 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({color: 0xff0000})
)


const mesh2 = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshBasicMaterial({color: 0xff0000})
)