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

        this.setInstance()
        // this.setOrbitControls()
    }

    setInstance() 
    {
        this.instance = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 9.2)
        this.instance.position.set(3, 0.3, 3.7)
        this.instance.lookAt(0, 0, 0)
        this.scene.add(this.instance)
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
        this.instance.rotation.y = 0.75 + (this.cursor.cursor.x * 0.02)
        this.instance.position.y = 0.5 + (this.cursor.cursor.y * 0.1)

        // this.controls.update()
    }
}