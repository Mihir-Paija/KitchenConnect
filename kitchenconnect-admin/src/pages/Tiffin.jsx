/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import EmailSearchComponent from "../components/EmailSearchComponent";
import NavbarComponent from "../components/NavbarComponent";
import MenuTableComponent from "../components/MenuTableComponent";
import { fetchMenuList, fetchSubPlanList } from "../services/kitchenService";
import { useParams } from "react-router-dom";
import SubPlanTableComponent from "../components/SubPlanTableComponent";

// const menuData = [
//   {
//     _id: "665e0f64514ea40e4ae7cde1",
//     day: "Mon",
//     items: [
//       {
//         itemName: "Roti",
//         quantity: 4,
//         unit: "pcs",
//         _id: "665e0f64514ea40e4ae7cde2",
//       },
//       {
//         itemName: "Sabji",
//         quantity: 300,
//         unit: "g",
//         _id: "665e10cf9d3d4b7551e10ce9",
//       },
//       {
//         itemName: "Rice",
//         quantity: 300,
//         unit: "g",
//         _id: "6662185f4dd1b63e22efac94",
//       },
//       {
//         itemName: "Dal",
//         quantity: 200,
//         unit: "ml",
//         _id: "6662186b4dd1b63e22efacb9",
//       },
//     ],
//   },
//   {
//     _id: "665e10e19d3d4b7551e10cf1",
//     day: "Tue",
//     items: [
//       {
//         itemName: "Sabji",
//         quantity: 250,
//         unit: "g",
//         _id: "665e10e19d3d4b7551e10cf2",
//       },
//       {
//         itemName: "Roti",
//         quantity: 2,
//         unit: "pcs",
//         _id: "665e10f69d3d4b7551e10cfc",
//       },
//     ],
//   },
//   {
//     _id: "666201ad567bf36205d76aa8",
//     day: "Sat",
//     items: [
//       {
//         itemName: "Paratha",
//         quantity: 2,
//         unit: "pcs",
//         _id: "666201ad567bf36205d76aa9",
//       },
//     ],
//   },
//   {
//     _id: "6662d7e8d55918f5ff0cbd43",
//     day: "Wed",
//     items: [
//       {
//         itemName: "Paratha",
//         quantity: 2,
//         unit: "pcs",
//         _id: "6662d7e8d55918f5ff0cbd44",
//       },
//     ],
//   },
//   // Add more objects as needed
// ];

const Tiffin = () => {
  const [menuData, setMenuData] = useState([]);
  const [subPlanData, setSubPlanData] = useState([]);
  const { authState } = useAuth();
  const { tiffinID } = useParams();
  const [selectedOption, setSelectedOption] = useState("Select Option");
  //functions
  const submitHandler = async (data) => {
    try {
      if (selectedOption === "Menus") {
        const tiffinID = data.email;
        // console.log("tiffinID", tiffinID);
        const menu_response = await fetchMenuList(authState, tiffinID);
        // console.log(menu_response.data);
        setMenuData(menu_response.data.menu);
      } else if (selectedOption === "SubscriptionPlan") {
        const tiffinID = data.email;
        // console.log("tiffinID", tiffinID);
        const subPlan_response = await fetchSubPlanList(authState, tiffinID);
        console.log(subPlan_response.data);
        setSubPlanData(subPlan_response.data.subscriptions);
      }
    } catch (error) {
      console.error("search failed:", error.message);
      alert("search failed. Please try again.");
    }
  };

  useEffect(() => {
    if (tiffinID) submitHandler({ email: tiffinID });
  }, [tiffinID]);

  return (
    <>
      <NavbarComponent />
      <EmailSearchComponent
        submitHandler={submitHandler}
        placeholder={"Tiffin ID"}
        type="ID"
        inputValue={tiffinID ? tiffinID : ""}
        options={["Menus", "SubscriptionPlan"]}
        selectedOption={selectedOption}
        onSelectOption = {setSelectedOption}
      />
      <div style={{ width: "80%", margin: "0 auto" }}>
        {menuData.length > 0 && selectedOption==="Menus" && <MenuTableComponent menuData={menuData} />}
        {subPlanData.length > 0 && selectedOption==="SubscriptionPlan" && <SubPlanTableComponent subPlanData={subPlanData} />}
      </div>
    </>
  );
};

export default Tiffin;
