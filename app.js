let painter = new Painter('painter')
let recognizeButton = $('#recognizeButton')
let clickButton = $('#clearButton')
let resultEl = $('#result')
let dataDisplay = $("#dataDisplay")

recognizeButton.click(recognize)

clickButton.click(function(){
    painter.clear()
    resultEl.empty()
    dataDisplay.empty()
})


function recognize(){
    let data = painter.getData()
    dataDisplay.html(JSON.stringify(data, null, 2))
    let strokes = data.map(stroke=>stroke.map(point=>new Point(point.x, point.y)))
    let recognizer = new Recognizer()
    let result = recognizer.recognize(strokes)
    resultEl.html(result.name)
}