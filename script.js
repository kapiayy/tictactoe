const gameBoard = (function gameboard() {
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
     function resetGame(){
        
        board = renderBoard()
        let inc = 1
        for(let i = 0; i < 3; i++){
            board[i] = []
            for(let j = 0; j < 3; j++){
                board[i][j] = inc
                inc++
        }}
     }
    
           
       
                
    return {
        renderBoard , move , checkWin , switchPlayers, createPlayer,checkTie,resetGame
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
    const turnText = document.createElement("div")
    const textContainer = document.querySelector(".text-container")
    const winnerText = document.createElement("div")
    winnerText.classList.add("winner-text")
    const boxes = document.querySelectorAll(".box")
    const resetbutton = document.createElement("button")
    resetbutton.classList.add("reset-button")
    resetbutton.textContent = ' reset '
    
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
        box.style.setProperty("--selection-background","#FF0000")
    }   else 
    box.appendChild(cross)
    
    const result = game.move(index)
    if(game.checkWin() || game.checkTie()){
        gameOver = true
        resetGameDOM()
        
    }
    console.log(result) 
    
   
    
    
    
    }))
    
}
    
    function placeText(){
        
        turnText.textContent = `${currentPlayer.name}'s turn`
        turnText.classList.add("turn-text")
         
        
      
        


        textContainer.appendChild(turnText)
        
        boxes.forEach((box) => box.addEventListener("click", () => {
        turnText.textContent = `${currentPlayer.name}'s turn`
        if(game.checkWin()){
            textContainer.appendChild(winnerText)
            winnerText.textContent = `${currentPlayer.name} is a winner!`
            turnText.textContent = ''
        }
        else if(game.checkTie()){
            textContainer.appendChild(winnerText)
            winnerText.textContent = `It's a tie!`
            
        }
        }))
        
    }
    function changeColor(){
        boxes.forEach((box) => {
            
            box.addEventListener("mouseover", () =>{
                if(currentPlayer.sign === 'o'){
                box.style.backgroundColor = "#cc0000"

                }else box.style.backgroundColor = "blue"
            })
            box.addEventListener("mouseout", () =>{
                box.style.backgroundColor = "white"
            })
        }) 
    }
    function resetGameDOM(){
          
            
            textContainer.appendChild(resetbutton)
            
            resetbutton.onclick = function(){
                turnText.textContent = `${currentPlayer.name}'s turn` 
                winnerText.textContent = ''
                textContainer.removeChild(resetbutton)
                boxes.forEach((box) => {
                    box.innerHTML = ''
                    
                })
                
                game.resetGame()
                webGame.init()
                gameOver = false
                
               
                
            }
            
    }

    function init(){
        placeSign()
        placeText()
        changeColor()
       
    }

    return{
        placeSign, placeText, changeColor, init, resetGameDOM
    }

})()

document.addEventListener('DOMContentLoaded', () => {
  webGame.init()
  
});