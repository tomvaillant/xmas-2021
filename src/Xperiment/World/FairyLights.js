import Xperiment from "../Xperiment";
import * as THREE from 'three'

export default class mesh
{
    constructor()
    {
        this.xperiment = new Xperiment()
        this.scene = this.xperiment.scene
        this.resources = this.xperiment.resources
        this.time = this.xperiment.time

        this.setGeometryAndTextures()
        this.setMaterial()
        this.setMesh()
    }

    setGeometryAndTextures()
    {
        this.geometry = new THREE.BufferGeometry(1, 1, 1)
        this.texture = this.resources.items.fairyParticleTexture
        this.texture.encoding = THREE.sRGBEncoding

        this.count = 100
        this.positions = new Float32Array(this.count * 3)
        this.colors = new Float32Array(this.count * 3)

        for(let i = 0; i < this.count * 3; i++) {
            this.positions[i] = (Math.random() - 0.5)
            this.colors[i] = Math.random()
        }

        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3))
        this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors, 3))
    }

    setMaterial()
    {
        this.material = new THREE.PointsMaterial({
            size: 0.08,
            alphaMap: this.texture,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            vertexColors: true
        })
    }

    setMesh()
    {
        this.mesh = new THREE.Points(this.geometry, this.material)
        this.mesh.scale.set(5, 0.2, 5)
        this.mesh.position.set(1.1, 0.19, 1.81)

        this.scene.add(this.mesh)
    }

    update()
    {
        for(let i = 0; i < this.count; i++)
        {
            let i3 = i * 3

            const x = this.geometry.attributes.position.array[i3]
            this.geometry.attributes.position.array[i3 + 1] = Math.sin(this.time.elapsed + x * 150.0) * 0.3
        }
        this.geometry.attributes.position.needsUpdate = true
    }
}

