const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

let level = 0
let mode = "easy"

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

mode=document.getElementById("mode").value

document.getElementById("menu").style.display="none"

bgm.play()

loadLevel()

gameLoop()

}

function loadLevel(){

goblins=[]
fires=[]

document.getElementById("levelText").innerText="Level "+(level+1)

let goblinCount = levels[level].goblins

for(let i=0;i<goblinCount;i++){

goblins.push({

x:400+Math.random()*400,
y:350,
w:30,
h:30,
alive:true,
speed:1+Math.random()*2

})

}

if(levels[level].boss){

queen={
x:820,
y:340,
w:40,
h:40
}

}

}

document.addEventListener("keydown",e=>{

if(e.key==="ArrowRight") dragon.x+=dragon.speed
if(e.key==="ArrowLeft") dragon.x-=dragon.speed

if(e.key==="f") shootFire()

})

function shootFire(){

fires.push({

x:dragon.x+40,
y:dragon.y+10,
speed:8

})

fireSound.currentTime=0
fireSound.play()

}

function drawDragon(){

ctx.fillStyle="red"
ctx.fillRect(dragon.x,dragon.y,dragon.w,dragon.h)

}

function drawGoblins(){

ctx.fillStyle="green"

goblins.forEach(g=>{

if(!g.alive) return

ctx.fillRect(g.x,g.y,g.w,g.h)

g.x -= g.speed

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

f.x+=f.speed

goblins.forEach(g=>{

if(!g.alive) return

if(
f.x < g.x+g.w &&
f.x+20 > g.x &&
f.y < g.y+g.h &&
f.y+10 > g.y
){

g.alive=false

hitSound.play()

}

})

})

}

function drawQueen(){

if(!queen) return

ctx.fillStyle="pink"
ctx.fillRect(queen.x,queen.y,queen.w,queen.h)

}

function checkLevel(){

let alive = goblins.filter(g=>g.alive)

if(alive.length===0){

if(level===19){

winGame()

}else{

level++
loadLevel()

}

}

}

function winGame(){

bgm.pause()

winSound.play()

alert("Ratu berhasil diselamatkan!")

location.reload()

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
