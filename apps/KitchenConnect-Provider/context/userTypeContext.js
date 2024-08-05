import React, { createContext, useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";

//context
export const UserTypeContext = createContext();

//provider
export const UserTypeProvider = ({ children }) => {
  //global state
  const [userType, setUserType] = useState("");

  return (
    <UserTypeContext.Provider value={[userType, setUserType]}>
      {children}
    </UserTypeContext.Provider>
  );
};
