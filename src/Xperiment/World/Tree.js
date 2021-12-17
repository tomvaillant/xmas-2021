import Xperiment from "../Xperiment";
import * as THREE from 'three'

export default class Tree
{
    constructor()
    {
        this.xperiment = new Xperiment()
        this.scene = this.xperiment.scene
        this.resources = this.xperiment.resources
        this.resource = this.resources.items.treeModel
        this.texture = this.resources.items.treeTexture
        this.setModel()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.material = new THREE.MeshStandardMaterial()
        this.material.color = this.texture
        this.model.material = this.material
        this.model.scale.set(0.0018, 0.0018, 0.0018)
        this.model.rotation.y = Math.PI * 0.25
        this.model.position.set(0.5, - 0.03, - 0.8)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = false
            }
        })

        this.scene.add(this.model)
    }
}