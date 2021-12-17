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
                position: new THREE.Vector3(1.55, 0.3, - 0.6),
                element: document.querySelector('.point-0')
            },
            {
                position: new THREE.Vector3(- 2, 0.8, - 1.6),
                element: document.querySelector('.point-1')
            },
            {
                position: new THREE.Vector3(- 2, 1, 2),
                element: document.querySelector('.point-2')
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
        for(const point of this.points)
        {
            point.element.addEventListener('click', () =>
            {   
                if(point.element.classList.contains('toggled'))
                {
                    point.element.classList.remove('toggled')
                }
                else
                {
                    point.element.classList.add('toggled')
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