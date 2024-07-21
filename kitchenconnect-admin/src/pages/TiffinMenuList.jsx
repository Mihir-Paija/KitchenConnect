/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import EmailSearchComponent from "../components/EmailSearchComponent";
import NavbarComponent from "../components/NavbarComponent";
import MenuTableComponent from "../components/MenuTableComponent";
import { fetchMenuList } from "../services/kitchenService";
import { useParams } from 'react-router-dom';


const TiffinMenuList = () => {
  const [menuData, setMenuData] = useState([]);
  const { authState } = useAuth();
  const { tiffinID } = useParams();

  //functions
  useEffect(() => {
    const fetchTiffin = async () => {
        try {
            console.log("tiffinID", tiffinID);
            const menu_response = await fetchMenuList(authState.authToken, tiffinID);
          //   console.log(menu_response.data);
            setMenuData(menu_response.data.menu);
          } catch (error) {
            console.error("search failed:", error.message);
            alert("search failed. Please try again.");
          }
    };

    fetchTiffin();
  }, [tiffinID]);
  const submitHandler = async (data) => {
    try {
      const tiffinID = data.email;
      console.log("tiffinID", tiffinID);
      const menu_response = await fetchMenuList(authState.authToken, tiffinID);
    //   console.log(menu_response.data);
      setMenuData(menu_response.data.menu);
    } catch (error) {
      console.error("search failed:", error.message);
      alert("search failed. Please try again.");
    }
  };

  return (
    <>
      <NavbarComponent />
      <EmailSearchComponent
        submitHandler={submitHandler}
        placeholder={"Tiffin ID"}
        type="ID"
      />
      <div style={{ width: "80%", margin: "0 auto" }}>
        <MenuTableComponent menuData={menuData} />
      </div>
    </>
  );
};

export default TiffinMenuList;
