import EventEmitter from "./EventEmitter";
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'

export default class Resources extends EventEmitter 
{
    constructor(sources)
    {
        super()

        // Options
        this.sources = sources
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0
        this.loadingBarElement = document.querySelector('.loading-bar')

        this.createLoader()
        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader()
    }

    createLoader()
    {
        const overlayGeometry = new THREE.PlaneBufferGeometry(2, 2, 1, 1)
        const overlayMaterial = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            uniforms: 
            {
                uAlpha: { value: 0.5 }
            },
            vertexShader: `
                void main()
                {
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uAlpha;

                void main()
                {
                    gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
                }
            `
        })

        this.overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
        // this.scene.add(overlay)

        this.on('ready', () =>
        {
            gsap.delayedCall(0.5, () =>
            {
                gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0 })
                this.loadingBarElement.classList.add('ended')
                this.loadingBarElement.style.transform = ''
            })
        })
    }

    startLoading()
    {
        for(const source of this.sources)
        {
            if(source.type === 'gltfModel')
            {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => 
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'texture')
            {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => 
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
            else if(source.type === 'cubeTexture')
            {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) => 
                    {
                        this.sourceLoaded(source, file)
                    }
                )
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file
        this.loaded++

        const progressRatio = this.loaded / this.toLoad
        this.loadingBarElement.style.transform = `scaleX(${progressRatio})`

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }
}