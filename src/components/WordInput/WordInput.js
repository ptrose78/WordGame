// src/components/WordInput.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWord } from '../redux/gameSlice';

const WordInput = () => {
  const dispatch = useDispatch();
  const letters = useSelector((state) => state.game.letters);
  const [currentWord, setCurrentWord] = useState('');

  const handleClickLetter = (letter) => {
    setCurrentWord((prevWord) => prevWord + letter.character); // Append clicked letter to word
  };

  const handleSubmitWord = () => {
    if (isValidWord(currentWord)) {
      dispatch(addWord(currentWord)); // Add valid word to the score
      setCurrentWord(''); // Reset current word input
    } else {
      alert('Invalid word!');
    }
  };

  // A simple function to check if the word is valid
  const isValidWord = (word) => {
    const dictionary = ['apple', 'banana', 'grape', 'pear']; // Example dictionary, expand as needed
    return dictionary.includes(word);
  };

  return (
    <div className="word-input">
      <div className="letters">
        {letters.map((letter) => (
          <button key={letter.id} onClick={() => handleClickLetter(letter)}>
            {letter.character}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={currentWord}
        onChange={(e) => setCurrentWord(e.target.value)}
        placeholder="Form a word"
      />
      <button onClick={handleSubmitWord}>Submit Word</button>
    </div>
  );
};

export default WordInput;
