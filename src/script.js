import './style.css'


import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {RoundedBoxGeometry} from 'three/examples/jsm/geometries/RoundedBoxGeometry';
import {GUI} from 'three/examples/jsm/libs/lil-gui.module.min';
import Stats from 'three/examples/jsm/libs/stats.module';
import {AmbientLight, DoubleSide, MeshBasicMaterial, MeshFaceMaterial} from 'three';




const realData = {'Rust': 1000, 'Assembly': 87877, 'C': 303179, 'Python': 9388381, 'Shell': 5931, 'HTML': 75244, 'CSS': 172770, 'JavaScript': 269187, 'Java': 1353464, 'Gherkin': 8377, 'Go': 39406, 'Ruby': 225041,}

const possiblePositions = [];
for (let i=-4; i<4; i++) {
    for (let j=-4; j<)
}





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
camera.position.set(75, 100, 0);
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















/* CUber laoder */

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



const pos = []

let i = 0
for (const [key, value] of Object.entries(realData)) {

    const fileName = `${key.toLowerCase()}Logo.png`
    const height = 30 * value / 11929857;
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



    const cylinder = new THREE.Mesh( geometryC, t );

    cylinder.position.set(width * i,height/2, 0)

    scene.add( cylinder );
    i = i +1;
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