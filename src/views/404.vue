<script setup>
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { onMounted, ref } from 'vue'

const main = ref(null)
onMounted(() => {
  let orbit
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true})
  renderer.setSize(window.innerWidth, window.innerHeight - 42)
  main.value.appendChild(renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableRotate = false
  controls.enableDamping = true
  controls.autoRotate = true
  controls.autoRotateSpeed = 1

  const leafTexture = new THREE.TextureLoader().load('/glass.svg')

  const material = new THREE.SpriteMaterial({
    map: leafTexture,
    transparent: true
  })

  document.addEventListener('mousemove', function(e){
    let scale = -0.0001
    orbit.rotateY( e.movementX * scale )
    orbit.rotateX( e.movementY * scale )
    orbit.rotation.z = 0
  })

  orbit = new THREE.Object3D()
  orbit.rotation.order = "YXZ"
  scene.add(orbit)

  let cameraDistance = 1
  camera.position.z = cameraDistance
  orbit.add( camera )

  for (let i = 0; i < 100; i++) {
    const sprite = new THREE.Sprite(material)
    sprite.position.set(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5)
    sprite.scale.set(0.5, 0.5, 0.5)
    scene.add(sprite)
  }

  camera.position.z = 5

  const animate = function () {
    requestAnimationFrame(animate)

    scene.children.forEach(child => {
      if (child instanceof THREE.Sprite) {
        child.position.y -= 0.01
        if (child.position.y < -5) {
          child.position.y = 5
        }
      }
    })

    controls.update()

    renderer.render(scene, camera)
  }

  animate()


})


</script>

<template>
  <main class="main" ref="main">
      <div class="error-page">
        <h1>404</h1>
        <p>Page not found</p>
        <Button
          is-link
          to="/"
        >
          Go back
        </Button>
      </div>
  </main>
</template>

<style scoped>
  .main {
    height: calc(100vh - 42px);
  }

  canvas {
    position: absolute;
    inset: 0;
  }

  .error-page {
    width: 300px;
    aspect-ratio: 4 / 3;
    background-color: var(--main-bg);
    color: rgb(var(--text-color));
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    border-radius: 4px;
    position: absolute;
    left: calc(50% - 150px);
    top: calc(50% - 150px);
    border: 1px solid rgb(var(--accent-color) / 0.5);
  }

  p {
    margin-bottom: 12px;
  }
</style>