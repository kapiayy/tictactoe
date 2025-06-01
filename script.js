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
            board[row][col] = currentPlayer.getPlayer().playerSign
           return true
            }
    }
    
    return { getBoard, setValue, }
    
})()

    


function createPlayer(name,sign){ // funkcja tworzaca gracza 

    const playerName = "@" + name // przypisuje nazwe w zaleznosci jaka sie wybierze
    const playerSign = sign // przepisuje znak ktorego uzywa osoba
    
    
    function getPlayer(){ // funkcja ktora zwraca parametry obiektu
        return { playerName , playerSign}
    }
    return { getPlayer } // nadaje stworzonym property getPlayer , dzieki ktoremu mozna uzyc getPlayer np kapi.getPlayer(),
                            // !!!!!!!! nie da sie wyciagnac playerName, bo to wartosc prywatna , dlatego to robimy !!!!!!!
}


 
const game = (function gameController(){
    const player1 = createPlayer(`kapi`,'x')
    const player2 = createPlayer('niger','o')
    currentPlayer = player1
    sign = currentPlayer.getPlayer().playerSign
    
    function switchPlayers(){
        
        currentPlayer = currentPlayer === player1 ? player2 : player1
        
    }

   

    function renderBoard(){
        return gameBoard.getBoard()
    }
    

    function move(cords){ 
        const success = gameBoard.setValue(cords,currentPlayer)
        if(!success){
            return{error: 'Spot Taken', board: renderBoard(),turn: currentPlayer.getPlayer().playerSign, player: currentPlayer.getPlayer().playerName }
        }else  if(checkWin()){
            return { board: renderBoard(), winner: currentPlayer.getPlayer().playerName };
        }else{
        switchPlayers()
        // if checkwin goes console log win if not the nswtich players
        
        return{ board:gameBoard.getBoard(),turn: currentPlayer.getPlayer().playerSign, player: currentPlayer.getPlayer().playerName
            
        }
        
        }
    }
    
    function checkWin() {
        board = gameBoard.getBoard()
        const sign = currentPlayer.getPlayer().playerSign
        
        for(let i = 0 ; i < 3; i++){
            if(board[i][0] === sign && board[i][1] === sign && board[i][2] === sign){
                console.log(`${currentPlayer.getPlayer().playerName}` + " Wins!")
                return true
            }else if(board[0][i] === sign && board[1][i] === sign && board[2][i] === sign){
                console.log(`${currentPlayer.getPlayer().playerName}` + " Wins!")
                return true
            }

            else if (board[0][0] === sign && board[1][1] === sign && board[2][2] === sign) { // diagonals (retarded)
            return true;
            }

            else if (board[0][2] === sign && board[1][1] === sign && board[2][0] === sign) {
             console.log(`${currentPlayer.getPlayer().playerName} Wins!`);
                return true;
             }   
            }
       
        return false
        
        
    }
                
    return {
        renderBoard , move , checkWin , switchPlayers
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


const boxes = document.querySelectorAll(".box");
const container = document.querySelector(".container")

boxes.forEach((box,index) => box.addEventListener("click", () => {
    if(game.checkWin()){
        return true
    }
    if(box.hasChildNodes()){
       return  console.log('nlaicenwck')
    }else
    
    index +=1
    const circle = document.createElement("div")
    circle.classList.add("circle")
    const cross = document.createElement("div")
    cross.classList.add("cross")
    cross.textContent = 'cross'
    circle.textContent = 'circle'
    if(currentPlayer.getPlayer().playerSign === 'o'){
        box.appendChild(circle)
    }
    else box.appendChild(cross)
    const result = game.move(index)
    console.log(currentPlayer.getPlayer().playerSign)
    
    console.log(result)
    
    
    
        
    
    
    
    
   
}))

