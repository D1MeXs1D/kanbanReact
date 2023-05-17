import React from 'react'
import { useState } from 'react';
import svgImage from '../../image/Vector.svg';
import style from '../../style/header/dropDownMenu.module.css'
import arrowUp from '../../image/Vector-open.svg'
import arrowDown from '../../image/Vector-closed.svg'

export default function DropDownMenu() {

  const [arrow, setArrow] = useState(false)

  const swapSetArrow = () => {
    arrow === false ? setArrow(true) : setArrow(false);
  }
  return (
    <div className={style.menu}>
    <div className= {style.avatar} onClick={swapSetArrow}>
      <img src= {svgImage} alt="#" />
    </div>

    <div className={style.arrow} >
      <img src={arrow === false ? arrowUp : arrowDown} alt="#" onClick={swapSetArrow}/>
      <div className={arrow === false ? style.listNone : style.listActive}>
      <ul>
        <li>Profile</li>
        <li>Log Out</li>
      </ul>
      </div>
    </div>
    </div>
    
  )
}
