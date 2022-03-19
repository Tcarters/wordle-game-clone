import React, { useContext } from 'react'
import { AppContext } from '../App';
// import GameOver from './GameOver';

const Key = ( { keyval, bigKey, disabled  }) => {
    const {// board,
            // setBoard, 
            // currAttempt, 
            gameOver, 
            onSelectLetter, 
            onDelete, 
            onEnter 
          } = useContext(AppContext);
const selectLetter = () => {
        // if (gameOver.gameOver) return;
        if ( keyval === "ENTER") {
          onEnter();
        } else if ( keyval === "DELETE") {
          onDelete(); 
          // if (currAttempt.letterPos === 0) return ;
          // const newBoard = [...board];
          // newBoard[currAttempt.attempt][currAttempt.letterPos -1] = "";
          // setBoard(newBoard);
          // setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos -1 });
        }else {
          onSelectLetter(keyval);
        //     if (currAttempt.letterPos > 4) return;
        // const newBoard = [...board];
        // newBoard[currAttempt.attempt][currAttempt.letterPos] = keyval;
        // setBoard(newBoard);
        // setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1});
        }
        
   };
  return (
    <div className='key' 
         id={bigKey ?  "big" : disabled && "disabled"} 
         onClick={selectLetter}
    >
         
         {keyval} 
    </div>
  )
}

export default Key;