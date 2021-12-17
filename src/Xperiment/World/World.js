import Xperiment from "../Xperiment";
import Environment from "./Environment";
import Blender from "./Blender";
import FairyLights from "./FairyLights";
import Snow from "./Snow";
import Tree from "./Tree";
import Sleigh from "./Sleigh";

export default class World
{
    constructor()
    {
        this.xperiment = new Xperiment()
        this.scene = this.xperiment.scene
        this.resources = this.xperiment.resources

        this.resources.on('ready', () =>
        {
            // Setup
            this.blender = new Blender()
            this.fairyLights = new FairyLights()
            this.snow = new Snow()
            this.tree = new Tree()
            this.sleigh = new Sleigh()
            this.environment = new Environment()
        })
    }

    update()
    {
        if(this.snow)
        {
            this.snow.update()
        }
        if(this.fairyLights)
        {
            this.fairyLights.update()
        }
    }
}