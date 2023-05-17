import React from 'react';
import DropDownMenu from './dropDownMenu';
import style from '../../style/header/header.module.css';

export default function Header() {
  return (
    <header>
        <div className={style.wrapper}>
            <div className={style.logo}>Awesome Kanban Board</div>
            <DropDownMenu/>
        </div> 
    </header>
  )
}
