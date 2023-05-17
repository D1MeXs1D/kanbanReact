import React from 'react'
import { useState } from 'react';
import style from '../../style/footer/footer.module.css';


export default function TaskСounter({array}) {

    
    
    return (
        <div className={style.counter}>
            <p>{`Active tasks: <${array[0].task.length}>`}</p>
            <p>{`Finished tasks: <${array[3].task.length}>`}</p>
        </div>
  )
}
