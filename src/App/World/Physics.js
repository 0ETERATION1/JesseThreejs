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
            this.cubeMesh = new THREE.Mesh(geometry, material);
            this.scene.add(this.cubeMesh);

            const rigidBodyType = RAPIER.RigidBodyDesc.dynamic();
            this.rigidBody = this.world.createRigidBody(rigidBodyType);

            const colliderType = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5);
            this.world.createCollider(colliderType, this.rigidBody);

            this.rapierLoaded = true;
        })
    }

    loop() {

        if(!this.rapierLoaded) {
            
            return;
        }


        this.world.step();

        const position = this.rigidBody.translation();
        const rotation = this.rigidBody.rotation();

        console.log(rotation);

        // this.cubeMesh.position.copy(position);
        // this.cubeMesh.quaternion.copy(rotation);
        this.cubeMesh.position.set(position.x, position.y, position.z);

        


    }
}