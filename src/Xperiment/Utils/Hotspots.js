import Xperiment from "../Xperiment";
import * as THREE from 'three'

export default class Hotspots
{
    constructor()
    {
        // Setup
        this.xperiment = new Xperiment()
        this.sizes = this.xperiment.sizes
        this.cursor = this.xperiment.cursor
        this.camera = this.xperiment.camera.instance
        this.debug = this.xperiment.debug

        this.sceneReady = false

        this.points = [
            {
                position: new THREE.Vector3(- 0.984, - 0.246, - 0.612),
                element: document.querySelector('.point-0')
            },
            {
                position: new THREE.Vector3(- 0.024, 0.198, - 1.794),
                element: document.querySelector('.point-1')
            },
            {
                position: new THREE.Vector3(1.158, 0.492, 1.818),
                element: document.querySelector('.point-2')
            },
            {
                position: new THREE.Vector3(- 0.024, 0.714, - 0.612),
                element: document.querySelector('.point-3')
            },
            {
                position: new THREE.Vector3(- 3, 1.452, 0.348),
                element: document.querySelector('.point-4')
            },
            {
                position: new THREE.Vector3(- 3, - 0.174, 0.786),
                element: document.querySelector('.point-5')
            },
            {
                position: new THREE.Vector3(- 2.088, 0.642, - 0.69),
                element: document.querySelector('.point-6')
            },
            {
                position: new THREE.Vector3(- 0.246, 0.42, - 0.612),
                element: document.querySelector('.point-7')
            },
            {
                position: new THREE.Vector3(- 1.572, 1.23, - 0.612),
                element: document.querySelector('.point-8')
            }
        ]

        this.setClickable()

        if(this.debug.active)
        {
            this.debugFolder = this.debug.debug.addFolder('Hotspots')
            for(const point of this.points)
            {
                this.debugFolder.add(point.position, 'x').min(- 3).max(3).name(`x ${point.element.className}`)
                this.debugFolder.add(point.position, 'y').min(- 3).max(3).name(`y ${point.element.className}`)
                this.debugFolder.add(point.position, 'z').min(- 3).max(3).name(`z ${point.element.className}`)
            }
        }
    }

    setVisible()
    {
        window.setTimeout(() =>
        {
            this.sceneReady = true
            for(const point of this.points)
            { 
                point.element.classList.add('visible')
            }
        }, 3000)
    }

    setClickable()
    {
        const labels = document.querySelectorAll('label')

        for(const point of this.points)
        {
            point.element.addEventListener('click', () =>
            {   
                if(point.element.classList.contains('toggled'))
                {
                    point.element.classList.remove('toggled')
                    for(const point of this.points)
                    {
                        point.element.firstChild.style.opacity = 1
                        point.element.firstChild.style.pointerEvents = "auto"
                    }
                }
                else
                {
                    point.element.classList.add('toggled')
                    for(const point of this.points)
                    {
                        point.element.firstChild.style.opacity = 0
                        point.element.firstChild.style.pointerEvents = "none"
                    }
                }
            })
        }
    }

    update()
    {
        if(this.sceneReady)
        {
            for(const point of this.points)
            { 
                const screenPosition = point.position.clone()
                screenPosition.project(this.camera)
                const translateX = screenPosition.x * (this.sizes.width * 0.5) + (this.cursor.cursor.x)
                const translateY = screenPosition.y * (this.sizes.height * 0.5) + (this.cursor.cursor.y * 50)
                point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
            }
        }
    }
}