import Xperiment from "./Xperiment";
import * as THREE from 'three'

export default class Renderer
{
    constructor()
    {
        this.xperiment = new Xperiment()
        this.canvas = this.xperiment.canvas
        this.sizes = this.xperiment.sizes
        this.scene = this.xperiment.scene
        this.camera = this.xperiment.camera

        this.setInstance()
    }   

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        })

        // this.instance.physicallyCorrectLights = true
        this.instance.outputEncoding = THREE.sRGBEncoding
        // this.instance.toneMapping = THREE.CineonToneMapping
        // this.instance.toneMappingExposure = 1.75
        // this.instance.shadowMap.enabled = true
        // this.instance.shadowMap.type = THREE.PCFSoftShadowMap
        this.instance.setClearColor(new THREE.Color("rgb(15, 11, 55)"))
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    resize() 
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2))
    }

    update()
    {
        this.instance.render(this.scene, this.camera.instance)
    }
}