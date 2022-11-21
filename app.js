"use strict"

const startBtn = document.querySelector(".btnSubmit")


startBtn.addEventListener("click", (e) => {
    e.preventDefault()
    document.querySelector(".formContainer").style.display = "none"
    const form = document.querySelector(".myForm")
    const formInfo = new FormData(form)
    const info = Object.fromEntries(formInfo)
    beginGame(info)

    const restartBtn = document.querySelector(".restart")
    restartBtn.addEventListener("click", () => {
        location.reload()
    })
})

const startVariables = (info) => {
    info.player1 = "X"
    info.player2 = "O"
    info.currentPlayer = "X"
    info.round = 0
    info.gameOver = false
    info.gameBoard = [0,1,2,3,4,5,6,7,8]

}

const beginGame = (info) => {
    startVariables(info)
    const status = document.querySelector(".status")
    let showTurn = 
    info.currentPlayer === "X" ? info.playerUser1 : info.playerUser2
    status.textContent = `${showTurn}'s turn`     
   
    document.querySelectorAll(".piece").forEach(piece => 
        piece.addEventListener("click", (e) => {
            renderClick(e.target,info)
        }))
}

const renderClick = (piece,info) => {

    if (info.gameOver) {
        return ;
    }
    if (info.gameBoard[piece.id] === "X" || info.gameBoard[piece.id] === "O") {
        return;
    }

    info.gameBoard[piece.id] = info.currentPlayer
    piece.textContent = info.currentPlayer
    piece.classList.add(info.currentPlayer === "X" ? "player1" : "player2");
    info.round++

    switchTurn(info)
    winConditions(info)

}

const switchTurn = (info) => {
    info.currentPlayer = info.currentPlayer === "X" ? "O" : "X"
    const status = document.querySelector(".status")
    let showTurn = 
    info.currentPlayer === "X" ? info.playerUser1 : info.playerUser2
    status.textContent = `${showTurn}'s turn` 
    
 }

const winConditions = (info) => {
    const status = document.querySelector(".status")
    const possibleWins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [2,4,6],
        [0,4,8],
    ];

    possibleWins.forEach(condition => {
        let winner = ""
        if(info.gameBoard[condition[0]] === info.gameBoard[condition[1]] 
            && info.gameBoard[condition[1]] === info.gameBoard[condition[2]]){
                status.textContent = "Victory!! "
                let result = document.createElement("div")
                //Winner is not the current player because the turns are switched again after victory
                if (info.currentPlayer === "X"){
                     winner = info.playerUser2
                     result.textContent = winner  + " has won the game!"
                     status.appendChild(result)
                     info.gameOver = true
                } else if (info.currentPlayer === "O") {
                     winner = info.playerUser1
                     result.textContent = winner + " has won the game!"
                     status.appendChild(result)
                     info.gameOver = true
                }  
            } 
    })

    tieCheck(info)

}

const tieCheck = (info) => {
    const status = document.querySelector(".status")
    if (info.round ===9 && info.gameOver === false) {
        status.textContent = "It's a Tie!"
        info.gameOver = true
    }
}
