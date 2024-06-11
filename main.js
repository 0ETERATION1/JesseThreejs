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
scene.add(cubeMesh);

const tempVector = new THREE.Vector3(0,3,0);

cubeMesh.position.copy(tempVector);

const helper = new THREE.AxesHelper(5);
scene.add(helper);

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35, 
  window.innerWidth / window.innerHeight,
  0.1,
  100)

const aspectRatio = window.innerWidth / window.innerHeight;

// const camera = new THREE.OrthographicCamera(
// 	-1 * aspectRatio,
// 	1 * aspectRatio,
// 	1,
// 	-1,
// 	0.1,
// 	200
// )

camera.position.z = 15;

console.log(cubeMesh.position.distanceTo(camera.position));

cubeMesh.scale.y = 2;

// initialize the renderer
const canvas = document.querySelector('canvas.threejs')
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
})

// need to set size before the render loop
renderer.setSize(window.innerWidth, window.innerHeight)
// const maxPixelRatio = Math.min(window.devicePixelRatio, 2);
// renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// orbit controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;
controls.autoRotate = true;

// check for window resizing
window.addEventListener('resize', () => {

	console.log('resize!');
	// updating aspect on every resizing
	camera.aspect = window.innerWidth / window.innerHeight;
	// need this method
	camera.updateProjectionMatrix();
	// updating renderer
	renderer.setSize(window.innerWidth, window.innerHeight);
})


// function renderloop() {

// 	// required if controls.enableDamping or controls.autoRotate are set to true
// 	// controls.update(); should always go first
// 	controls.update();
// 	renderer.render(scene, camera);
// 	window.requestAnimationFrame(renderloop);
// }


const renderloop = () => {

	// required if controls.enableDamping or controls.autoRotate are set to true
	// controls.update(); should always go first
	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(renderloop);
};

renderloop();

//console.log(window.requestAnimationFrame);
