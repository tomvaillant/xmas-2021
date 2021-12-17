import Xperiment from "../Xperiment";
import * as THREE from 'three'

export default class Snow
{
    constructor()
    {
        this.xperiment = new Xperiment()
        this.scene = this.xperiment.scene
        this.resources = this.xperiment.resources
        this.time = this.xperiment.time

        this.setGeometry()
        this.setTexture()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry()
    {
        this.count = 5000
        this.positions = new Float32Array(this.count * 3)
        this.geometry = new THREE.BufferGeometry(50, 50, 50)
        for(let i = 0; i < this.count * 3; i++) {
            this.positions[i] = (Math.random() - 0.5) * 12
        }
        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
    }

    setTexture()
    {
        this.texture = this.resources.items.snowParticleTexture
        this.texture.encoding = THREE.sRGBEncoding
    }

    setMaterial()
    {
        this.material = new THREE.PointsMaterial({
            size: 0.04,
            alphaMap: this.texture,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Points(this.geometry, this.material)
        this.mesh.rotation.y = -3
        this.mesh.position.x = 4.28
        this.mesh.position.z = - 0.2

        this.scene.add(this.mesh)
    }

    update()
    {
        this.mesh.rotation.z = - this.time.elapsed * 0.2
        this.mesh.position.y = Math.sin(this.time.elapsed * 0.2)
    }
}