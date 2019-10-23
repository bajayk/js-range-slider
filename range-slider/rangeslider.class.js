/**
 * Author: Ajay Badgujar
 * Website: https://www.ajaybadgujar.com/
 * Youtube: https://www.youtube.com/channel/UCCnj0pD6f90B3ljdw98M7jA
 */
import { Handle } from "./handle.class";
 export class RangeSlider{

    // @param id:string         => ID of the DOM element where you want to display rangeslider. Required
    // @param range:object      => Define max and min range. Default {min:0, max:100}
    // @param width:number      => Specify the width of the range slider. Default 150px
    // @param handles:array     => Number of handles you need, Maximum 10 handles allowed.
    //                          => Default [0] specify the position of handles in array by comma seperated.
    // @param displayValues     => True to make values visble over the handle, False to make values invisible.
    //                          => Default false;

    constructor(options){
        
        // Get container
        this.id             = options.id;
        this.container      = document.getElementById(this.id);

        // Set the default values
        this.range          = (options.range) ? options.range : {min:0, max:100};
        this.width          = (options.width) ? options.width : 150;
        this.handles        = (options.handles) ? options.handles : [0];
        this.displayValue   = (options.displayValue) ? options.displayValue : false;


        // pixels per unit
        this.pixelsPerUnit = this.width / (this.range.max - this.range.min);
        

        // handle DOMs
        this.handleDOMs = [];

        this.init();

    }

    init(){
        this.container.style.width = this.width + "px";
        this.container.classList.add("range-slider");

        // Creating seekbar
        this.seekbar = document.createElement("div");
        this.seekbar.classList.add("seekbar");
        this.container.appendChild(this.seekbar);

        // Creating handles
        for(let i=0; i<this.handles.length; i++){
            let position = this.handles[i];
            let handle = new Handle(this, position, i);
            this.handleDOMs.push(handle);
        }

    }
 }