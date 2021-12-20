import Sizes from "./Utils/Sizes"
import Time from "./Utils/Time"
import * as THREE from 'three'
import Camera from "./Camera"
import Renderer from "./Renderer"
import World from "./World/World"
import Cursor from "./Utils/Cursor"
import Resources from "./Utils/Resources"
import sources from './sources.js'
import Debug from "./Utils/Debug"
import Hotspots from "./Utils/Hotspots"
import TreesSold from "./Dataviz/TreesSold"
import TreesGrown from "./Dataviz/TreesGrown"

let instance = null

export default class Xperiment 
{
    constructor(_canvas)
    {
        // Original instance only
        if(instance)
        {
            return instance
        }

        instance = this

        // Global access
        window.xperiment = this

        // Options
        this.canvas = _canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.cursor = new Cursor()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.overlay = this.resources.overlay
        this.world = new World()
        this.camera = new Camera()
        this.hotspots = new Hotspots()
        
        new TreesSold()
        new TreesGrown()
        
        this.renderer = new Renderer()

        this.scene.add(this.overlay)

        this.sizes.on('resize', () => 
        {
            this.resize()
        })
        
        this.time.on('tick', () => 
        {
            this.update()
        })

        this.resources.on('ready', () => 
        {
            this.hotspots.setVisible()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update() 
    {
        this.camera.update()
        this.world.update()
        this.hotspots.update()
        this.renderer.update()
    }
}