import * as THREE from 'three';
import Camera from './Camera.js';

export default class App {
    constructor() {
        const canvas = document.querySelector('canvas.threejs');
        const scene = new THREE.Scene();
        const camera = new Camera(canvas, scene);
        console.log(camera)
    }
}