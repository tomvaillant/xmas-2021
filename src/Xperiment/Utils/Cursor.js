import EventEmitter from "./EventEmitter"
import Xperiment from "../Xperiment";

export default class Cursor extends EventEmitter
{
    constructor()
    {
        super()
        // Setup
        this.xperiment = new Xperiment()
        this.cursor = {x: 0, y: 0}
        this.sizes = this.xperiment.sizes

        // Mousemove
        window.addEventListener('mousemove', (event) =>
        {
            this.cursor.x = (event.clientX / this.sizes.width - 0.5) / 2
            this.cursor.y = (event.clientY / this.sizes.height - 0.5) / 2
        })
    }
}