import './style.css'
import * as THREE from "three"

const scene = new THREE.Scene()
//CAMERA
const camera = new THREE.PerspectiveCamera( 
  45 , window.innerWidth/window.innerHeight, 1, 100
)
camera.position.set( 0, 1 , 3 )

//MESH
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
let model; // Declare the variable outside the loader function

// Load the GLTF model
const loader = new GLTFLoader();
loader.load('./static/joined.glb', function(gltf) {
  // Assign the loaded object to the variable
  console.log(gltf.scene.children[0].children[0].children[0].children[0])
  let mesh = gltf.scene.children[0].children[0].children[0].children[0]
  mesh.material = new THREE.MeshBasicMaterial({color:"red"});

  scene.add(gltf.scene.children[0]);
});

const material = new THREE.MeshBasicMaterial({color:"white"})
const mesh = new THREE.Mesh(model, material)
//scene.add(mesh)

const g = new THREE.BoxGeometry(1,1,1)
const mesh2 = new THREE.Mesh(g, material)
scene.add(mesh2)

//SET SCENE
scene.add(camera)

const canvas = document.getElementById("canvas_1")
const rendere = new THREE.WebGLRenderer({canvas:canvas})
rendere.setSize( window.innerWidth, window.innerHeight )  
rendere.render( scene , camera )

const start = Date.now()/1000
function animate () {
  let timeElapsed = Date.now()/1000 - start
  //mesh.rotation.x = timeElapsed

  rendere.render( scene , camera )
  window.requestAnimationFrame(animate)
}
animate()


window.addEventListener( "resize", resize )
function resize() {
  camera.aspect = window.innerWidth / window.innerHeight 
  camera.updateProjectionMatrix()
  rendere.setSize( window.innerWidth, window.innerHeight )  
  rendere.render( scene , camera )
}