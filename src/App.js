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
  //const thequiz = JSON.parse(quiz);
  /*<ul>
                        {valuesArray.map(item => {
                            return <li>{item}</li>;
                        })}
  </ul>
  
  <div>
          You have selected {selectedquiz}
  </div>*/
  return (
        <ul className="questionlist">
            {quiz.map(item => {
                return(
                <li>
                  <div className="quest">{item.text}</div>
                    <input type="radio" id={item.text + item.A} name={item.text} value={item.A}/>
                    <label for={item.text + item.A}>{item.A}</label><br/>
                    <input type="radio" id={item.text + item.B} name={item.text} value={item.A}/>
                    <label for={item.text + item.B}>{item.B}</label><br/>
                    <input type="radio" id={item.text + item.C} name={item.text} value={item.A}/>
                    <label for={item.text + item.C}>{item.C}</label><br/>
                    <input type="radio" id={item.text + item.D} name={item.text} value={item.A}/>
                    <label for={item.text + item.D}>{item.D}</label>
                  <p/>
                </li>
                );
            })}
        </ul>
      );
}
function getQuizResult(){
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

function Quiz({selectedquiz}) {
  const response = makeApiCall(selectedquiz)
  return (
    <div className="questions">
        {response}
        <div className="submit" onClick={() => getQuizResult()}>Submit</div>
        <div className="result" id="putresulthere"></div>
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
