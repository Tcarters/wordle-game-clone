import React, { useContext } from 'react'
import { AppContext } from '../App';

const GameOver = () => {
    const { gameOver, 
        //setGameOver, 
        currAttempt, 
        correctWord } = useContext(AppContext);
  return (
    <div className='gameOver'>
        GameOver
        <h3>
            {gameOver.guessedWord 
            ? "You Correctly guessed the Wordle" 
            : "You failed to guess the word like a Bastard!"}
        
        </h3>

        <h1> Correct Word: {correctWord} </h1>
            {gameOver.guessedWord && (
            <h3> You guessed in {currAttempt.attempt} attempts </h3>)}
    </div>
  );
}

export default GameOver;