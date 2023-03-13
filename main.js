import './style.css'
import * as THREE from "three"

const scene = new THREE.Scene()
const sizes = {
  w: 800,
  h: 800
}

//CAMERA
const camera = new THREE.PerspectiveCamera( 
  15 , sizes.w/sizes.h, 1, 100
)

camera.position.set( 0, 0 , 3 )
//light
const spot = new THREE.SpotLight("red", 0.8, 20, 90 )
spot.position.set(-1.5,0,-1)
spot.decay = 10 
scene.add(spot);
const spot2 = new THREE.SpotLight("blue", 0.8, 20, 45 )
spot2.position.set(2,0,-1)
scene.add(spot2);
let spotWhite = new THREE.SpotLight("white", 0.9, 20, 90 )
spotWhite.position.set(2,0,1)
scene.add(spotWhite);

const ambient = new THREE.AmbientLight( "blue", 0.02 )
scene.add(ambient)

//MESH
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
let model; // Declare the variable outside the loader function

// Load the GLTF model
const loader = new GLTFLoader();
loader.load('./static/joined centered redused.glb', function(gltf) {
  // Assign the loaded object to the variable
  console.log(gltf.scene.children[0])
  model = gltf.scene.children[0]
  model.material = new THREE.MeshStandardMaterial({color:"white"});
  model.material.roughness = 0.4;
  let scale = 0.0004
  model.scale.set (scale,scale,scale) 
  model.position.set(0,0,0)
  //model.geometry.center()
 
  scene.add(gltf.scene.children[0]);
  
  const start = Date.now()/1000
  function animate () {
  let timeElapsed = Date.now()/1000 - start
  //model.rotation.y = timeElapsed/100

  rendere.render( scene , camera )
  window.requestAnimationFrame(animate)

}
animate()
},()=> console.log("end")
);

//SET SCENE
scene.add(camera)

const canvas = document.getElementById("canvas_1")
const rendere = new THREE.WebGLRenderer({canvas:canvas, antialias:true })
rendere.setSize( sizes.w, sizes.h )  
rendere.render( scene , camera )

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
const controls = new OrbitControls( camera, canvas )
controls.enableDamping = true

const start = Date.now()/1000
function animate () {
  let timeElapsed = Date.now()/1000 - start

  spot.position.y = (Math.sin(timeElapsed))
  spot.position.z = (Math.cos(timeElapsed))
  


  controls.update()

  rendere.render( scene , camera )
  window.requestAnimationFrame(animate)
}
animate()


window.addEventListener( "resize", resize )
function resize() {
  camera.aspect = sizes.w / sizes.h 
  camera.updateProjectionMatrix()
  if (window.innerWidth<sizes.w){
    rendere.setSize( window.innerWidth, window.innerWidth )
  }
  else {
    rendere.setSize( sizes.w, sizes.h )

  }
  rendere.setPixelRatio( 3 )
  rendere.render( scene , carotationmera )
}

const rotateMesh = (model, rotation) => {
  let start = model.rotation.y
  let end = start + Math.PI*2*rotation
  let x = 0.02

  function animate() {
    if (start < end) {
      model.rotation.y = start
      start += Math.sin((5*x)/Math.PI)
      window.requestAnimationFrame(animate)
    } else {
      console.log("Animation removed")
    }
  }
  animate()
}


document.getElementById("next_1").addEventListener( "click", ()=> rotateMesh(model, 0.5) )
document.getElementById("next_2").addEventListener( "click", ()=> scaleMesh(model, 2) )