import './style.css'
import * as THREE from "three"

const scene = new THREE.Scene()
//CAMERA
const camera = new THREE.PerspectiveCamera( 
  45 , window.innerWidth/window.innerHeight, 1, 100
)

camera.position.set( 0, 1 , 3 )
//light
const spot = new THREE.SpotLight("white", 1, 150, 45 )
spot.position.set(0,0,2)
scene.add(spot);
const spot2 = new THREE.SpotLight("red", 1, 150, 45 )
spot2.position.set(1,0,2)
scene.add(spot2);

const ambient = new THREE.AmbientLight( "blue", 0.2 )
scene.add(ambient)

//MESH
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
let model; // Declare the variable outside the loader function

// Load the GLTF model
const loader = new GLTFLoader();
loader.load('./static/joined centered.glb', function(gltf) {
  // Assign the loaded object to the variable
  model = gltf.scene.children[0].children[0].children[0].children[0]
  model.material = new THREE.MeshStandardMaterial({color:"white"});
  //model.geometry.center()
 
  scene.add(gltf.scene.children[0]);
  
  const start = Date.now()/1000
  function animate () {
  let timeElapsed = Date.now()/1000 - start
  model.rotation.z += 0.01

  rendere.render( scene , camera )
  window.requestAnimationFrame(animate)

}
animate()
},()=> console.log("end")
);

//SET SCENE
scene.add(camera)

const canvas = document.getElementById("canvas_1")
const rendere = new THREE.WebGLRenderer({canvas:canvas})
rendere.setSize( window.innerWidth, window.innerHeight )  
rendere.render( scene , camera )

const start = Date.now()/1000
function animate () {
  let timeElapsed = Date.now()/1000 - start

  rendere.render( scene , camera )
  window.requestAnimationFrame(animate)
}
animate()


window.addEventListener( "resize", resize )
function resize() {
  camera.aspect = window.innerWidth / window.innerHeight 
  camera.updateProjectionMatrix()
  rendere.setSize( window.innerWidth, window.innerHeight )
  rendere.setPixelRatio( 3 )
  rendere.render( scene , camera )
}