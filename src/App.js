// import logo from './logo.svg';
import './App.css';
import Keyboard  from './components/Keyboard';
import Board  from './components/Board';
import GameOver from './components/GameOver';
import { createContext, useEffect, useState } from 'react'; //import createContext function
import { boardDefault, generateWordSet  } from './Words';

export const AppContext = createContext();

function App() {
  const [board,  setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0});
  const [ wordSet, setWordSet] =  useState( new Set());
  const [ disabledLetters, setDisabledLetters] = useState( [] );
  const [ correctWord, setCorrectWord] = useState("");
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessdWord: false,

  });

  // const correctWord = "RIGHT";

  useEffect( () => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord);

      // console.log(words)
    });
  }, []);

const onSelectLetter = ( keyval ) => {
  if (currAttempt.letterPos > 4) return;
   const newBoard = [...board];
   newBoard[currAttempt.attempt][currAttempt.letterPos] = keyval;
   setBoard(newBoard);
   setCurrAttempt({
    //...currAttempt,
    attempt: currAttempt.attempt, 
    letterPos: currAttempt.letterPos + 1});
  
};

const onDelete = () => {
  if (currAttempt.letterPos === 0) return ;
  const newBoard = [...board];
  newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
  setBoard(newBoard);
  setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1 });

};

const onEnter = () => {
//  if ( keyval === "ENTER") {
    if (currAttempt.letterPos !== 5) return;
    
    
    let currWord = "";
    for ( let i= 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase() )) {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0});
    } else {
      alert("Word Not Found");
    }

    if (currWord === correctWord ) {
      setGameOver({ gameOver: true, guessedWord: true});
      return ;
      // alert("Game Ended");
    }
    if (currAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false});
      return;
    }

};
  return (
    <div className="App">
        <nav>
            <h1>Wordle Game</h1>
        </nav>
     
        <AppContext.Provider value={{ 
            board, 
            setBoard, 
            currAttempt,
            setCurrAttempt, 
            onSelectLetter, 
            onDelete, 
            onEnter ,
            correctWord,
            setDisabledLetters,
            disabledLetters,
            gameOver,
            // setGameOver
          }}>
          <div className='game'> 
            <Board />
             {gameOver.gameOver ?  <GameOver /> : <Keyboard /> }
          </div> 
          
         </AppContext.Provider>
    </div>
  );
}

export default App;
