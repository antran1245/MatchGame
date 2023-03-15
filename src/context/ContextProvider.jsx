import React, { useRef, useState } from "react";

export const StateContext = React.createContext()

export default function ContextProvider({children}) {
  const [scrollable, setScrollable] = useState(true)
  const dropzoneRef = useRef([])

  const addItemRef = (ref) => {
    dropzoneRef.current.push(ref)
  }
  
  return(
    <StateContext.Provider value={{scrollable, setScrollable, dropzoneRef, addItemRef}}>
      {children}
    </StateContext.Provider>
  )
}