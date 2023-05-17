import React from 'react'
import TaskDev from './taskDev';
import TaskСounter from './taskСounter';
import style from '../../style/footer/footer.module.css';

export default function Footer({array}) {
  return (
    <footer>
      <div className={style.wrapper}>
        <TaskСounter array={array}/>
        <TaskDev/>
      </div>
    </footer>
  )
}
