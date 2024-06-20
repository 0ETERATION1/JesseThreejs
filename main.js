import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";

// initialize pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// add textureLoader
const textureLoader = new THREE.TextureLoader();

// adding textures 
const sunTexture = textureLoader.load('textures/2k_sun.jpg');
const earthTexture = textureLoader.load('textures/2k_earth_daymap.jpg');
const marsTexture = textureLoader.load('textures/2k_mars.jpg');
const mercuryTexture = textureLoader.load('textures/2k_mercury.jpg');
const moonTexture = textureLoader.load('textures/2k_moon.jpg');
const venusTexture = textureLoader.load('textures/2k_venus_surface.jpg');

// add materials
const mercuryMaterial = new THREE.MeshStandardMaterial( 
	{
		map: mercuryTexture
	}
);

const earthMaterial = new THREE.MeshStandardMaterial( 
	{
		map: earthTexture
	}
);

const marsMaterial = new THREE.MeshStandardMaterial( 
	{
		map: marsTexture
	}
);

const moonMaterial = new THREE.MeshStandardMaterial( 
	{
		map: moonTexture
	}
);

const venusMaterial = new THREE.MeshStandardMaterial( 
	{
		map: venusTexture
	}
);



console.log(sunTexture);

// add stuff here
// making sphere geometry for planet
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial(
	{
		map: sunTexture
	}
);

const sun = new THREE.Mesh(
	sphereGeometry, sunMaterial
)

sun.scale.setScalar(5);



const earth = new THREE.Mesh(sphereGeometry, earthMaterial);

earth.position.x = 10;


const moon = new THREE.Mesh(sphereGeometry, moonMaterial);

moon.scale.setScalar(0.3);
moon.position.x = 2;
earth.add(moon);

scene.add(sun);



const planets = [
	{
	  	name: "Mercury",
	  	radius: 0.5,
	  	distance: 10,
	  	speed: 0.01,
	  	material: mercuryMaterial,
	  	moons: [],
	},	
	{
		name: "Venus",
		radius: 0.8,
		distance: 15,
		speed: 0.007,
		material: venusMaterial,
		moons: [],
	},
	{
		name: "Earth",
		radius: 1,
		distance: 20,
		speed: 0.005,
		material: earthMaterial,
		moons: [
			{
			name: "Moon",
			radius: 0.3,
			distance: 3,
			speed: 0.015,
			},
	  ],
	},
	{
		name: "Mars",
		radius: 0.7,
		distance: 25,
		speed: 0.003,
		material: marsMaterial,
		moons: [
		{
			name: "Phobos",
			radius: 0.1,
			distance: 2,
			speed: 0.02,
		},
		{
			name: "Deimos",
			radius: 0.2,
			distance: 3,
			speed: 0.015,
			color: 0xffffff,
		},
	  ],
	},
  ];

  const createPlanet = (planet) => {

	

	// create the mesh and add it to the scene
	const planetMesh = new THREE.Mesh(sphereGeometry, planet.material);
	planetMesh.scale.setScalar(planet.radius);
	planetMesh.position.x = planet.distance;
	return planetMesh;
}

const createMoon = (moon) => {
	// create the mesh and add it to the scene
	const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
	moonMesh.scale.setScalar(moon.radius);
	moonMesh.position.x = moon.distance;
	return moonMesh;
}  

const planetMeshes = planets.map((planet) => {
	// create the mesh
	const planetMesh = createPlanet(planet);
	scene.add(planetMesh)
	// add it to our scene
	// loop through each planet
	//scene.add(planetMesh);

	// accessing the moons
	planet.moons.forEach((moon) => {
		const moonMesh = createMoon(moon);
		planetMesh.add(moonMesh);
	// 	const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
	// 	moonMesh.scale.setScalar(moon.radius);
	// 	moonMesh.position.x = moon.distance;
	// 	planetMesh.add(moonMesh);
	})
	

	return planetMesh;
	
});

console.log(planetMeshes);

// add lights 
const ambientLight = new THREE.AmbientLight (
	0xfffffff,
	1
);

scene.add(ambientLight);

// const testArray = planets.map((planet) => {
// 	console.log(planet.name);
// 	return planet.name;

// });

// console.log(testArray)


// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.z = 100;
camera.position.y = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20

// add resize listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

const clock = new THREE.Clock();

// render loop
const renderloop = () => {

	// const elapsedTime = clock.getElapsedTime();

	// earth.rotation.y += 0.01;
	// earth.position.x = Math.sin(elapsedTime) * 10;
	// earth.position.z = Math.cos(elapsedTime) * 10;

	// moon.position.x = Math.sin(elapsedTime) * 2;
	// moon.position.z = Math.cos(elapsedTime) * 2;




	controls.update();
  	renderer.render(scene, camera);
  	window.requestAnimationFrame(renderloop);
};


renderloop();