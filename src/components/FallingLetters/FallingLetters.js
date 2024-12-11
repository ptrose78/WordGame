// src/components/FallingLetters.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addLetter, removeLetter } from '../redux/gameSlice';

const FallingLetters = () => {
  const dispatch = useDispatch();
  const letters = useSelector((state) => state.game.letters);
  const isGameOver = useSelector((state) => state.game.isGameOver);

  useEffect(() => {
    if (isGameOver) return; 

    const interval = setInterval(() => {
      // Add new letter to the screen
      const letter = {
        id: Date.now(),
        character: String.fromCharCode(65 + Math.floor(Math.random() * 26)), // Random letter A-Z
        positionX: Math.random() * 90, // Random X position
        positionY: 0, // Start from the top
      };
      dispatch(addLetter(letter));
    }, 1000); // Add a new letter every second

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [dispatch, isGameOver]);

  useEffect(() => {
    const fallInterval = setInterval(() => {
      // Move falling letters down the screen
      dispatch(
        addLetter({
          ...letter,
          positionY: letter.positionY + 5, 
        })
      );

      // Remove letters when they hit the ground
      letters.forEach((letter) => {
        if (letter.positionY >= 90) {
          dispatch(removeLetter(letter.id)); // Remove when it reaches the ground
        }
      });
    }, 50); // Update letter position every 50ms

    return () => clearInterval(fallInterval);
  }, [dispatch, letters]);

  return (
    <div className="falling-letters">
      {letters.map((letter) => (
        <div
          key={letter.id}
          className="letter"
          style={{
            left: `${letter.positionX}%`,
            top: `${letter.positionY}%`,
            position: 'absolute',
            fontSize: '30px',
          }}
        >
          {letter.character}
        </div>
      ))}
    </div>
  );
};

export default FallingLetters;
