const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

let gameRunning=false

let level=1
let maxLevel=20

let difficulty="easy"

let dragon={
x:80,
y:180,
size:20,
hp:5
}

let goblins=[]
let fires=[]

let goblinSpeed=1



document.addEventListener("keydown",e=>{

if(!gameRunning)return

if(e.key==="ArrowUp")dragon.y-=15
if(e.key==="ArrowDown")dragon.y+=15
if(e.key===" ")shootFire()

})



function startGame(mode){

difficulty=mode

if(mode==="easy")goblinSpeed=0.8
if(mode==="normal")goblinSpeed=1.2
if(mode==="hard")goblinSpeed=1.8

document.getElementById("menu").classList.add("hidden")

canvas.style.display="block"

document.getElementById("gameUI").classList.remove("hidden")

spawnLevel()

gameRunning=true

loop()

}



function openSettings(){

document.getElementById("menu").classList.add("hidden")
document.getElementById("settings").classList.remove("hidden")

}



function closeSettings(){

document.getElementById("settings").classList.add("hidden")
document.getElementById("menu").classList.remove("hidden")

}



function spawnLevel(){

goblins=[]

let count=2+Math.floor(level*0.8)

for(let i=0;i<count;i++){

goblins.push({

x:500+Math.random()*200,
y:Math.random()*320,
size:20

})

}

document.getElementById("levelLabel").innerText="LEVEL "+level

}



function shootFire(){

fires.push({

x:dragon.x,
y:dragon.y,
size:6

})

}



function update(){

fires.forEach(f=>{

f.x+=6

})

goblins.forEach(g=>{

g.x-=goblinSpeed+level*0.1

})


fires.forEach((f,fi)=>{

goblins.forEach((g,gi)=>{

if(Math.abs(f.x-g.x)<15 && Math.abs(f.y-g.y)<15){

goblins.splice(gi,1)
fires.splice(fi,1)

}

})

})


goblins.forEach(g=>{

if(Math.abs(g.x-dragon.x)<15 && Math.abs(g.y-dragon.y)<15){

dragon.hp--
g.x=700

}

})


if(dragon.hp<=0){

alert("GAME OVER")
location.reload()

}


if(goblins.length===0){

level++

if(level>maxLevel){

winGame()
return

}

spawnLevel()

}

document.getElementById("hpLabel").innerText="HP "+dragon.hp

}



function drawPixel(x,y,size,color){

ctx.fillStyle=color
ctx.fillRect(Math.floor(x),Math.floor(y),size,size)

}



function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)


drawPixel(dragon.x,dragon.y,dragon.size,"lime")


goblins.forEach(g=>{

drawPixel(g.x,g.y,g.size,"red")

})


fires.forEach(f=>{

drawPixel(f.x,f.y,f.size,"orange")

})

}



function loop(){

if(!gameRunning)return

update()

draw()

requestAnimationFrame(loop)

}



function winGame(){

gameRunning=false

canvas.style.display="none"

document.getElementById("gameUI").classList.add("hidden")

document.getElementById("winScreen").classList.remove("hidden")

}
