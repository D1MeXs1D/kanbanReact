import React from 'react';
import style from '../../style/body/body.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

export default function Body({array, setArray, styleAddTask, setStyle}) {


  const [inputValue, setInput] = useState('');
  const [textareaValue, setTextarea] = useState('');

  const addTask= (index) => {
    swapSetStyle();
    if (styleAddTask == true) {
         setArray(
          array.map(obj =>
            obj.index === index && inputValue.trim() != ""  ? { ...obj, 
              task: [...obj.task, {nameTask: inputValue, taskDescription: noZeroString(textareaValue), id: uuidv4() }]
            } :   
            obj
          )
        ); 

    }   
    setInput('');
    setTextarea('')
  }

  useEffect(()=>{
    localStorage.setItem('task', JSON.stringify(array))
  } , [styleAddTask]); 
  function noZeroString (textareaValue) {
    if (textareaValue.trim() == '') {
        return "the task description is missing";
    }
    else {
        return textareaValue;
    }
  }

  function swapSetStyle () {
    setStyle(styleAddTask =>  styleAddTask === true ? styleAddTask = false : styleAddTask = true);
  }

  const swapTaskInColumns = (task, index) => {
    // я тут если шо
    // task - сама задачка, index - от куда берется (на единицу меньше)
// в общем тут ошибок нет, я тут все отладил еще давно, за исключением дбавил парс
    // чивооооооо зачем ты парсишь, ща увиш, го вниз, 137 строка, я там тоби подожжю
    //робит, не, тыж ничего не изменил) логика такая же ну проверь, я проверил, ты просто убрал переменную,
    //  а она нужна была для читаемости и меньшего кол-ва вычислений   
    //до этого я нажимал на опшн он не рбил сейчас добавляется, я видос прислал тебе что у меня, 10 секунд длится
    // на месте капитан

    setArray(
      array.map(obj =>
        obj.index === (index + 1) ? { ...obj, 
          task: [...obj.task, JSON.parse(task)]
        } :   
        obj
      )
    ); 
    // тут удаляет
    array[index].task = [...array[index].task.filter(itemTask => itemTask.id != JSON.parse(task).id)];
    hideSelect();
}

const [selectOrButton, setSelectOrButton] = useState([,false,false,false]);

const vievSelectOrButton = (number) => {
  // отрефакторить на цикл с условиями
  switch (number) {
      case 1:
        if(array[0].task.length > 0) {
          setSelectOrButton([,true,false,false])
        }      
      break;
  
      case 2:
        if(array[1].task.length > 0) {
          setSelectOrButton([,false,true,false])
        }
      break;  

      case 3:
        if(array[2].task.length > 0) {
          setSelectOrButton([,false,false,true])
        }
      break;

      default:
        setSelectOrButton([,false,false,false])
      break;
  }
}


function hideSelect () {
  setSelectOrButton([,false,false,false]);
}

  return (
    <div className={style.main}>
      {array.map((item, index) => 
      <div className={style.column}>
            <div className={style.tittle}>{item.name}</div>

            {item.task.length === 0
            ? 
              <div className={style.mesageForNullTask}>Issues are missing</div> 
            :
              <div className={style.listTask}>
                  {item.task.map((taskCard, index)=>      // тут
                  <Link className={style.link} key={uuidv4()} to={`task/${taskCard.id}`}>
                     <div className={style.task} key={index}> {taskCard.nameTask} </div>
                  </Link>)}
              </div>
            }
            {item.name === "Backlog" 
            ?  
              <>
                <div className={style.buttonAddTask} onClick={()=>addTask(item.index, uuidv4())}>+ Add card</div>
                  <div className={styleAddTask == false ? style.addTask : style.AddTaskActive}>
                    <h3>Adding an issue</h3>  
                    <input type="text"
                      value={inputValue}
                      placeholder='Enter the task name'
                      onChange={(event) => setInput(event.target.value)}
                    />
                    <textarea 
                      placeholder='Task description'
                      value={textareaValue}
                      onChange={(event) => setTextarea(event.target.value)}
                    ></textarea>
                  </div> 
              </>
            :
              <>  
                {selectOrButton[index] == 
                false ? <div className={style.button} onClick={()=> vievSelectOrButton(index)}>+ Add card</div> 
                :
                <select 
                
                onChange={(event) => swapTaskInColumns(event.target.value, index) }
                // фокус весь тут, если я ставлю onChange, то передачи нет, если ставлю onClick, то она есть, 
                // но не дает раскрыть селект и его закрывает
                //ну а почему не сделаешь оклик?? я ж говорю, закрывается селект при нажатии на него и не дает выбрать нужный опшион
                // добавление есть, но не то что выбрал пользователь аааа ну да вижу
                //значит в этой функции что то надо поправиить, хм, читод еиммено идем идем в функцию, го
                // на онченж можно как то событие повесить? не нашел инфы, щас у жопити еще спрошу
                //потому что он смапился, все робит
                //ну ты ж видишь самый первый не выбирается, ага, но, на ванильном жс я с таким не сталкивался
                //  я даже про дефолт опшион не знал, тип зачем его ставить если есть что то другое
                >  
                <option>
                Choose a taske
               {/* ненада дядяяяяяяяяяяяяяяяяяяяяяяяяяяяяяя  все идем в тг, го*/}
                </option>
    
                  {array[--index].task.map((task) => (
                    //сюда нужен дефолт ща я тебе его прикручу, я в интриге
                    //понил? да, но он отображается несколько раз)
                    //один раз отображается и он я влятеся дефолтным на который не нажмешь
                    //  чекай скрин в тг
                    //аааааа
                    // он внутри мапа
                      <option 
                      // вот тут я в строку сделал
                      value={JSON.stringify(task)} ///херня какая то, удиииииииииииии, не ламаааааааааааааай, аааааааааааааа
                      // будет ошибка обжект обжект, я пробовал уже по всякому
                      //  херня херней, но работает, опшион не хочет брать объект, вот и сделал строку
                      >{task.nameTask}</option>  
                  ))}
                </select>
                }
              </> 
              }
          </div>
      )}
    </div>
  )
}
