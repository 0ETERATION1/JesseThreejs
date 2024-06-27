import * as THREE from 'three'
import App from '../App.js'
import RAPIER from '@dimforge/rapier3d';

export default class Physics {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;

        import('@dimforge/rapier3d').then(RAPIER => {
            const gravity = {x: 0, y: -9.81, z: 0}
            this.world = new RAPIER.World(gravity);
            
            // creating a mesh
            const geometry = new THREE.BoxGeometry(1,1,1);
            const material = new THREE.MeshStandardMaterial({color: 'blue'})
            const cubeMesh = new THREE.Mesh(geometry, material);
            this.scene.add(cubeMesh);

        })
    }

    loop() {

    }
}