import Xperiment from "../Xperiment";
import * as THREE from 'three'

export default class Blender
{
    constructor()
    {
        this.xperiment = new Xperiment()
        this.scene = this.xperiment.scene
        this.resources = this.xperiment.resources

        // Setup
        this.blenderScene = this.resources.items.blenderScene.scene
        this.bakedTexture = this.resources.items.bakedTexture

        this.setTextures()
        this.setMaterials()
        this.setScene()
    }

    setTextures()
    {
        this.bakedTexture.flipY = false
        this.bakedTexture.encoding = THREE.sRGBEncoding
    }
    setMaterials()
    {
        this.orangeColor = new THREE.Color("rgb(255, 232, 137)")
        this.bakedMaterial = new THREE.MeshBasicMaterial({ map: this.bakedTexture })
        this.poleLightMaterial = new THREE.MeshBasicMaterial({ color: this.orangeColor})
        this.windowMaterial = new THREE.MeshBasicMaterial({ color: this.orangeColor })
        this.signTextMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 })

    }
    setScene()
    {
        // Scene
        this.bakedMesh = this.blenderScene.children.find((child) => child.name === "baked")
        this.poleLightAMesh = this.blenderScene.children.find((child) => child.name === "poleLightA")
        this.poleLightBMesh = this.blenderScene.children.find((child) => child.name === "poleLightB")
        this.windowMesh = this.blenderScene.children.find((child) => child.name === "door")
        this.signTextMesh = this.blenderScene.children.find((child) => child.name === "text")

        // Global variable for camera interaction
        

        this.bakedMesh.material = this.bakedMaterial
        this.poleLightAMesh.material = this.poleLightMaterial
        this.poleLightBMesh.material = this.poleLightMaterial
        this.windowMesh.material = this.windowMaterial
        this.signTextMesh.material = this.signTextMaterial

        this.blenderScene.rotation.y = 1.15
        this.blenderScene.position.x = 0.62
        this.blenderScene.position.z = -0.28

        window.blenderScene = this.blenderScene
        this.scene.add(this.blenderScene)
    }
}
