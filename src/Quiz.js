import './Quiz.css'
import QuestionList from './QuestionList';
import React, { useState, useEffect } from 'react';
//<QuestionList questions={selectedquiz}/>


function makeApiCall(selectedquiz){
    return (<div>
        You have selected quiz {selectedquiz}
        </div>
        )
}

function Quiz({selectedquiz}) {
    const [selected, set] = useState([selectedquiz])
    const response = makeApiCall(selected)
    return (
      <div className="Questions">
          {response}
      </div>
    );
  }

  export default Quiz;
