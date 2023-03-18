import './style.css'
import * as THREE from "three"

const scene = new THREE.Scene()
let  sizes = {
  w: window.innerHeight,
  h: window.innerHeight
}

//CAMERA
const camera = new THREE.PerspectiveCamera( 
  15 , sizes.w/sizes.h, 1, 150
)

camera.position.set( 0, 0 , 3 )
//light
const spot = new THREE.SpotLight("red", 4, 20, 90 )
spot.position.set(-1.5,0,-1)
scene.add(spot);
const spot2 = new THREE.SpotLight("blue", 8, 20, 45 )
spot2.position.set(2,0,-1)
scene.add(spot2);
let spotWhite = new THREE.SpotLight("white", 4, 20, 90 )
spotWhite.position.set(2,0,1)
scene.add(spotWhite);

const ambient = new THREE.AmbientLight( "blue", 0.1 )
scene.add(ambient)

//MESH
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

let model; // Declare the variable outside the loader function

// Load the GLTF model
//DRACO
const draco = new DRACOLoader();
draco.setDecoderPath("static/draco/")
//LOADER
const loader = new GLTFLoader();
loader.setDRACOLoader(draco);

loader.load('./static/disco draco.glb', function(gltf) {
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

  renderer.render( scene , camera )
  window.requestAnimationFrame(animate)

}
animate()
},()=> console.log("end")
);

//SET SCENE
scene.add(camera)

const canvas = document.getElementById("canvas_1")
const renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true }) //!!!
renderer.setSize( sizes.w, sizes.h ) 
renderer.physicallyCorrectLights = true  
renderer.render( scene , camera )

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
//const controls = new OrbitControls( camera, canvas )
//controls.enableDamping = true

const start = Date.now()/1000
//ANIMATE
function animate () {
  let timeElapsed = Date.now()/1000 - start

  spot.position.y = (Math.sin(timeElapsed))
  spot.position.z = (Math.cos(timeElapsed))

  spotWhite.intensity = (Math.sin(Math.max(timeElapsed/4, 0.2)))*10

  //controls.update()

  renderer.render( scene , camera )
  window.requestAnimationFrame(animate)
}
animate()


window.addEventListener( "resize", resize )
function resize() {
  console.log("RESIZE")
  camera.aspect = sizes.w / sizes.h 
  camera.updateProjectionMatrix()

  if( window.innerHeight > window.innerWidth ){
    renderer.setSize( window.innerWidth, window.innerWidth )
  }
  else {
    renderer.setSize( window.innerHeight, window.innerHeight )

  }
  renderer.setPixelRatio( 3 )
  renderer.render( scene , camera )
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

const changeText = (elementID, text) => {
  console.log("text")
  document.getElementById(elementID).innerHTML = text;
}
let paragraph2 = "NEXT"

document.getElementById("next_1").addEventListener( "click", ()=> {rotateMesh(model, 0.5); changeText("desc_p", paragraph2) } )
