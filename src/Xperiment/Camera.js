import Xperiment from './Xperiment'
import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor() 
    {
        this.xperiment = new Xperiment()
        this.sizes = this.xperiment.sizes
        this.canvas = this.xperiment.canvas
        this.cursor = this.xperiment.cursor
        this.scene = this.xperiment.scene
        this.debug = this.xperiment.debug

        this.setInstance()
        // this.setOrbitControls()
    }

    setInstance() 
    {
        this.instance = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 9.2)
        this.instance.position.set(3, 0.348, 3.7)
        this.instance.rotation.y = 0.76
        // this.instance.lookAt(0, 0, 0)
        this.scene.add(this.instance)
        
        // if(this.debug.active)
        // {
        //     this.debugFolder = this.debug.debug.addFolder('Camera')
        //     this.debugFolder.add(this.instance.position, 'x').min(- 3).max(3).name(`x`)
        //     this.debugFolder.add(this.instance.position, 'y').min(- 3).max(3).name(`y`)
        //     this.debugFolder.add(this.instance.position, 'z').min(0).max(5).name(`z`)
        //     this.debugFolder.add(this.instance.rotation, 'y').min(- 3).max(3).name(`rotation y`)
        // }
    }
    // setOrbitControls() 
    // {
    //     this.controls = new OrbitControls(this.instance, this.canvas)
    //     this.controls.enableDamping = true
    //     this.controls.enableZoom = true
    //     this.controls.enableRotate = true
    // }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        const parallaxX = this.cursor.cursor.x
        const parallaxY = - this.cursor.cursor.y
        this.instance.position.x = 3 + (parallaxX * 0.10)
        // this.instance.rotation.y = 0.75 + (this.cursor.cursor.x * 0.02)
        this.instance.position.y = 0.348 + (parallaxY * 0.10)

        // this.controls.update()
    }
}