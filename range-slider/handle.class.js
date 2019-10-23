/**
 * Author: Ajay Badgujar
 * Website: https://www.ajaybadgujar.com/
 * Youtube: https://www.youtube.com/channel/UCCnj0pD6f90B3ljdw98M7jA
 */
export class Handle{

    constructor(slider, position, index){
        this.slider = slider;
        this.position = position;
        this.index = index;

        this.init();
    }

    init(){
        this.handle = document.createElement("div");
        this.handle.classList.add("handle");

        this.handle.style.left = (this.position - this.slider.range.min ) * this.slider.pixelsPerUnit + "px";

        this.slider.container.appendChild(this.handle);

        if(this.slider.displayValue){
            this.valueContainer = document.createElement("div");
            this.valueContainer.classList.add("value");
            this.valueContainer.innerHTML = this.position - this.slider.range.min;        
            this.handle.appendChild(this.valueContainer);
        }
        this.handle.addEventListener("mousedown", (e)=>this.onMouseDown(e));

        this.minLimit = 0;
        this.maxLimit = this.slider.width;

    }

    onMouseDown(e){
        e = e || window.event;
        e.preventDefault();

        document.onmousemove = (e)=>this.onMouseMove(e);
        document.onmouseup = (e)=>this.onMouseUp(e);
        
        // find left side handle and set minimum limit
        if(this.index > 0){
            this.minLimit = parseInt(this.slider.handleDOMs[this.index-1].handle.style.left);            
        }else{
            this.minLimit = 0;
        }
        
        // find right side handle and set maximum limit
        if(this.index < this.slider.handleDOMs.length - 1){
            this.maxLimit = parseInt(this.slider.handleDOMs[this.index + 1].handle.style.left);            
        }else{
            this.maxLimit = this.slider.width;
        }

    }

    onMouseMove(e){
        e = e || window.event;
        e.preventDefault();

        this.moveHandle(e);
    }

    moveHandle(e){
        let currentPos = parseInt(this.handle.style.left);
        
        if(currentPos < this.minLimit){
            this.handle.style.left = this.minLimit + "px";
        }else if(currentPos > this.maxLimit){
            this.handle.style.left = this.maxLimit + "px";
        }else{
            this.handle.style.left = e.movementX + currentPos + "px";
        }

        if(this.slider.displayValue){
            let value = parseInt(this.handle.style.left) / this.slider.pixelsPerUnit;

            if(value < 0){
                value = 0;
            }

            if(value > this.slider.range.max){
                value = this.slider.range.max;
            }

            this.valueContainer.innerHTML = parseInt(value);
        }
    }

    onMouseUp(e){
        this.moveHandle(e)
        document.onmousemove = null;
        document.onmouseup = null;
    }
    
}