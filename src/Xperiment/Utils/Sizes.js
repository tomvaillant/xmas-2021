import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter
{
    constructor()
    {
        super()
        // Setup
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(window.devicePixelRatio, 2)
        document.body.style.width = `${this.width}px`
        // Resize
        window.addEventListener('resize', () =>
        {
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(window.devicePixelRatio, 2)
            document.body.style.width = `${this.width}px`
            // Event emitter for other classes
            this.trigger('resize')
        })
    }
}