import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { Pane } from "tweakpane";

// initialize the pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// Create a loading manager
const loadingManager = new THREE.LoadingManager();

// Define loading event handlers
loadingManager.onStart = function (url, itemsLoaded, itemsTotal) {
    console.log(`Started loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`);
};

loadingManager.onLoad = function () {
    console.log('All textures loaded.');
    // Start rendering only after all textures are loaded
    
};

loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
    console.log(`Loading file: ${url}.\nLoaded ${itemsLoaded} of ${itemsTotal} files.`);
};

loadingManager.onError = function (url) {
    console.log(`There was an error loading ${url}`);
};

// initialize the loader
const textureLoader = new THREE.TextureLoader(loadingManager);

// initialize the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const torusKnotGeometry = new THREE.TorusKnotGeometry(0.5, 0.15, 100, 16);
const planeGeometry = new THREE.PlaneGeometry(1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);

// initialize the texture
const textureTest = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_albedo.png')
const badlandsAO = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_ao.png')
const badlandsHeight = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_height.png')
const badlandsNormal = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_normal-ogl.png')
const badlandsRoughness = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_roughness.png')


textureTest.repeat.set(25,20);
textureTest.wrapS = THREE.RepeatWrapping;
textureTest.wrapT = THREE.RepeatWrapping;
textureTest.offset.x = 0.5;


// textureTest.wrapS = THREE.MirroredRepeatWrapping;
// textureTest.wrapT = THREE.MirroredRepeatWrapping;
console.log(textureTest);


// initalize a group
const group = new THREE.Group();



// initialize the material
const material = new THREE.MeshStandardMaterial();
material.map = textureTest;
//material.aoMap = badlandsAO;
material.displacementMap = badlandsHeight;
material.displacementScale = 0.5;
material.normalMap = badlandsNormal;
material.roughnessMap = badlandsRoughness;

const uv2 = new THREE.BufferAttribute(planeGeometry.attributes.uv.array, 2);
planeGeometry.setAttribute('uv2', uv2);
console.log(planeGeometry);
material.aoMap = badlandsAO;
material.aoMapIntensity = 0.2;

pane.addBinding(material, 'aoMapIntensity', {min: 0, max: 1, step: 0.1})

//material.normalScale = new THREE.Vector2(5,5);
// material.color = new THREE.Color('red');

// initialize the mesh
const cube = new THREE.Mesh(geometry, material);

const knot = new THREE.Mesh(torusKnotGeometry, material);
knot.position.x = 1.5;

const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -1.5;
plane.rotation.x = -(Math.PI * 0.5);
plane.scale.set(100,100);

const sphere = new THREE.Mesh(sphereGeometry, material);
const cylinder = new THREE.Mesh(cylinderGeometry, material);



// add the mesh to the scene
group.add(plane);
// group.add(cube, knot, plane, sphere, cylinder);
scene.add(group);


sphere.position.set(0,1.5,0);
cylinder.position.set(0,-1.5,0);



// initialize the light
const light = new THREE.AmbientLight(0xffffff, 1);
//scene.add(light);

const pointLight = new THREE.DirectionalLight(0xffffff, 1);
pointLight.position.set(20, 20, 3);
scene.add(pointLight);

const lightHelper = new THREE.DirectionalLightHelper(pointLight, 0.5);
scene.add(lightHelper);

pane.addBinding(pointLight, 'intensity', {
	min: 0,
	max: 1,
	step: 0.01
})

// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.z = 15;
camera.position.y = 105;
camera.position.x = 20;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// instantiate the controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

window.addEventListener("resize", () => {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
});

//console.log(scene.children);

// render the scene
const renderloop = () => {
	// group.children.forEach((children) => {
	// 	if (children instanceof THREE.Mesh) {
	// 		children.rotation.y += 0.1;
	// 	}
	// })
  	controls.update();
  	renderer.render(scene, camera);
  	window.requestAnimationFrame(renderloop);
};

renderloop();