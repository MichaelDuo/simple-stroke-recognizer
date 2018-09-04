let painter = new Painter('painter')
let recognizeButton = $('#recognizeButton')
recognizeButton.click(function(){
    let data = painter.getData()
    let dataDisplay = $("#dataDisplay")
    dataDisplay.html(JSON.stringify(data, null, 2))
})