import React, { useCallback, useContext, useEffect } from 'react'
import { AppContext } from '../App';
// import GameOver from './GameOver';
import Key from './Key';

const Keyboard = () => {
  const { onEnter, 
          onDelete, 
          onSelectLetter, 
          disabledLetters, 
          gameOver,
          currAttempt } = useContext(AppContext);

  const keys1  = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2  = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3  = ["Z", "X", "C", "V", "B", "N", "M" ];

  const handleKeyboard = useCallback( (event) => {
    if (gameOver.gameOver) return ;
    if ( event.key === "Enter") {
      onEnter();

    } else if ( event.key === "Backspace") {
      onDelete();
    } else {
      keys1.forEach( (key)=> {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      keys2.forEach( (key) => {
        if (event.key.toLowerCase() === key.toLowerCase() ) {
          onSelectLetter(key);
        }
      });
      keys3.forEach( (key) => {
        if (event.key.toLowerCase() === key.toLowerCase()){ 
          onSelectLetter(key);
        }
      });

    }
  }, [currAttempt] //gameOver, onEnter, onDelete, keys3, onSelectLetter, keys1, keys2]
  );  

useEffect( () => {
  document.addEventListener("keydown", handleKeyboard);
 
  return () => {
    document.removeEventListener("keydown", handleKeyboard);
  };

}, [handleKeyboard]); //useffect here will call some fuctions to handle events.

  return (
    <div className='keyboard' onKeyDown={handleKeyboard}>
        Keyboard
        <div className='line1'> 
            {keys1.map( (key1) => {
            return <Key keyval= {key1} disabled={disabledLetters.includes(key1) }/>;
            } )}
        </div>

        <div className='line2'> {keys2.map( (key2) => {
            return <Key keyval={key2}  disabled={disabledLetters.includes(key2)}/>;
             })} 
        </div>
        
        <div className='line3'>
            <Key keyval={"ENTER"}  bigKey/> 
            { keys3.map( (key3) => {
            return  <Key keyval={key3}  disabled={disabledLetters.includes(key3) }/>;
          })} 
          <Key keyval={"DELETE"} bigKey />
        </div>

    </div>
  )
}

export default Keyboard