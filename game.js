const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

let level = 0
let playerHP = 5

let dragon = {

x:100,
y:350,
w:40,
h:40,
speed:6

}

let goblins=[]
let fires=[]
let queen=null

function startGame(){

document.getElementById("menu").style.display="none"

loadLevel()

gameLoop()

}

function loadLevel(){

goblins=[]
fires=[]

document.getElementById("level").innerText=level+1

let count = levels[level].goblins

for(let i=0;i<count;i++){

goblins.push({

x:500+Math.random()*300,
y:350,
w:30,
h:30,
speed:1+Math.random()*1.5,
alive:true

})

}

if(levels[level].boss){

queen={

x:850,
y:350,
w:30,
h:30

}

}

}

function moveLeft(){

dragon.x -= dragon.speed

}

function moveRight(){

dragon.x += dragon.speed

}

document.addEventListener("keydown",e=>{

if(e.key==="ArrowLeft") moveLeft()

if(e.key==="ArrowRight") moveRight()

if(e.key==="f") shootFire()

})

function shootFire(){

fires.push({

x:dragon.x+40,
y:dragon.y+15,
speed:8

})

}

function drawDragon(){

ctx.fillStyle="red"

ctx.fillRect(

dragon.x,
dragon.y,
dragon.w,
dragon.h

)

}

function drawGoblins(){

ctx.fillStyle="green"

goblins.forEach(g=>{

if(!g.alive) return

ctx.fillRect(g.x,g.y,g.w,g.h)

if(g.x > dragon.x){

g.x -= g.speed

}else{

g.x += g.speed

}

if(

dragon.x < g.x+g.w &&
dragon.x+dragon.w > g.x &&
dragon.y < g.y+g.h &&
dragon.y+dragon.h > g.y

){

playerHP--

document.getElementById("hp").innerText=playerHP

g.alive=false

if(playerHP<=0){

alert("Game Over")

location.reload()

}

}

})

}

function drawFire(){

ctx.fillStyle="orange"

fires.forEach(f=>{

ctx.fillRect(f.x,f.y,20,10)

})

}

function updateFire(){

fires.forEach(f=>{

f.x += f.speed

goblins.forEach(g=>{

if(!g.alive) return

if(

f.x < g.x+g.w &&
f.x+20 > g.x &&
f.y < g.y+g.h &&
f.y+10 > g.y

){

g.alive=false

}

})

})

}

function drawQueen(){

if(!queen) return

ctx.fillStyle="pink"

ctx.fillRect(

queen.x,
queen.y,
queen.w,
queen.h

)

}

function checkLevel(){

let alive = goblins.filter(g=>g.alive)

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

function gameLoop(){

ctx.clearRect(0,0,canvas.width,canvas.height)

drawDragon()

drawGoblins()

drawFire()

drawQueen()

updateFire()

checkLevel()

requestAnimationFrame(gameLoop)

}
