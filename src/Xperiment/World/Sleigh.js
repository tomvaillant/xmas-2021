import Xperiment from "../Xperiment";
import * as THREE from 'three'

export default class Sleigh
{
    constructor()
    {
        this.xperiment = new Xperiment()
        this.scene = this.xperiment.scene
        this.resources = this.xperiment.resources
        this.resource = this.resources.items.sleighModel
        this.texture = this.resources.items.sleighTexture
        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene.children[0]
        this.model.scale.set(1.5, 1.5, 1.5)
        this.material = new THREE.MeshBasicMaterial({ map: this.texture })
        this.model.material = this.material
        this.model.position.set(0.6, - 1.5, 2)
        this.model.rotation.z = - Math.PI * 0.5

        this.scene.add(this.model)
    }
}