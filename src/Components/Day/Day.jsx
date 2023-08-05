import React, { useContext } from 'react'
import { DateContext } from '../../Contexts/DateContext';
import './Day.css'

function Day({ dayNumber }) {
  const {date, setDate} = useContext(DateContext)
  return (
    <div
      key={dayNumber}
      id={dayNumber}
      onClick={() => {
        setDate(prev => {
          return { ...prev, day: dayNumber }
        });

      }}
      className={date.day == dayNumber ? 'day_clicked' : 'day'}
    >
      {dayNumber}
    </div>
  )
}

export default Day