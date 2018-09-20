function Painter(id){
    let container = this.container = document.getElementById(id)
    let rect = container.getBoundingClientRect()
    let canvas = this.canvas = document.createElement("canvas")
    canvas.setAttribute('width', rect.width)
    canvas.setAttribute('height', rect.height)
    container.appendChild(canvas)
    this.context = canvas.getContext('2d')
    this.paint = false
    this.pointsOnly = false
    this.clickX = []
    this.clickY = []
    this.clickDrag = []
    this.initEvents()
}

Painter.prototype.initEvents = function(){
    let canvas = this.canvas
    canvas.addEventListener('mousedown', function(e){
        this.paint = true
        let canvasOffset = $(canvas).offset()
        this.addClick(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top, false)
    }.bind(this))
    
    canvas.addEventListener('mousemove', function(e){
        if(this.paint){
            let canvasOffset = $(canvas).offset()
            this.addClick(e.pageX - canvasOffset.left, e.pageY - canvasOffset.top, true)
            this.redraw()
        }
    }.bind(this))
    
    canvas.addEventListener('mouseup', function(e){
        this.paint = false
    }.bind(this))
}

Painter.prototype.addClick = function(x, y, dragging){
    this.clickX.push(x)
    this.clickY.push(y)
    this.clickDrag.push(dragging)
}

Painter.prototype.redraw = function(){
    let context = this.context
    context.clearRect(0, 0, context.canvas.width, context.canvas.height)
    context.strokeStyle = "#df4b26"
    context.lineJoin = "round"
    context.lineWidth = 5

    if(this.pointsOnly){
        for(var i=0; i<this.clickX.length; i++){
            context.fillRect(this.clickX[i], this.clickY[i],10,10);
        }
    } else {
        for(var i=0; i<this.clickX.length; i++){
            context.beginPath()
            context.moveTo(this.clickX[i], this.clickY[i])
            if(this.clickDrag[i]){
                context.moveTo(this.clickX[i-1], this.clickY[i-1])
            } else {
                context.moveTo(this.clickX[i], this.clickY[i])
            }
            context.lineTo(this.clickX[i], this.clickY[i])
            context.closePath()
            context.stroke()
        }
    }
}

Painter.prototype.getData = function(){
    let result = []
    let stroke = []
    for(let i=0; i<this.clickX.length; i++){
        if(!this.clickDrag[i] && stroke.length){
            result.push(stroke)
            stroke = []
        }
        stroke.push({ x: this.clickX[i], y: this.clickY[i]})
    }
    result.push(stroke)
    return result
}

Painter.prototype.draw = function(points, pointsOnly){
    this.pointsOnly = pointsOnly
    this.clickX = []
    this.clickY = []
    this.clickDrag = []
    points.forEach(point => {
        this.clickX.push(point.x)
        this.clickY.push(point.y)
        this.clickDrag.push(false)
    })
    this.redraw()
    this.pointsOnly = false
}

Painter.prototype.clear = function(){
    this.clickX = []
    this.clickY = []
    this.clickDrag = []
    this.redraw()
}