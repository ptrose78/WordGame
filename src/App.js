import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { decreaseTime, resetGame } from './fetures/gameSlice/gameSlice';
import FallingLetters from './components/FallingLetters/FallingLetters';
import WordInput from './components/WordInput/WordInput';

const App = () => {
  const dispatch = useDispatch();
  const timeLeft = useSelector((state) => state.game.timeLeft);
  const isGameOver = useSelector((state) => state.game.isGameOver);

  useEffect(() => {
    const timer = setInterval(() => {
      dispatch(decreaseTime());
    }, 1000);

    return () => clearInterval(timer); // Clean up timer when the component is unmounted
  }, [dispatch]);

  const handleResetGame = () => {
    dispatch(resetGame());
  };

  return (
    <div className="App">
      <h1>Letterfall</h1>
      <h2>Time left: {timeLeft}s</h2>
      <h2>Score: {useSelector((state) => state.game.score)}</h2>

      {isGameOver ? (
        <div>
          <h3>Game Over!</h3>
          <button onClick={handleResetGame}>Restart</button>
        </div>
      ) : (
        <>
          <FallingLetters />
          <WordInput />
        </>
      )}
    </div>
  );
};

export default App;

