import React  from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import SelectQuizDropDown from './SelectQuizDropDown';
import {  ReactComponent as Caret } from './Icons/caret.svg';


function makeApiCall(selectedquiz){
  return (<div>
      You have selected {selectedquiz}
      </div>
      )
}

function Quiz({selectedquiz}) {
  const response = makeApiCall(selectedquiz)
  return (
    <div className="questions">
        {response}
    </div>
  );
}


function fetchQuizzes(){
  return (["Quiz 1", "Quiz 2", "Quiz 3", "Quiz 4", "Quiz 5"]);
}

function MakeQuizButton(){
  return(
    <div className="makequiz">Make Quiz</div>
  );
}
//dummycall.bind(this, index)
function dummycall(currentelement){
  console.log("Hello from "+currentelement);
}

function DropDownList({quizzes, setactive, active}){
  var map1 = quizzes.map(function(currentelement, index){return(<li key={index} onClick={() => setactive(currentelement)}>{currentelement}</li>)});
  return(
    <div className="quizselection">
      <ul className="droplist">
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
  console.log(active);
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
            <DropDownList quizzes={quizlist} setactive={setactive} active={active}></DropDownList>
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
