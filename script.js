const gameBoard = (function () {
    const rows = 3
    const columns = 3
    const board = []
    let inc = 1
    
    for(let i = 0; i < rows; i++){
            board[i] = []
        for(let j = 0; j < columns; j++){
            board[i][j] = inc
            inc++
        }
        
    }
    
  

    const getBoard = () => board
    
 
    const setValue = (cords,currentPlayer) => {
        
        const row = Math.floor((cords - 1) / columns)
        const col = (cords - 1) % columns
        if(typeof board[row][col] === 'string'){
            console.log("✖ This Spot is Taken")
            return false
        }
        else{
            board[row][col] = currentPlayer.sign
            return true
            }
    }
    
    return { getBoard, setValue, }
    
})()

    




 
const game = (function gameController(){
    
    
    function switchPlayers(){
        
        currentPlayer = currentPlayer === player1 ? player2 : player1
        
    }

    function createPlayer(name,sign){ 
        return {
            name: name,
            sign: sign
        }
    }
    
    const player1 = createPlayer(`kapi`,'x')
    const player2 = createPlayer('niger','o')
    currentPlayer = player1
    sign = currentPlayer.sign

    function renderBoard(){
        return gameBoard.getBoard()
    }
    

    function move(cords){ 
        const success = gameBoard.setValue(cords,currentPlayer)
        if(!success){
            return{error: 'Spot Taken', board: renderBoard(),turn: currentPlayer.sign, player: currentPlayer.name }
        }else  if(checkWin()){
            return { board: renderBoard(), result: currentPlayer.name };
        }else if(!checkWin() && checkTie()){
            
            return {
                board:renderBoard() , result :'It"s a tie'
            }
        }
        
        
        else{
        switchPlayers()
        // if checkwin goes console log win if not the nswtich players
        
        return{ board:renderBoard(),turn: currentPlayer.sign, player: currentPlayer.name
            
        }
        
        }
    }
    
    function checkWin() {
        board = renderBoard()
        const sign = currentPlayer.sign
        
        for(let i = 0 ; i < 3; i++){
            if(board[i][0] === sign && board[i][1] === sign && board[i][2] === sign){
                console.log(`${currentPlayer.name}` + " Wins!")
                return true
            }else if(board[0][i] === sign && board[1][i] === sign && board[2][i] === sign){
                console.log(`${currentPlayer.name}` + " Wins!")
                return true
            }

            else if (board[0][0] === sign && board[1][1] === sign && board[2][2] === sign) { // diagonals (retarded)
            return true;
            }

            else if (board[0][2] === sign && board[1][1] === sign && board[2][0] === sign) {
             console.log(`${currentPlayer.name} Wins!`);
                return true;
            } 
            }
       
        return false 
        
    }
    function checkTie(){
        let isFull = true
        board = renderBoard()
        for(let i =0; i < 3; i++){
            for(let j = 0 ; j < 3; j++){
        if(board[i][j] !== 'x' && board[i][j] !== 'o'){
            isFull = false
            break
                }
            }
        }
        if(isFull){
            
            return true
        }else return false
             
    }           
    
           
       
                
    return {
        renderBoard , move , checkWin , switchPlayers, createPlayer,checkTie
    }
    
})()

// HTML STYLING
// HTML STYLING
// HTML STYLING
// HTML STYLING
// HTML STYLING
// HTML STYLING
// HTML STYLING
// HTML STYLING
// HTML STYLING
// HTML STYLING
// HTML STYLING
// HTML STYLING


const webGame = (function gameRenderer(){
    changeColor()
   
    const boxes = document.querySelectorAll(".box")
    function placeSign(){
    
    let gameOver = false
    
    
    boxes.forEach((box,index) => box.addEventListener("click", (e) => {
    index +=1
    if(gameOver){
        return
    }
    const circle = document.createElement("div")
    circle.classList.add("circle")
    const cross = document.createElement("div")
    cross.classList.add("cross")
    if(box.hasChildNodes()){
       return  
    }
    if(currentPlayer.sign === 'o'){
        box.appendChild(circle)
    }   else 
    box.appendChild(cross)
    
    const result = game.move(index)
    if(game.checkWin() || game.checkTie()){
        gameOver = true
    }
    console.log(result) 
    
    
    
    
    
    }))
    
}
    
    function placeText(){
        const turnText = document.createElement("div")
        turnText.textContent = `${currentPlayer.name}'s turn`
        turnText.classList.add("turn-text")
        const winnerText = document.createElement("div")
        const textContainer = document.querySelector(".text-container")
        


        textContainer.appendChild(turnText)
        
        boxes.forEach((box) => box.addEventListener("click", () => {
        turnText.textContent = `${currentPlayer.name}'s turn`
        if(game.checkWin()){
            textContainer.appendChild(winnerText)
            winnerText.textContent = `${currentPlayer.name} is a winner!`
            turnText.textContent = ''
        }
        }))
        
    }
    function changeColor(){
        if(currentPlayer.sign === 'o'){
            console.log('working')
           console.log('black')
        }
    }
    function init(){
        placeSign()
        placeText()
        changeColor()
    }

    return{
        placeSign, placeText, changeColor, init
    }

})()

document.addEventListener('DOMContentLoaded', () => {
  webGame.init()
  
});