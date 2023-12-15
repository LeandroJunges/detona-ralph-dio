const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score')
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        countDownTimerId: setInterval(countDown, 1000),
        
    }
}

function countDown(){
    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime
    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.values.timerId)

        alert(`Game Over! O seu resultado foi ${state.values.result} pontos`)
        playSound('game-over')
    }
}
function playSoundBackground(){
    let audio = new Audio('./src/audios/fundoEng.m4a')
    audio.volume = 0.2
    audio.play()
    let startTime = Date.now()
    audio.addEventListener('timeupdate', ()=>{
        let elapsedTime = (Date.now() - startTime) / 1000
        if(elapsedTime >= 2){
            audio.stop()
        }
    })
}
console.log(state.values.currentTime)

function playSound (sound){
    let audio = new Audio(`./src/audios/${sound}.m4a`)
    audio.volume = 0.1
    audio.play()
    
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove('enemy')
    })
    let randomNumber = Math.floor(Math.random() * 9)
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add('enemy')
    state.values.hitPosition = randomSquare.id
}
function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
    playSoundBackground()
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", ()=>{
            if(square.id === state.values.hitPosition){
                state.values.result ++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
                playSound("hit")

            }
        })
    })
}


function main (){
    moveEnemy()
    addListenerHitBox()
}

main()