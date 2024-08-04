import React, { createContext, useState, useEffect } from "react";


export const RefreshContext = createContext();


export const RefreshProvider = ({ children }) => {

  const [globalRefresh, setGlobalRefresh] = useState(false);

  return (
    <RefreshContext.Provider value={[globalRefresh, setGlobalRefresh]}>
      {children}
    </RefreshContext.Provider>
  );
};
