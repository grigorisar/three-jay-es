import './style.css';

import * as THREE from 'three';
import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

 const scene = new THREE.Scene();
 const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight,0.1,1000);
 const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth,window.innerHeight);

camera.position.setZ(30);

renderer.render(scene,camera);

//Torus
const geometry = new THREE.TorusGeometry(10,2,16,100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//LIGHTS
const pointLight  = new THREE.PointLight(0xffffff,3,50,2);
// pointLight.position.set(10,20,-5);
const ambientLight = new THREE.AmbientLight(0xffffff,0.5);
// pointLight.rotateOnAxis(new THREE.Vector3(-20,-30,-5),15);
scene.add(pointLight,ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(400,20,0xfffff)

scene.add(lightHelper,gridHelper);

//Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);
 
//SUN
const sunTexture = new THREE.TextureLoader().load('sun.jpeg');
const normalTexture = new THREE.TextureLoader().load('bump.jpeg');

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: sunTexture,
    bumpMap: normalTexture,
    transparent: true,
    emissive: 0xffffff,
    emissiveIntensity: 0.15,
    // opacity: 0,
  })
);

// sun.position.setZ(30);
// sun.position.setX(-10);

scene.add(sun);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  sun.rotateX += 0.05;
  sun.rotateY += 0.0075;
  sun.rotateZ += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
// moveCamera();

function animate(){
  requestAnimationFrame( animate );
  
  torus.rotateX(0.01);
  torus.rotateY(0.005);
  torus.rotateZ(0.01);

  controls.update()

  renderer.render( scene,camera );
}

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25,20,16);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x,y,z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100))

  star.position.set(x,y,z);
  scene.add(star)
}

Array(200).fill().forEach(addStar);


const spaceTexture = new THREE.TextureLoader().load('space_black.png') ;
scene.background = spaceTexture;

animate();
