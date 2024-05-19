import React, { createContext, useState, useEffect, Children } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
//context
export const CustomerAuthContext = createContext();

//provider
export const CustomerAuthProvider = ({ children }) => {
  //global state
  const [authCustomerState, setAuthCustomerState] = useState({
    authCustomerToken: "",
  });

  //intial local  storage data
  useEffect(() => {
    const loadLocalStorageData = async () => {
      try {
        let localStorageData = await AsyncStorage.getItem("@authCustomer");
        if (localStorageData) {
          let authData = JSON.parse(localStorageData);
          setAuthCustomerState({
            authCustomerToken: authData.authCustomerToken,
          });
          // console.log("Global Auth state intially => ", authCustomerState);
          // console.log(
          //   "Local data storage @authCustomer intially  => ",
          //   localStorageData
          // );
        }
      } catch (e) {
        console.log("Error loading local storage data:", e);
      }
    };
    loadLocalStorageData();
  }, []);

  return (
    <CustomerAuthContext.Provider
      value={[authCustomerState, setAuthCustomerState]}
    >
      {children}
    </CustomerAuthContext.Provider>
  );
};
