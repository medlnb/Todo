import { createContext, useState } from "react";

export const DateContext = createContext()

export const DateContextProvider = ({ children }) => {
  const currentDate = new Date();
  const [date, setDate] = useState({
    day: currentDate.getDate(),
    month: currentDate.getMonth() + 1
  })

 
// console.log(date)
  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  )
}