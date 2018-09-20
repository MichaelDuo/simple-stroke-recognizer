(function(){
    const NumPoints = 64
    const SquareSize = 250
    const Origin = new Point(0, 0)
    const Phi = 0.5 * (-1 + Math.sqrt(5)) // Golden ratio
    const angleRange = Deg2Rad(45.0);
    const anglePrecision = Deg2Rad(2.0);

    let Multistrokes = [
        new Multistroke("Square", [
            [new Point(30, 7), new Point(30, 87)],
            [new Point(30, 7), new Point(103, 7), new Point(103, 87)],
            [new Point(30, 87, new Point(103, 87))]
        ]),
        new Multistroke("LeftSquareBracket", [
            [new Point(140,124),new Point(138,123),new Point(135,122),new Point(133,123),new Point(130,123),new Point(128,124),new Point(125,125),new Point(122,124),new Point(120,124),new Point(118,124),new Point(116,125),new Point(113,125),new Point(111,125),new Point(108,124),new Point(106,125),new Point(104,125),new Point(102,124),new Point(100,123),new Point(98,123),new Point(95,124),new Point(93,123),new Point(90,124),new Point(88,124),new Point(85,125),new Point(83,126),new Point(81,127),new Point(81,129),new Point(82,131),new Point(82,134),new Point(83,138),new Point(84,141),new Point(84,144),new Point(85,148),new Point(85,151),new Point(86,156),new Point(86,160),new Point(86,164),new Point(86,168),new Point(87,171),new Point(87,175),new Point(87,179),new Point(87,182),new Point(87,186),new Point(88,188),new Point(88,195),new Point(88,198),new Point(88,201),new Point(88,207),new Point(89,211),new Point(89,213),new Point(89,217),new Point(89,222),new Point(88,225),new Point(88,229),new Point(88,231),new Point(88,233),new Point(88,235),new Point(89,237),new Point(89,240),new Point(89,242),new Point(91,241),new Point(94,241),new Point(96,240),new Point(98,239),new Point(105,240),new Point(109,240),new Point(113,239),new Point(116,240),new Point(121,239),new Point(130,240),new Point(136,237),new Point(139,237),new Point(144,238),new Point(151,237),new Point(157,236),new Point(159,237)]
        ]),
        new Multistroke("RightSquareBracket", [
            [new Point(112,138),new Point(112,136),new Point(115,136),new Point(118,137),new Point(120,136),new Point(123,136),new Point(125,136),new Point(128,136),new Point(131,136),new Point(134,135),new Point(137,135),new Point(140,134),new Point(143,133),new Point(145,132),new Point(147,132),new Point(149,132),new Point(152,132),new Point(153,134),new Point(154,137),new Point(155,141),new Point(156,144),new Point(157,152),new Point(158,161),new Point(160,170),new Point(162,182),new Point(164,192),new Point(166,200),new Point(167,209),new Point(168,214),new Point(168,216),new Point(169,221),new Point(169,223),new Point(169,228),new Point(169,231),new Point(166,233),new Point(164,234),new Point(161,235),new Point(155,236),new Point(147,235),new Point(140,233),new Point(131,233),new Point(124,233),new Point(117,235),new Point(114,238),new Point(112,238)]
        ]),
        new Multistroke("Triangle", [
            [new Point(137,139),new Point(135,141),new Point(133,144),new Point(132,146),new Point(130,149),new Point(128,151),new Point(126,155),new Point(123,160),new Point(120,166),new Point(116,171),new Point(112,177),new Point(107,183),new Point(102,188),new Point(100,191),new Point(95,195),new Point(90,199),new Point(86,203),new Point(82,206),new Point(80,209),new Point(75,213),new Point(73,213),new Point(70,216),new Point(67,219),new Point(64,221),new Point(61,223),new Point(60,225),new Point(62,226),new Point(65,225),new Point(67,226),new Point(74,226),new Point(77,227),new Point(85,229),new Point(91,230),new Point(99,231),new Point(108,232),new Point(116,233),new Point(125,233),new Point(134,234),new Point(145,233),new Point(153,232),new Point(160,233),new Point(170,234),new Point(177,235),new Point(179,236),new Point(186,237),new Point(193,238),new Point(198,239),new Point(200,237),new Point(202,239),new Point(204,238),new Point(206,234),new Point(205,230),new Point(202,222),new Point(197,216),new Point(192,207),new Point(186,198),new Point(179,189),new Point(174,183),new Point(170,178),new Point(164,171),new Point(161,168),new Point(154,160),new Point(148,155),new Point(143,150),new Point(138,148),new Point(136,148)]
        ]),
        new Multistroke("Triangle", [
            [new Point(30, 1), new Point(1, 30)],
            [new Point(30, 1), new Point(30, 30)],
            [new Point(1, 30), new Point(30, 30)]
        ]),
        new Multistroke("Circle", [
            [new Point(127,141),new Point(124,140),new Point(120,139),new Point(118,139),new Point(116,139),new Point(111,140),new Point(109,141),new Point(104,144),new Point(100,147),new Point(96,152),new Point(93,157),new Point(90,163),new Point(87,169),new Point(85,175),new Point(83,181),new Point(82,190),new Point(82,195),new Point(83,200),new Point(84,205),new Point(88,213),new Point(91,216),new Point(96,219),new Point(103,222),new Point(108,224),new Point(111,224),new Point(120,224),new Point(133,223),new Point(142,222),new Point(152,218),new Point(160,214),new Point(167,210),new Point(173,204),new Point(178,198),new Point(179,196),new Point(182,188),new Point(182,177),new Point(178,167),new Point(170,150),new Point(163,138),new Point(152,130),new Point(143,129),new Point(140,131),new Point(129,136),new Point(126,139)]
        ])
    ]
    
    function Point(x, y){
        this.x = x
        this.y= y
    }
    
    function Rectangle(x, y, width, height){
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
    
    function Unistroke(name, points){
        this.name = name
        this.points = resample(points, NumPoints)
        let radians = indicativeAngle(this.points)
        this.points = rotateBy(this.points, -radians)
        this.points = scaleTo(this.points, SquareSize)
        this.points = translateTo(this.points, Origin)
    }

    function Multistroke(name, strokes){
        this.name = name
        this.numStrokes = strokes.length
        let permutedStrokes = heapPermute(strokes)
        let unistrokes = makeUnistrokes(permutedStrokes)
        this.unistrokes = unistrokes.map(unistroke=>new Unistroke(name, unistroke))
    }

    function heapPermute(strokes){
        let result = []
        let swap = (arr, i, j) => {
            let tmp = arr[i]
            arr[i] = arr[j]
            arr[j] = tmp
        }
        let generate = (n, strokes) => {
            if(n===1) result.push(strokes.slice())
            else {
                for(let i=0; i<n; i++){
                    generate(n-1, strokes)
                    if(n % 2 === 0){
                        swap(strokes, i, n-1)
                    } else {
                        swap(strokes, 0, n-1)
                    }
                }
            }
        }
        generate(strokes.length, strokes)
        return result
    }

    function makeUnistrokes(permutedStrokes){
        let unistrokes = []
        for(let r = 0; r < permutedStrokes.length; r++){
            for(let b = 0; b < Math.pow(2, permutedStrokes[r].length); b++){
                let unistroke = []
                for(let i=0; i<permutedStrokes[r].length; i++){
                    let pts
                    if(((b >> i) & 1) === 1) {
                        pts = permutedStrokes[r][i].slice().reverse()
                    } else {
                        pts = permutedStrokes[r][i].slice()
                    }
                    unistroke = unistroke.concat(pts)
                }
                unistrokes.push(unistroke)
            }
        }
        return unistrokes
    }

    function combineStrokes(strokes){
        return strokes.reduce((acc, curr)=>acc.concat(curr))
    }
    
    function resample(points, n){
        let I = pathLength(points) / (n-1)
        let D = 0
        let newPoints = [points[0]]
        for(let i=1; i < points.length; i++){
            let d = distance(points[i-1], points[i])
            if((D + d) >= I){
                let qx = points[i-1].x + ((I - D) / d) * (points[i].x - points[i-1].x)
                let qy = points[i-1].y + ((I - D) / d) * (points[i].y - points[i-1].y)
                let q = new Point(qx, qy)
                newPoints.push(q)
                points.splice(i, 0, q)
                D = 0
            }
            else {
                D += d
            }
        }
        if(newPoints.length === n-1){
            newPoints.push(new Point(points[points.length - 1].x, points[points.length-1].y))   
        }
        return newPoints
    }
    
    function pathLength(points){
        let d = 0
        for(var i=1; i<points.length; i++){
            d += distance(points[i-1], points[i])
        }
        return d
    }
    
    function distance(p1, p2){
        let dx = p2.x - p1.x
        let dy = p2.y - p1.y
        return Math.sqrt(dx * dx + dy * dy)
    }
    
    function centroid(points){
        let x = 0, y = 0
        for(let i = 0; i < points.length; i++){
            x += points[i].x
            y += points[i].y
        }
        x /= points.length
        y /= points.length
        return new Point(x, y)
    }
    
    function indicativeAngle(points){
        let c = centroid(points)
        return Math.atan2(c.y-points[0].y, c.x - points[0].x)
    }
    
    function rotateBy(points, radians){
        let c = centroid(points)
        let cos = Math.cos(radians)
        let sin = Math.sin(radians)
        let newPoints = []
        for(let i=0; i<points.length; i++){
            let qx = (points[i].x - c.x) * cos - (points[i].y - c.y) * sin + c.x
            let qy = (points[i].x - c.x) * sin + (points[i].y - c.y) * cos + c.y
            newPoints.push(new Point(qx, qy))
        }
        return newPoints
    }
    
    function boundingBox(points){
        let minX = +Infinity, maxX = -Infinity, minY = +Infinity, maxY = -Infinity
        for(let i=0; i<points.length; i++){
            minX = Math.min(minX, points[i].x)
            minY = Math.min(minY, points[i].y)
            maxX = Math.max(maxX, points[i].x)
            maxY = Math.max(maxY, points[i].y)
        }
        return new Rectangle(minX, minY, maxX - minX, maxY - minY)
    }
    
    function scaleTo(points, size){
        let B = boundingBox(points)
        let newPoints = []
        for(let i=0; i<points.length; i++){
            let qx = points[i].x * (size / B.width)
            let qy = points[i].y * (size / B.height)
            newPoints.push(new Point(qx, qy))
        }
        return newPoints
    }
    
    function translateTo(points, pt){
        let c = centroid(points)
        let newPoints = []
        for(let i=0; i<points.length; i++){
            let qx = points[i].x + (pt.x - c.x)
            let qy = points[i].y + (pt.y - c.y)
            newPoints.push(new Point(qx, qy))
        }
        return newPoints
    }
    
    function pathDistance(pts1, pts2){
        let d = 0
        for(let i=0; i<pts1.length; i++){
            d += distance(pts1[i], pts2[i])
        }
        return d / pts1.length
    }
    
    function Deg2Rad(d) { return (d * Math.PI)/180 }
    
    function distanceAtBestAngle(points, T, a, b, threshold){
        let x1 = b + (a - b) * Phi
        let f1 = distanceAtAngle(points, T, x1)
        let x2 = a - (a - b) * Phi
        let f2 = distanceAtAngle(points, T, x2)
        while(Math.abs(a - b) > threshold){
            if(f1 < f2){
                b = x2
            } else {
                a = x1
            }
            x1 = b + (a - b) * Phi
            f1 = distanceAtAngle(points, T, x1)
            x2 = a - (a - b) * Phi
            f2 = distanceAtAngle(points, T, x2)
        }
        return Math.min(f1, f2)
    }
    
    function distanceAtAngle(points, T, radians){
        let newPoints = rotateBy(points, radians)
        return pathDistance(newPoints, T.points)
    }

    function Recognizer(){
        this.multistrokes = [].concat(Multistrokes) 
    
        this.recognize = function(strokes){
            let t0 = Date.now()
            let points = combineStrokes(strokes)
            points = resample(points, NumPoints)
            let radians = indicativeAngle(points)
            points = rotateBy(points, -radians)
            points = scaleTo(points, SquareSize)
            points = translateTo(points, Origin)
            
            let b = +Infinity
            let u = -1
            for(let i = 0; i < this.multistrokes.length; i++){
                for(let j=0; j < this.multistrokes[i].unistrokes.length; j++){
                    let d = distanceAtBestAngle(points, this.multistrokes[i].unistrokes[j], -angleRange, +angleRange, anglePrecision)
                    if(d<b){
                        b = d
                        u = i
                    }
                }
            }
            return { name: this.multistrokes[u].name}
        }
    }
    window.Point = Point
    window.Recognizer = Recognizer
})()