import React, { useState, useRef, useEffect, useContext } from 'react'
import { DateContext } from '../../Contexts/DateContext'
import './Navbar.css'
function Navbar() {
  const { date, setDate } = useContext(DateContext)

  const nav_container = useRef(null)
  useEffect(() => {
    // setDate({
    //   day: 4,
    //   month: 5
    // });
    (date.month > 5) && (nav_container.current.scrollLeft += 1000)
  }, [])

  const months = ["jav", "fev", "mar", "avr", "may", "jun",
    "juil", "aout", "sep", "oct", "nov", "dec"];
  const [month, setMonth] = useState(months);


  const first_month = []
  const second_month = []
  months.map((element, index, array) => {
    index > 5 ? first_month.push(
      <button
        key={index}
        id={index}
        onClick={() =>
          setDate(prev => {
            return { ...prev, month: index + 1 }
          })
        }
        className={(date.month == index + 1) ? "btn_clicked" : "btn"}

      > {month[index]}</button >
    ) : second_month.push(
      <button
        key={index}
        id={index}
        onClick={() => setDate(prev => {
          return { ...prev, month: index+1 }
        })}
        className={(date.month == index+1) ? "btn_clicked" : "btn"}
      >{month[index]}</button>)
  });



  return (
    <nav className='nav' ref={nav_container}>
      <div className='half_nav'>
        {second_month}
      </div>
      <div className='half_nav'>
        {first_month}
      </div>
    </nav>
  )
}

export default Navbar