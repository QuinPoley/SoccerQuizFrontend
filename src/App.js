import React  from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import SelectQuizDropDown from './SelectQuizDropDown';
import {  ReactComponent as Caret } from './Icons/caret.svg';
import { quiz } from './quiz.json';
import { func } from 'prop-types';


function getQuiz(quiz){
  return(null);
}

function makeApiCall(selectedquiz){
  return (
        <ul className="questionlist">
            {quiz.map(item => {
                return(
                <li className="quest">
                  <div>{item.text}</div>
                  <div className="alignanswers">
                    <div className="AnswerA">
                      <input type="radio" id={item.text + item.A} name={item.text} value={item.A}/>
                      <label for={item.text + item.A}>{item.A}</label><br/>
                    </div>
                    <div className="AnswerB">
                      <input type="radio" id={item.text + item.B} name={item.text} value={item.A}/>
                      <label for={item.text + item.B}>{item.B}</label><br/>
                    </div>
                    <div className="AnswerC">
                      <input type="radio" id={item.text + item.C} name={item.text} value={item.A}/>
                      <label for={item.text + item.C}>{item.C}</label><br/>
                    </div>
                    <div className="AnswerD">
                      <input type="radio" id={item.text + item.D} name={item.text} value={item.A}/>
                      <label for={item.text + item.D}>{item.D}</label>
                    </div>
                  </div>
                  <p/>
                </li>
                );
            })}
        </ul>
      );
}
function getQuizResult(isgraded, setgraded){
  if(isgraded){
    return
  }
  else{
    setgraded(true)
  }
  for (let i = 0; i < quiz.length; i++) {
    var elem = document.getElementsByName(quiz[i].text);
    for (let j = 0; j < elem.length; j++) {
      if(elem[j].checked){
        console.log(elem[j]);
      }
    }
  }
  
  document.getElementById("putresulthere").append("10/10 GREAT WORK");
  // Do another API call to get answers
}

function Quiz({selectedquiz, isgraded, setgraded}) {
  const response = makeApiCall(selectedquiz)
  return (
    <div className="questions">
        {response}
        <div className="submit" onClick={() => getQuizResult(isgraded, setgraded)}>Submit</div>
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

function handleNewQuiz(currentelement){
  console.log("Hello from "+currentelement);
}

function DropDownList({quizzes, setactive, active, setgraded}){
  var map1 = quizzes.map(function(currentelement, index){return(<li key={index} onClick={() => setactive(currentelement) && setgraded(false)}>{currentelement}</li>)});
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
  const [isgraded, setgraded] = useState(false);
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
            <DropDownList quizzes={quizlist} setactive={setactive} active={active} setgraded={setgraded} isgraded={isgraded}></DropDownList>
          </SelectQuizDropDown>
          <MakeQuizButton></MakeQuizButton>
          <div className="currentlyselected">{active}</div>
          <div className="result" id="putresulthere"></div>
        </nav>
        <div className="quizcontainer">
          <Quiz selectedquiz={active} isgraded={isgraded} setgraded={setgraded}/>
        </div>
      </div>
    </div>
  );
}

export default App;
