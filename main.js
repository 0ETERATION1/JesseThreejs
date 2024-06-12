import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Pane } from 'tweakpane';

// creating pane
const pane = new Pane();
console.log(pane);

// initialize the scene
const scene = new THREE.Scene();
const axisHelper = new THREE.AxesHelper(2);
const axisHelper2 = new THREE.AxesHelper(2);
const axisHelper3 = new THREE.AxesHelper(2);

// add objects to the scene
const cubeGeometry = new THREE.BoxGeometry(1,1,1);

// creating a custom geometry
// const vertices = new Float32Array( [
// 	// vertices of my 2d triangle!
// 	0, 0, 0,
// 	0, 2, 0,
// 	2, 0, 0
// ])

// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
const cubeMaterial = new THREE.MeshBasicMaterial({color: "red", wireframe: true});
// const mesh = new THREE.Mesh(geometry, cubeMaterial);

//scene.add(mesh);

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh.position.y = -1;
const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh2.position.x = 2;
const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cubeMesh3.position.x = -2;

//creating a group
const group = new THREE.Group();
group.add(cubeMesh);
cubeMesh.add(axisHelper);
group.add(cubeMesh2);
cubeMesh2.add(axisHelper2);
group.add(cubeMesh3);
cubeMesh3.add(axisHelper3);
group.position.y = 1;
group.scale.addScalar(2);

// // adding the group to the scene
scene.add(group);



scene.add(axisHelper);

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

camera.position.z = 30;

//console.log(cubeMesh.position.distanceTo(camera.position));

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
//controls.autoRotate = true;

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

const clock = new THREE.Clock();

let previousTime = 0;

const renderloop = () => {

	
	
	const currentTime = clock.getElapsedTime();
	const delta = currentTime - previousTime;
	previousTime = currentTime;

	// creating some animations
	group.rotation.y += THREE.MathUtils.degToRad(1) * delta * 5;
	cubeMesh.scale.x = Math.sin(currentTime) + 2;

	group.scale.y = Math.sin(currentTime) + 2;
 
	// required if controls.enableDamping or controls.autoRotate are set to true
	// controls.update(); should always go first
	controls.update();
	renderer.render(scene, camera);
	window.requestAnimationFrame(renderloop);
};

renderloop();

//console.log(window.requestAnimationFrame);
