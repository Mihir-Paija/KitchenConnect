import React, { createContext, useState, useEffect, Children } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserTypeContext } from "./userTypeContext";

//context
export const AuthContext = createContext();

//provider
export const AuthProvider = ({ children }) => {
  //global state
  const [authState, setAuthState] = useState({
    authReady: false,
    authToken: "",
    authType: "",
  });

  //intial local  storage data
  useEffect(() => {
    const loadLocalStorageData = async () => {
      try {
        let localStorageData = await AsyncStorage.getItem("@auth");
        console.log(
            "Local data storage @auth initially => ",
            localStorageData
          );
        if (localStorageData) {
          let authData = JSON.parse(localStorageData);
          setAuthState({
            authReady: authData.authReady,
            authToken: authData.authToken,
            authType: authData.authType
     
          });
        } else {
          setAuthState((prevState) => ({
            ...prevState,
            authReady: true,
          }));
        }
        // console.log("Global Auth state intially => ", authCustomerState);
          // console.log(
          //   "Local data storage @authCustomer intially  => ",
          //   localStorageData
          // );

      //  console.log("Context ", authState)
      } catch (error) {
        console.log("Error loading local storage data:", error);
        setAuthState((prevState) => ({
          ...prevState,
          authReady: true, 
        }));
      }
    };

    loadLocalStorageData();
  }, []); 

  return (
    <AuthContext.Provider
      value={[authState, setAuthState]}
    >
      {children}
    </AuthContext.Provider>
  );
};
