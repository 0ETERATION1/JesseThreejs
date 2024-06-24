import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { step } from "three/examples/jsm/nodes/Nodes.js";
import { Pane } from "tweakpane";

// initialize pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// add textureLoader
const textureLoader = new THREE.TextureLoader();

const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath('static/textures/Standard-Cube-Map/');

// adding textures 
const sunTexture = textureLoader.load('.static/textures/2k_sun.jpg');
const earthTexture = textureLoader.load('static/textures/2k_earth_daymap.jpg');
const marsTexture = textureLoader.load('static/textures/2k_mars.jpg');
const mercuryTexture = textureLoader.load('static/textures/2k_mercury.jpg');
const moonTexture = textureLoader.load('static/textures/2k_moon.jpg');
const venusTexture = textureLoader.load('static/textures/2k_venus_surface.jpg');
const backgroundTexture = textureLoader.load('static/textures/2k_stars_milky_way.jpg');

const backgoundCubeMap = cubeTextureLoader.load(
	[
		'px.png',
		'nx.png',
		'py.png',
		'ny.png',
		'pz.png',
		'nz.png'

	]
)

scene.background = backgoundCubeMap;

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
	});
	

	return planetMesh;
	
});

console.log(planetMeshes);

// add lights 
const ambientLight = new THREE.AmbientLight (
	0xfffffff,
	0.1
);

scene.add(ambientLight);

// adding a point light to our scene so it looks like the light is coming from the sun
const pointLight = new THREE.PointLight(
	0xffffff,
	1000
);
scene.add(pointLight);

pane.addBinding(pointLight, 'intensity', {
	min: 0,
	max: 1000,
	step: 1
});

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

console.log(planets[3].moons[0].name);

// render loop
const renderloop = () => {

	planetMeshes.forEach((planet, index) => {
		planet.rotation.y += planets[index].speed;
		planet.position.x = Math.sin(planet.rotation.y) * planets[index].distance;
		planet.position.z = Math.cos(planet.rotation.y) * planets[index].distance;

		
		planet.children.forEach((moon, idx) => {
			moon.rotation.y += planets[index].moons[idx].speed;
			moon.position.x = Math.sin(moon.rotation.y) * planets[index].moons[idx].distance;
			moon.position.z = Math.cos(moon.rotation.y) * planets[index].moons[idx].distance;


		});


		

		// console.log(planets[index].speed);

		// planetMeshes.forEach((moon, index) => {
		// 	console.log(moon.children.);
		// 	moon.rotation.y += 0.01;
		// });
	});
	

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