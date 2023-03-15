import React, { useState } from "react";

export const StateContext = React.createContext()

export default function ContextProvider({children}) {
  const [scrollable, setScrollable] = useState(true)
  const [definitionLocation, setDefinitionLocation] = useState([])
  return(
    <StateContext.Provider value={{scrollable, setScrollable, definitionLocation, setDefinitionLocation}}>
      {children}
    </StateContext.Provider>
  )
}