import React, { createContext, useState, useEffect, Children } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//context
export const CustomerAuthContext = createContext();

//provider
export const CustomerAuthProvider = ({ children }) => {
  //global state
  const [authCustomerState, setAuthCustomerState] = useState({
    authCustomerReady: false,
    authCustomerToken: "",
  });

  //intial local  storage data
  useEffect(() => {
    const loadLocalStorageData = async () => {
      try {
        let localStorageData = await AsyncStorage.getItem("@authCustomer");
        console.log(
          "Local data storage @authCustomer initially => ",
          localStorageData
        );
        if (localStorageData) {
          let authData = JSON.parse(localStorageData);
          console.log("authData ", authData);
          setAuthCustomerState((prevState) => ({
            ...prevState,
            authCustomerReady: true,
            authCustomerToken: authData,
          }));
          // console.log("Global Auth state intially => ", authCustomerState);
          // console.log(
          //   "Local data storage @authCustomer intially  => ",
          //   localStorageData
          // );
        }
      } catch (e) {
        console.log("Error loading local storage data:", e);
        setAuthCustomerState((prevState) => ({
          ...prevState,
          authCustomerReady: true, // Set isLoading to false in case of error
        }));
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
