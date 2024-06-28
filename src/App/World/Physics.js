import * as THREE from 'three';
import App from '../App.js';
import { appStateStore } from '../Utils/Store.js';
import { Vector3 } from '@dimforge/rapier3d';

export default class Physics {
    constructor() {
        this.app = new App();
        this.scene = this.app.scene;

        this.meshMap = new Map();
        //this.appStateStore = appStateStore

        this.initializePhysics();
    }

    async initializePhysics() {
        try {
            const RAPIER = await import('@dimforge/rapier3d');
            const gravity = { x: 0, y: -9.81, z: 0 };
            this.world = new RAPIER.World(gravity);
            this.rapier = RAPIER;
            

            const groundGeometry = new THREE.BoxGeometry(10, 1, 10);
            const groundMaterial = new THREE.MeshStandardMaterial({ color: 'turquoise' });
            this.groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
            this.scene.add(this.groundMesh);
            
            const groundRigidBodyType = RAPIER.RigidBodyDesc.fixed();
            this.groundRigidBody = this.world.createRigidBody(groundRigidBodyType);
            const groundColliderType = RAPIER.ColliderDesc.cuboid(5, 0.5, 5);
            this.world.createCollider(groundColliderType, this.groundRigidBody);

            this.rapierLoaded = true;
            appStateStore.setState({physicsReady: true});
        } catch (error) {
            console.error('Error loading RAPIER:', error);
        }
    }

    add(mesh) {

        const rigidBodyType = this.rapier.RigidBodyDesc.dynamic();
        this.rigidBody = this.world.createRigidBody(rigidBodyType);
        this.rigidBody.setTranslation(mesh.position, true);
        this.rigidBody.setRotation(mesh.quaternion, true);

       

        mesh.geometry.computeBoundingBox();
        const size = mesh.geometry.boundingBox.getSize(new THREE.Vector3);
        

        // autoCompute collider dimensions
        const colliderType = this.rapier.ColliderDesc.cuboid(
            size.x / 2,
            size.y / 2,
            size.z / 2,
        );
        this.world.createCollider(colliderType, this.rigidBody);

        this.meshMap.set(mesh, this.rigidBody);
        console.log(this.meshMap);
    }

    loop() {
        if (!this.rapierLoaded) {
            return;
        }

        this.world.step();

        this.meshMap.forEach((rigidBody, mesh) => {
            const position = this.rigidBody.translation();
            const rotation = this.rigidBody.rotation();

            mesh.position.set(position.x, position.y, position.z);
            mesh.quaternion.set(rotation.x, rotation.y, rotation.z, rotation.w);
        })

        
    }
}
