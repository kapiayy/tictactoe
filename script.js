const gameBoard = (function () {
    const rows = 3
    const columns = 3
    const board = []
    let inc = 1
    let currentPlayer = 'x'
    for(let i = 0; i < rows; i++){
            board[i] = []
        for(let j = 0; j < columns; j++){
            board[i][j] = inc
            inc++
        }
        
    }
    
    const getBoard = () => board
    
    const nextTurn = () => {
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x'
    }
    const getTurn = () => currentPlayer 
    

    const setValue = (cords) => {
        
        const row = Math.floor((cords - 1) / columns)
        const col = (cords - 1) % columns
        if(typeof board[row][col] === 'string'){
            console.log("✖ This Spot is Taken")
        }else{
            board[row][col] = currentPlayer
            nextTurn()
            return getBoard()
        }
    }

    
    
    
    
    
    return { getBoard, setValue, nextTurn, getTurn }
    
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
    
    

    function renderBoard(){
        return gameBoard.getBoard()
    }
    

    function move(cords){ 
        gameBoard.setValue(cords)
        
        return{ board:gameBoard.getBoard(), nextTurn: gameBoard.getTurn()
            
                
        }
    }
    

    
    
        
    return {
        renderBoard , move
    }
    
})()




