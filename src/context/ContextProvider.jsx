import React, { useState } from "react";

export const StateContext = React.createContext()

export default function ContextProvider({children}) {
  const [scrollable, setScrollable] = useState(true)
  return(
    <StateContext.Provider value={{scrollable, setScrollable}}>
      {children}
    </StateContext.Provider>
  )
}