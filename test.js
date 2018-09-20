const phi = 0.5 * (-1.0 + Math.sqrt(5.0))

let f = x => (x-2) ** 2

function gss(f, a, b, tol=0.002){
    while(Math.abs(a-b) > tol){
        console.log('-------')
        let c = b - (b-a) * phi
        console.log(c)
        let d = a + (b-a) * phi
        console.log(d)
        if(f(c)<f(d)){
            b = d
        } else {
            a = c
        }
    }
    return (a + b) / 2
}

console.log(gss(f, 0, 5.0))