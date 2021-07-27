import React  from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import SelectQuizDropDown from './SelectQuizDropDown';
import {  ReactComponent as Caret } from './Icons/caret.svg';
import { quiz } from './quiz.json';
import { func } from 'prop-types';

const getQuiz = async (selectedquiz) =>{
  async function getQuestions(){
    const data = await fetch('http://localhost:8000/quiz/'+selectedquiz)
  .then(response => {return response.json();})
  .catch(error => {console.error(error);});
  return data
}
  console.log('http://localhost:8000/quiz/'+selectedquiz);
  var returnlist = [];
  let quizzes = await getQuestions()
  //let jsonquiz = JSON.parse(quizzes);
  console.log(quizzes);
  /*for(let i = 0; i < jsonquiz.length; i++){
      returnlist[i] = (jsonquiz[i].name);
  }
  return returnlist;*/
}

function makeApiCall(selectedquiz){
  getQuiz(selectedquiz);
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
  const response = makeApiCall(selectedquiz);
  return (
    <div className="questions">
        {response}
        <div className="submit" onClick={() => getQuizResult(isgraded, setgraded)}>Submit</div>
    </div>
  );
}


const fetchQuizzes = async (setquizlist) =>{
  async function getList(){
    const data = await fetch('http://localhost:8000/quizzes')
  .then(response => {return response.json();})
  .catch(error => {console.error(error);});
  return data
}
  var returnlist = [];
  let quizzes = await getList()
  let jsonquiz = JSON.parse(quizzes);
  for(let i = 0; i < jsonquiz.length; i++){
      returnlist[i] = (jsonquiz[i].name);
  }
  setquizlist(returnlist);
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
  const [quizlist, setquizlist] = useState(null);
  useEffect(() => {
    if (quizlist == null){
      fetchQuizzes(setquizlist);
    }
}, []);
const [isgraded, setgraded] = useState(false);
const [active, setactive] = useState(null); //quizlist[0]
useEffect(() => {
  if(isgraded){
    setgraded(false);
    document.getElementById("putresulthere").firstChild.remove()
  }
}, [active]);
  
  
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
