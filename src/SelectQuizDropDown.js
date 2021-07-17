import React, { useState } from 'react';

function SelectQuizDropDown(props){
  const [open, setOpen] = useState(false)
    return(
        <div className="dropdownbutton" onClick={() => setOpen(!open)}>
          <div className="button">
            Select Quiz
            <span className="icon">{props.icon}</span>
          </div>
          {open && props.children}
        </div>

    )
}
export default SelectQuizDropDown;