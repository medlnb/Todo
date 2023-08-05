import React, { useEffect, useRef, useContext, useState } from 'react';
import { DateContext } from '../../Contexts/DateContext';
import Day from '../Day/Day';
import './Days.css';

function Days() {
  const containerRef = useRef(null)
  const { date, setDate } = useContext(DateContext)
  const [daysContainers, SetDaysContainers] = useState(null);
  
  
  useEffect(() => {
    const daysContainer = [[], [], [], [], []]
    let last_day_in_month
    let count = 0
    let first_Day = date.day
    if ([1, 3, 5, 7, 8, 10, 12].includes(date.month))
      last_day_in_month = 32
    else if ([2, 4, 6, 9, 11].includes(date.month))
      last_day_in_month = 31
    if (date.day > last_day_in_month - 1) {
      setDate(prev => {
        return {...prev,day:prev.day-1}
      })
      first_Day = last_day_in_month - 1
    }
    
    while (count < last_day_in_month-1) {
      if (first_Day == last_day_in_month) first_Day = 1

      if (count < 6) daysContainer[0].push(<Day key={first_Day} dayNumber={first_Day} />);
      else if (count < 12) daysContainer[1].push(<Day key={first_Day} dayNumber={first_Day} />);
      else if (count < 18) daysContainer[2].push(<Day key={first_Day} dayNumber={first_Day} />);
      else if (count < 25) daysContainer[3].push(<Day key={first_Day} dayNumber={first_Day} />);
      else daysContainer[4].push(<Day key={first_Day} dayNumber={first_Day} />);

      first_Day++
      count++
    }
    SetDaysContainers(daysContainer)
    containerRef.current.scrollLeft -= 2000;
  }, [date.month])

  return (
    <>
      <div className='days_containers' ref={containerRef}>
        {daysContainers && daysContainers.map((days, index) => (
          <div key={index} className='days_container' >
            {days}
          </div>
        ))}
      </div>
    </>
  );
}

export default Days;