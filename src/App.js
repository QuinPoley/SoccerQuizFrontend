import React  from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import SelectQuizDropDown from './SelectQuizDropDown';
import {  ReactComponent as Caret } from './Icons/caret.svg';
//import { quiz } from './quiz.json';


const getQuiz = async (selectedquiz, setquiz) =>{
  async function getQuestions(){
    const data = await fetch('http://localhost:8000/quiz/'+selectedquiz)
  .then(response => {return response.json();})
  .catch(error => {console.error(error);});
  return data
}
  let quizzes = await getQuestions()
  //let jsonquiz = JSON.parse(quizzes);
  setquiz(quizzes);
  /*for(let i = 0; i < jsonquiz.length; i++){
      returnlist[i] = (jsonquiz[i].name);
  }
  return returnlist;*/
}

function makeApiCall(selectedquiz, quiz, setquiz){
  getQuiz(selectedquiz, setquiz);
  if(quiz != null){
    let jsonquiz = JSON.parse(quiz);
    if(jsonquiz.quiz.length === 0){return(<div className="quest">SELECT A QUIZ</div>);}
    return (
          <ul className="questionlist">
              {jsonquiz.quiz.map(item => {
                  return(
                  <li className="quest">
                    <div>{item.text}</div>
                    <div className="alignanswers">
                      <div className="AnswerA">
                        <input type="radio" id={item.text + item.A} name={item.text} value={item.A}/>
                        <label for={item.text + item.A}>{item.A}</label><br/>
                      </div>
                      <div className="AnswerB">
                        <input type="radio" id={item.text + item.B} name={item.text} value={item.B}/>
                        <label for={item.text + item.B}>{item.B}</label><br/>
                      </div>
                      <div className="AnswerC">
                        <input type="radio" id={item.text + item.C} name={item.text} value={item.C}/>
                        <label for={item.text + item.C}>{item.C}</label><br/>
                      </div>
                      <div className="AnswerD">
                        <input type="radio" id={item.text + item.D} name={item.text} value={item.D}/>
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
    else{
      return(
      <div className="quest">SELECT A QUIZ</div>
        );
    }
}

const gradeQuiz = async (quiz, setgrade, quizresponse) =>{
  async function postanswers(quiz){
    //"Red, Blue, Orange, Blue, Orange"
    const answer = {"responses" : quizresponse}
    let data = await fetch('http://localhost:8000/quiz/grade/'+quiz, {method: 'POST', headers:{'Content-Type': 'application/json'}, body: JSON.stringify(answer)})
    .then(response => {return response.json();})
    .catch(error => {console.error(error);});
    return data;
}
  let quizzes = await postanswers(quiz);
  if(quizzes == null){
    setgrade(0);
    return
  }
  quizzes = await JSON.parse(quizzes);
  console.log(quizzes.score);
  
  console.log(quizzes.score);
  setgrade(quizzes.score);
}

function getQuizResult(isgraded, setgraded, quiz, selectedquiz, grade, setgrade){
  if(isgraded && document.getElementById("putresulthere").firstChild != null){
    document.getElementById("putresulthere").firstChild.remove();
  }
  if(quiz == null){
    return
  }
  var jsonquiz = JSON.parse(quiz);
  console.log(jsonquiz);
  console.log(jsonquiz.quiz.length);
  var quizresponses = "";
  for (let i = 0; i < jsonquiz.quiz.length; i++) {
    var elem = document.getElementsByName(jsonquiz.quiz[i].text);
    //console.log(elem);
    for (let j = 0; j < elem.length; j++) {
      if(elem[j].checked){
        quizresponses = quizresponses + elem[j].value + ", ";
      }
    }
  }
  quizresponses = quizresponses.substring(0, quizresponses.length -2);
  console.log(quizresponses);
  gradeQuiz(selectedquiz, setgrade, quizresponses);
  console.log("we here");
  setgraded(true);
  // Do another API call to get answers
}

function Quiz({selectedquiz, isgraded, setgraded, quiz, setquiz, grade, setgrade}) {
  useEffect(() => {
    if(isgraded && document.getElementById("putresulthere").firstChild != null){
      document.getElementById("putresulthere").firstChild.remove();
    }
    document.getElementById("putresulthere").append("Score: "+grade+" %");
}, [grade]);
  const response = makeApiCall(selectedquiz, quiz, setquiz);
  return (
    <div className="questions">
        {response}
        <div className="submit" onClick={() => getQuizResult(isgraded, setgraded, quiz, selectedquiz, grade, setgrade)}>Submit</div>
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
  const [quiz, setquiz] = useState(null);
  useEffect(() => {
    if (quizlist == null){
      fetchQuizzes(setquizlist);
    }
}, []);
const [isgraded, setgraded] = useState(false);
const [grade, setgrade] = useState('0');
const [active, setactive] = useState(null); //quizlist[0]
useEffect(() => {
  if(isgraded && document.getElementById("putresulthere").firstChild != null){
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
        </nav>
        <div className="quizcontainer">
          <Quiz selectedquiz={active} isgraded={isgraded} setgraded={setgraded} quiz={quiz} setquiz={setquiz} grade={grade} setgrade={setgrade}/>
          <div className="result" id="putresulthere"></div>
          <div className="currentlyselected">{active}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
