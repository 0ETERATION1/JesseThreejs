import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// initialize the scene
const scene = new THREE.Scene()

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1,1,1)
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red"})

const cubeMesh = new THREE.Mesh(
  cubeGeometry,
  cubeMaterial
)
scene.add(cubeMesh)

// initialize the camera
// const camera = new THREE.PerspectiveCamera(
//   35, 
//   window.innerWidth / window.innerHeight,
//   0.1,
//   100)

const camera = new THREE.OrthographicCamera(
	-1,
	1,
	1,
	-1,
	0.1,
	200
)

camera.position.z = 5

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

// need to set size before the render loop
renderer.setSize(window.innerWidth, window.innerHeight)


// orbit controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.autoRotate = true;


function renderloop() {

	// required if controls.enableDamping or controls.autoRotate are set to true
	// controls.update(); should always go first
	controls.update();

	renderer.render(scene, camera);
	window.requestAnimationFrame(renderloop);



}

renderloop()

//console.log(window.requestAnimationFrame);
