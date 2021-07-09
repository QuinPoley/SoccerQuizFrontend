import React  from 'react';
import { useState } from 'react';
import './App.css';
import Quiz from './Quiz.js';
import SelectQuizDropDown from './SelectQuizDropDown';

function App() {
  const selectedquiz = 1


  return (
    <div className="App">
      <nav className="NavBar">
        <p className="HeaderText">
            Soccer Trivia!
        </p>
      </nav>
      <nav className="smallerNav">
        <SelectQuizDropDown/>
        <p className="smallertext">
          Select a Quiz
        </p>
      </nav>
      <Quiz selectedquiz={selectedquiz} />
    </div>
  );
}

export default App;
