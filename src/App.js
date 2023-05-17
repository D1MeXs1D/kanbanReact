import Header from "./components/header/header";
import Body from "./components/body/body";
import Footer from "./components/footer/footer";
import {Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { arrayColumns } from "./arraysWithObjects/columns";//может тут пути не те
import TaskWindowLogic from "./components/body/columnTask/taskWindowLogic";
import TaskWindow from "./components/body/columnTask/taskWindow";

function App() {
  const [array, setArray] = useState(JSON.parse(localStorage.getItem('task')) || arrayColumns);//у тебя странно подчеркивается так непривычно, у меня просто бледный
  const [styleAddTask, setStyle] = useState(false);

  useEffect(()=>{
    localStorage.setItem('task', JSON.stringify(array))
  } , [array]);

  return (
    <div className="kanban">
      <Header />
        <Routes>
          <Route path='/' 
          element= {<Body array={array} 
          setArray={setArray} 
          setStyle={setStyle} 
          styleAddTask={styleAddTask}/>} 
          />

          <Route path='/task/:id' element= {<TaskWindowLogic  array={array} 
          setArray={setArray} />} 
          />
        </Routes>
      <Footer array={array} />
    </div>
  );
}
export default App;
