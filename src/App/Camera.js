import * as THREE from 'three'
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { sizesStore } from './Utils/Store.js';
import Character from './World/Character.js';


import App from './App.js'

export default class Camera{
    constructor() {
        this.app = new App()
        this.canvas = this.app.canvas

        this.sizesStore = sizesStore

        this.sizes = this.sizesStore.getState()

        this.setInstance()
        this.setControls()
        this.setResizeLister()
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            1,
            400
          );
          this.instance.position.z = 100
    }

    setControls() {
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;

    }

    setResizeLister() {
        this.sizesStore.subscribe((sizes)=>{
            this.instance.aspect = sizes.width / sizes.height
            this.instance.updateProjectionMatrix()
        })
    }


    loop() {

        this.controls.update()

        // doing 3rd person so camera sticks to our character

        // checking if character exists
        this.character = this.app.world.character?.rigidBody;
        console.log(this.character)

        // updating camera if character exists
        if (this.character) {

            // changing camera position so its above the avatar
            const characterPosition = this.character.translation();
            const characterRotation = this.character.rotation();
            // cameraPosition.y += 10;
            // cameraPosition.z += 60;

            const cameraOffset = new THREE.Vector3(0, 30, 55);
            cameraOffset.applyQuaternion(characterRotation);
            cameraOffset.add(characterPosition);

            const targetOffset = new THREE.Vector3(0, 10, 0);
            targetOffset.applyQuaternion(characterRotation);
            targetOffset.add(characterPosition);
            

            
            this.instance.position.lerp(cameraOffset, 0.01);
            this.controls.target.lerp(targetOffset, 0.01);
        }
        
    }
}