import * as THREE from 'three';
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import {STLLoader} from "https://unpkg.com/three@0.143.0/examples/jsm/loaders/STLLoader.js";

export function render(modelBinary){

    //https://codepen.io/leonnicklas/pen/jOyqXoN

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.setScalar(0.5);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    
    var controls = new OrbitControls(camera, renderer.domElement);
    
    var loader = new STLLoader();
    
    var geometry = loader.parse(modelBinary); 
    console.log(geometry);
    
    var material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera)
    });
}
