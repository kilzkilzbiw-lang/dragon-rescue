function drawDragon(ctx,x,y){

ctx.fillStyle="#ff3333"

ctx.fillRect(x,y,40,20)
ctx.fillRect(x+30,y-10,20,20)
ctx.fillRect(x-10,y+5,20,10)

}

function drawGoblin(ctx,x,y){

ctx.fillStyle="#33ff33"

ctx.fillRect(x,y,30,30)

ctx.fillStyle="black"

ctx.fillRect(x+5,y+5,5,5)
ctx.fillRect(x+20,y+5,5,5)

}

function drawQueen(ctx,x,y){

ctx.fillStyle="pink"

ctx.fillRect(x,y,30,40)

}
