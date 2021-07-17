import React  from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Quiz from './Quiz.js';
import SelectQuizDropDown from './SelectQuizDropDown';
import {  ReactComponent as Caret } from './Icons/caret.svg'

function fetchQuizzes(){
  return (["Quiz 1", "Quiz 2", "Quiz 3"]);
}

function MakeQuizButton(){
  return(
    <div className="makequiz">Make Quiz</div>
  );
}

function DropDownList({quizzes, setactive}){
  var map1 = quizzes.map(x => <li key={x} onClick={x => setactive(x)}>{x}</li>);
  return(
    <div className="quizselection">
      <ul>
        {map1}
      </ul>
    </div>
  );
}

//<div className="quizselection">Quizzes</div>
function App() {
  var quizlist = fetchQuizzes();
  const [getQuiz, doOpposite] = useState(true);
  const [active, setactive] = useState(quizlist[0]);

  return (
    <div className="App">
      <div className="container">
        <nav className="NavBar">
          <div className="HeaderText">
              Soccer Trivia!
          </div>
        </nav>
        <nav className="smallerNav">
          <SelectQuizDropDown icon={<Caret />}>
            <DropDownList quizzes={quizlist} setactive={setactive}></DropDownList>
          </SelectQuizDropDown>
          <MakeQuizButton></MakeQuizButton>
        </nav>
        <div className="quizcontainer">
          <Quiz selectedquiz={active} />
        </div>
      </div>
    </div>
  );
}

export default App;
