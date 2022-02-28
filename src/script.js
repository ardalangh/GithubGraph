import './style.css'


import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry';
import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min';
import Stats from 'three/examples/jsm/libs/stats.module';
import {AmbientLight, DoubleSide, MeshBasicMaterial, MeshFaceMaterial} from 'three';




const realData = {'Rust': 1000, 'Assembly': 87877, 'C': 303179, 'Python': 9388381, 'Shell': 5931, 'HTML': 75244, 'CSS': 172770, 'JavaScript': 269187, 'Java': 1353464, 'Gherkin': 8377, 'Go': 39406, 'Ruby': 225041,}



/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Fullscreen
 */
window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000)
camera.position.set(0, 120, 0);
camera.lookAt(0,50,0)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true










let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
let light2 = new THREE.DirectionalLight(0xFFFFFF, 1.0);

light2.position.set(-20, 100, 10)


light.position.set(20, 100, 10);
light.target.position.set(0, 0, 0);
light.castShadow = true;
light.shadow.bias = -0.001;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 500.0;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500.0;
light.shadow.camera.left = 100;
light.shadow.camera.right = -100;
light.shadow.camera.top = 100;
light.shadow.camera.bottom = -100;


scene.add(light);
scene.add(light2);



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))















/* CUber loader */

const loader = new THREE.CubeTextureLoader();
const texture = loader.load([
    '/park2/posx.jpg',
    '/park2/negx.jpg',
    '/park2/posy.jpg',
    '/park2/negy.jpg',
    '/park2/posz.jpg',
    '/park2/negz.jpg',
]);




scene.background = texture;

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(100, 100, 10, 10),
    new MeshBasicMaterial({map:new THREE.TextureLoader().load("/floor.jpg"), side:DoubleSide}),
)
    plane.castShadow = false;
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
scene.add(plane);



const gui = new GUI()
const cubeFolder = gui.addFolder('Camera')
cubeFolder.add(camera.position, 'x', 0, 100)
cubeFolder.add(camera.position, 'y', 0, 100)
cubeFolder.add(camera.position, 'z', 0, 100)
cubeFolder.open()

const planeWidth = plane.geometry.parameters.width;
const planeHeight = plane.geometry.parameters.width;

console.log(planeHeight);
console.log(planeWidth);


const possiblePositions = [];
let prodY = 0;
for (let i=(planeHeight/2 - 10)/10; i>-1; i--) {
    let prodX = 0;
    for (let j=-(planeWidth/2 - 10)/10; j<1; j++) {
        possiblePositions.push([(i*10) - (prodY*10), (j*10) + (prodX * 10)])
        prodX+= 1;
    }
    prodY+= 1;
}

function getMax(obj) {
    return Math.max.apply(null,Object.keys(obj));
  }
// The max value that we are allowed to have before graphs are out of screen
const max = 100 * 7231000 / 11929857;
// Grabs the values of dictionary and used to obtain the max
let dicKeys = Object.values(realData);
var max_of_array = Math.max.apply(Math, dicKeys);
// The value that is going to be used in order to resize the height
let resizeVar = max / max_of_array;




for (const [key, value] of Object.entries(realData)) {

    const fileName = `${key.toLowerCase()}Logo.png`
    //Resizing the heights of graphs based on the resizing variable
    const height = resizeVar * value;
    const width = 10;
    const depth = 10;
    const geometryC = new RoundedBoxGeometry( width, height, depth, 7, 1 );



    const t = [
        new THREE.MeshPhysicalMaterial( {color:0xf65904,roughness : 0, vertexColor: true, side: THREE.DoubleSide}),
        new THREE.MeshPhysicalMaterial( {color:0xf65904,roughness : 0, vertexColor: true, side: THREE.DoubleSide}),
        new MeshBasicMaterial({map:new THREE.TextureLoader().load(fileName), side:DoubleSide}),
        new THREE.MeshPhysicalMaterial( {color:0xf65904, roughness : 0, vertexColor: true, side: THREE.DoubleSide}),
        new THREE.MeshPhysicalMaterial( {color:0xf65904,roughness : 0, vertexColor: true, side: THREE.DoubleSide}),
        new THREE.MeshPhysicalMaterial( {color:0xf65904, roughness : 0, vertexColor: true, side: THREE.DoubleSide}),
    ]


    // Creates the cylinder based on given parameters
    const cylinder = new THREE.Mesh( geometryC, t );
    
    let pos = possiblePositions.pop()
    // Sets the position of the cylinder based on the chordinates of possiblePositions
    cylinder.position.set(pos[0], height/2, pos[1])

    scene.add( cylinder );
}
















/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)

}

tick()