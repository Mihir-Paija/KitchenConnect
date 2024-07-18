/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import EmailSearchComponent from "../components/EmailSearchComponent";
import NavbarComponent from "../components/NavbarComponent";
import MenuTableComponent from "../components/MenuTableComponent";
import { fetchMenuList } from "../services/kitchenService";
import { useParams } from "react-router-dom";

const menuData = [
  {
    _id: "665e0f64514ea40e4ae7cde1",
    day: "Mon",
    items: [
      {
        itemName: "Roti",
        quantity: 4,
        unit: "pcs",
        _id: "665e0f64514ea40e4ae7cde2",
      },
      {
        itemName: "Sabji",
        quantity: 300,
        unit: "g",
        _id: "665e10cf9d3d4b7551e10ce9",
      },
      {
        itemName: "Rice",
        quantity: 300,
        unit: "g",
        _id: "6662185f4dd1b63e22efac94",
      },
      {
        itemName: "Dal",
        quantity: 200,
        unit: "ml",
        _id: "6662186b4dd1b63e22efacb9",
      },
    ],
  },
  {
    _id: "665e10e19d3d4b7551e10cf1",
    day: "Tue",
    items: [
      {
        itemName: "Sabji",
        quantity: 250,
        unit: "g",
        _id: "665e10e19d3d4b7551e10cf2",
      },
      {
        itemName: "Roti",
        quantity: 2,
        unit: "pcs",
        _id: "665e10f69d3d4b7551e10cfc",
      },
    ],
  },
  {
    _id: "666201ad567bf36205d76aa8",
    day: "Sat",
    items: [
      {
        itemName: "Paratha",
        quantity: 2,
        unit: "pcs",
        _id: "666201ad567bf36205d76aa9",
      },
    ],
  },
  {
    _id: "6662d7e8d55918f5ff0cbd43",
    day: "Wed",
    items: [
      {
        itemName: "Paratha",
        quantity: 2,
        unit: "pcs",
        _id: "6662d7e8d55918f5ff0cbd44",
      },
    ],
  },
  // Add more objects as needed
];

const Tiffin = () => {
  const [menuData, setMenuData] = useState([]);
  const { authState } = useAuth();
  const { tiffinID } = useParams();

  //functions
  const submitHandler = async (data) => {
    try {
      const tiffinID = data.email;
      console.log("tiffinID", tiffinID);
      const menu_response = await fetchMenuList(authState, tiffinID);
      console.log(menu_response.data);
      setMenuData(menu_response.data.menu);
    } catch (error) {
      console.error("search failed:", error.message);
      alert("search failed. Please try again.");
    }
  };

  useEffect (() => {
    if(tiffinID)
        submitHandler({email :tiffinID});
  })

  return (
    <>
      <NavbarComponent />
      <EmailSearchComponent
        submitHandler={submitHandler}
        placeholder={"Tiffin ID"}
        type="ID"
        inputValue={tiffinID ? tiffinID : ""}
      />
      <div style={{ width: "80%", margin: "0 auto" }}>
        {menuData.length > 0 && (
          <MenuTableComponent menuData={menuData} />
        ) 
    }
      </div>
    </>
  );
};

export default Tiffin;
