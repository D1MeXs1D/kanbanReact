import React from 'react'
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from '../../../style/body/windowTask/windowTask.module.css';
import line from '../../../image/Vector1.svg';

export default function TaskWindowLogic({array}) {
    
  const {id} = useParams();


  
  let valueFromComponent = null;
    array.forEach(el=> {
      el.task.forEach(elem=> {
        if(elem.id===id) {
          valueFromComponent = elem;
        }
    })
  })

  const [inputValue, setInpitValue] = useState(valueFromComponent.nameTask)
  const [textAreaValue, setTextAreaValue] = useState(valueFromComponent.taskDescription)

  const [window, setWindow] = useState(false);



  const swapWindow = () => {
    window === false ? setWindow(true) : setWindow(false);
  }

  const saveChange = () => {
    array.forEach(el=> {
      el.task.forEach(elem=> {
        if(elem.id===id) {
          elem.nameTask = inputValue;
          elem.taskDescription = textAreaValue;
        }
      })
    })
   
    swapWindow();
  }

  return (
    <div className = {style.window}>
     {
      window === false ? <>
       <Link  to = "/">  
        <div className={style.closeWindow}>
            <img src={line} alt="" />
            <img src={line} alt="" />
        </div>
      </Link>
      <h1 className = {style.h1}>{inputValue}</h1>
      <p className = {style.p}>{valueFromComponent.taskDescription}</p>
      <div className={style.buttons}>
        <div className={style.button}  onClick={()=> swapWindow()}>Edit</div>
      </div>
      </> : 
      <>
      <Link  to = "/">  
       <div className={style.closeWindow}>
           <img src={line} alt="#" />
           <img src={line} alt="#" />
       </div>
     </Link>
     <div className={style.inputAndTextArea}>
     <input 
        type="text" 
        onChange={(event) => setInpitValue(event.target.value)}
        placeholder='Enter your changes for tittle'
     />
        <textarea 
        onChange={(event) => setTextAreaValue(event.target.value)}
        placeholder='Enter your changes for description'
        />
     </div>
      <div className={style.buttons}>
        <div className={style.button} onClick={()=> saveChange()}>+ Save</div>
        <div className={style.button} onClick={swapWindow}>- Сancellation</div>
      </div>
     </>
     }

      
    </div> 
    )
}
