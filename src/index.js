const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")
const startButton = document.getElementById('start-screen-button')
const startScreen = document.getElementById('start-screen')

canvas.width = innerWidth - 600
canvas.height = innerHeight - 100

const player = new Image()
const background = new Image()
const fg = new Image()
const pipeUp = new Image()
const pipeBottom = new Image()

player.src = 'assets/images/flappy_bird_bird.png'
background.src = 'assets/images/background.webp'
fg.src = 'assets/images/fg.webp'
pipeUp.src = 'assets/images/flappy_bird_pipeUp.png'
pipeBottom.src = 'assets/images/flappy_bird_pipeBottom.png'


// расстояние между верхней и нижней колонной
const gap = 120
// стартовая позиция юзера по x
const positionX = 10
// позиция юзера по y
let positionY = 150
// гравитация
const grav = 0.7
// очки игрока todo Доделать
let score = 0
// массив препятствий
const pipe = []
pipe[0] = {
    x: canvas.width,
    y: 0
}


const moveUp = () => {
    positionY -= 33
}
startButton.addEventListener('click', () => {
    canvas.style.display = 'block'
    startScreen.style.display = 'none'
    document.addEventListener('keydown', moveUp)
    draw()
    pipeBottom.onload = draw
})

const draw = () => {
    context.drawImage(background, 0, 0)
    for(let i = 0; i < pipe.length; i++) {
        score = i + 1
        context.drawImage(pipeUp, pipe[i].x, pipe[i].y)
        context.drawImage(pipeBottom, pipe[i].x, pipeUp.height + gap)
        pipe[i].x = pipe[i].x - 2

        if (pipe[i].x === 90) {
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            })
        }

        if (positionX + player.width >= pipe[i].x
            && positionX <= pipe[i].x + pipeUp.width
            && (positionY <= pipe[i].y + pipeUp.height
            || positionY + player.height >= pipeUp.height + gap)
            || positionY >= canvas.height - 200
        ) {
            location.reload()
        }
    }
    context.drawImage(player, positionX, positionY)
    context.drawImage(fg, 0, canvas.height - 200, 1400, 200)

    positionY += grav

    context.fillStyle = "white";
    context.font = "bold 40px white";
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(`score: ${score}`, canvas.width / 2, 70);

    requestAnimationFrame(draw)
}