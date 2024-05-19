import React, { createContext, useState, useEffect, Children } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
//context
export const AuthContext = createContext();

//provider
export const AuthProvider = ({ children }) => {
  //global state
  const [authState, setAuthState] = useState({
    authToken: "",
  });

  //intial local  storage data
  useEffect(() => {
    const loadLocalStorageData = async () => {
      try {
        let localStorageData = await AsyncStorage.getItem("@auth");
        if (localStorageData) {
          let authData = JSON.parse(localStorageData);
          setAuthState({
            authToken: authData.authToken,
          });
          console.log("Global Auth state intially => ", authState);
          console.log(
            "Local data storage @auth intially  => ",
            localStorageData
          );
        }
      } catch (e) {
        console.log("Error loading local storage data:", e);
      }
    };
    loadLocalStorageData();
  }, []);

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {children}
    </AuthContext.Provider>
  );
};
