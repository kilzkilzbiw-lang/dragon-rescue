const canvas=document.getElementById("game")
const ctx=canvas.getContext("2d")

let level=0
let hp=5

let dragon={x:100,y:350,speed:6}

let goblins=[]
let fires=[]
let queen=null

function startGame(){

document.getElementById("menu").style.display="none"

loadLevel()

loop()

}

function loadLevel(){

goblins=[]
fires=[]

document.getElementById("lvl").innerText=level+1

let count=levels[level].goblins

for(let i=0;i<count;i++){

goblins.push({

x:500+Math.random()*300,
y:350,
alive:true,
cooldown:0

})

}

if(levels[level].boss){

queen={x:850,y:350}

}

}

function left(){dragon.x-=dragon.speed}
function right(){dragon.x+=dragon.speed}

function shoot(){

fires.push({

x:dragon.x+40,
y:dragon.y+10,
speed:8

})

}

function update(){

fires.forEach(f=>f.x+=f.speed)

goblins.forEach(g=>{

if(!g.alive)return

if(g.x>dragon.x) g.x-=1.5
else g.x+=1.5

if(

dragon.x<g.x+30 &&
dragon.x+40>g.x &&
dragon.y<g.y+30 &&
dragon.y+30>g.y

){

if(g.cooldown<=0){

hp--

document.getElementById("hp").innerText=hp

g.cooldown=60

if(hp<=0){

alert("GAME OVER")

location.reload()

}

}

}

g.cooldown--

})

fires.forEach(f=>{

goblins.forEach(g=>{

if(!g.alive)return

if(

f.x<g.x+30 &&
f.x+20>g.x &&
f.y<g.y+30 &&
f.y+10>g.y

){

g.alive=false

}

})

})

}

function draw(){

ctx.clearRect(0,0,900,450)

drawDragon(ctx,dragon.x,dragon.y)

goblins.forEach(g=>{

if(g.alive) drawGoblin(ctx,g.x,g.y)

})

fires.forEach(f=>{

ctx.fillStyle="orange"

ctx.fillRect(f.x,f.y,20,10)

})

if(queen){

drawQueen(ctx,queen.x,queen.y)

}

}

function checkLevel(){

let alive=goblins.filter(g=>g.alive)

if(alive.length===0){

if(level===19){

alert("Ratu berhasil diselamatkan!")

location.reload()

}else{

level++
loadLevel()

}

}

}

function loop(){

update()
draw()
checkLevel()

requestAnimationFrame(loop)

}
