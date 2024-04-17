import * as THREE from 'three'
import gsap from 'gsap'
import "./style.css"
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js'

// Scene
const scene = new THREE.Scene()


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Light
const light = new THREE.PointLight(0xffffff, 1, 100, 0)
light.intensity = 3
scene.add(light)

// Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 10
camera.position.y = 5
scene.add(camera)

// Renderer
const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({ canvas })
initViewport()


// Load Duck
const loader = new GLTFLoader()
let duck
loader.load('./assets/duck/Duck.gltf', function (gltf) {
    duck = gltf.scene;
    if (duck !== null) {
        // duck.position.y = 1;
        tl.fromTo(duck.scale, { z: 0, x: 0, y: 0 }, { z: 2, x: 2, y: 2 })
        scene.add(duck)
    }
}, undefined, function (error) {
    console.error(error)
})

const loaderImg = new THREE.TextureLoader();
loaderImg.load('/assets/images/background.png', (texture) => {
    scene.background = texture;
});


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false
controls.autoRotate = true
controls.autoRotateSpeed = 5
// Resize
window.addEventListener("resize", resizeListener)

const loop = () => {
    updateLightPosition()
    controls.update()
    renderViewport()
    window.requestAnimationFrame(loop)
}

loop()


function initViewport() {
    setViewportSize()
    renderer.setPixelRatio(2)
    renderViewport()
}

function setViewportSize() {
    renderer.setSize(sizes.width, sizes.height)
}

function renderViewport() {
    renderer.render(scene, camera)
}

function updateLightPosition() {
    light.position.copy(camera.position)
}

function resizeCamera() {
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
}

function resizeListener() {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    resizeCamera()
    setViewportSize()
}

// Gsap

const tl = gsap.timeline({ default: { duration: 1 } })
tl.fromTo('nav', { y: '-100%' }, { y: '0%' })
tl.fromTo('.title', { top: '110%' }, { top: '60%' })



