import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class Camera {
    constructor(canvas, scene) {
        this.canvas = canvas;
        this.scene = scene;
        this.setInstancee();
        this.setControls();
       
    }

    setInstancee() { 
        this.instance = new THREE.PerspectiveCamera(
            35,
            window.innerWidth / window.innerHeight,
            0.1,
            200
        );
        this.instance.position.z = 5;
    }

    setControls() {
        this.controls = new OrbitControls(this.instance, this.canvas);
        this.controls.enableDamping = true;
    }
}