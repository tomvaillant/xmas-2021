import Xperiment from "../Xperiment";
import * as THREE from 'three'

export default class Environment
{
    constructor()
    {
        this.xperiment = new Xperiment()
        this.scene = this.xperiment.scene
        this.resources = this.xperiment.resources

        this.setMoonlight()
    }
    
    setMoonlight()
    {
        const width = 15
        const height = 15
        const intensity = 0.7
        const orange = new THREE.Color("rgb(255, 232, 137)")
        this.moonLight = new THREE.RectAreaLight(orange, intensity,  width, height)
        this.moonLight.position.set(2, 5, 6)
        this.moonLight.lookAt(0, 0, 0)
        this.scene.add(this.moonLight)
    }
}