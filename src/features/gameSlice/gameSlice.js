// src/redux/gameSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  letters: [], // Will store the falling letters
  words: [], // List of words formed by the player
  timeLeft: 60, // Time limit for the game
  score: 0, // Player's score
  isGameOver: false, // Game over flag
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    addLetter: (state, action) => {
      state.letters.push(action.payload);
    },
    removeLetter: (state, action) => {
      state.letters = state.letters.filter(letter => letter.id !== action.payload);
    },
    updateTime: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      } else {
        state.isGameOver = true;
      }
    },
    addWord: (state, action) => {
      state.words.push(action.payload);
      state.score += action.payload.length; // Increase score by the word's length
    },
    resetGame: (state) => {
      state.letters = [];
      state.words = [];
      state.timeLeft = 60;
      state.score = 0;
      state.isGameOver = false;
    },
  },
});

export const { addLetter, removeLetter, updateTime, addWord, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
