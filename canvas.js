//window.addEventListener("load",function(){

    const canvas = document.querySelector("#canvas");
    const ctx = canvas.getContext("2d");
    //Resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    let default_bg_color = "white";
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,canvas.width,canvas.height);


    let draw_color = "black";
    let draw_width = 10;
    let isDrawing = false;

    let restore_array = [];
    let index = -1;
     
    function colorchange(element){
        draw_color = element.style.background;
    }

    canvas.addEventListener("touchstart",start,false);
    canvas.addEventListener("touchmove",draw,false);
    canvas.addEventListener("mousedown",start,false);
    canvas.addEventListener("mousemove",draw,false);

    canvas.addEventListener("touchend",stop,false);
    canvas.addEventListener("mouseup",stop,false);
    canvas.addEventListener("mouseout",stop,false);

    function start(event){
        isDrawing = true;
        ctx.beginPath();
        ctx.moveTo(event.clientX-canvas.offsetLeft,event.clientY-canvas.offsetTop);
        event.preventDefault();
    }

    function draw(event){
        if(isDrawing){
            ctx.strokeStyle = draw_color;
            ctx.lineWidth = draw_width;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.lineTo(event.clientX-canvas.offsetLeft,event.clientY-canvas.offsetTop);
            ctx.stroke();
            
        }
    }

    function stop(event){
        if(isDrawing){
            ctx.stroke();
            isDrawing = false;
            ctx.closePath();
        }
        event.preventDefault();

        if(event.type != "mouseout"){
            restore_array.push(ctx.getImageData(0,0,canvas.width,canvas.height));
            index += 1;
        }

       
        

    }

    function clear_canvas(){
        ctx.fillStyle= "white";
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillRect(0,0,canvas.width,canvas.height);

        restore_array = [];
        index = -1;
    }
    
    function undo_last(){
        if(index<=0){
            clear_canvas();
        }
        else{
            index -= 1;
            restore_array.pop();
            ctx.putImageData(restore_array[index],0,0);
        }
    }































   /*  ctx.beginPath();

    //variables
    let paint = false;

    function startedpaint(){
        paint = true;
        ctx.beginPath();
    }
    function finishedpaint(){
        paint = false;
    }

    function draw(e){
        if(!paint) return;
        
        ctx.lineWidth = linesize();
        ctx.lineCap =  "round";
        ctx.strokeStyle = linecolor();`                                                                                                                                                                        `
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
        
    }

    //Events

    canvas.addEventListener("mousedown",startedpaint);
    canvas.addEventListener("mouseup",finishedpaint);
    canvas.addEventListener("mousemove",draw);

    //functions

    function linesize(){
        var s = 10;
        return s;
    }

    function linecolor(){
        var s = "green";
        return s;
    }

    
    //setting
    const size = document.querySelector(".size");
    const shape = document.querySelector(".shape");
    const color = document.querySelector(".color");

      
*/

    
//});