/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NavbarComponent from "../components/NavbarComponent";
import EmailSearchComponent from "../components/EmailSearchComponent";
import UserCardComponent from "../components/userCardComponent";
import { useAuth } from "../contexts/AuthContext";
import { fetchProviderDetails } from "../services/userService";
import TiffinComponent from "../components/TiffinComponent";
import TiffinTableComponent from "../components/TiffinTableComponent";
import { fetchTiffinList } from "../services/tiffinService";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


// const tiffinData = [
//   {
//     _id: { $oid: "6651dbc8d407afdc792e53d7" },
//     name: "Half Tiffin",
//     providerID: { $oid: "664cbd815197c25e1bbc6fe6" },
//     shortDescription: "Best",
//     foodType: "Veg",
//     price: 100,
//     tiffinType: "Dinner",
//     time: "12:30",
//     deliveryDetails: {
//       availability: true,
//       deliveryCharge: 25,
//       deliveryTime: "13:00",
//       _id: { $oid: "6651dbc8d407afdc792e53d8" },
//     },
//     createdAt: { $date: "2024-05-25T12:38:32.635Z" },
//     updatedAt: { $date: "2024-07-09T20:31:32.656Z" },
//     __v: 0,
//     deactivate: false,
//     packingCharge: null,
//     providePacking: false,
//     rating: 0,
//     ratingsize: 0,
//   },
//   {
//     _id: { $oid: "6651dbc8d407afdc792e53d8" },
//     name: "Half Tiffin",
//     providerID: { $oid: "664cbd815197c25e1bbc6fe6" },
//     shortDescription: "Best",
//     foodType: "Veg",
//     price: 100,
//     tiffinType: "Dinner",
//     time: "12:30",
//     deliveryDetails: {
//       availability: true,
//       deliveryCharge: 25,
//       deliveryTime: "13:00",
//       _id: { $oid: "6651dbc8d407afdc792e53d8" },
//     },
//     createdAt: { $date: "2024-05-25T12:38:32.635Z" },
//     updatedAt: { $date: "2024-07-09T20:31:32.656Z" },
//     __v: 0,
//     deactivate: false,
//     packingCharge: null,
//     providePacking: false,
//     rating: 0,
//     ratingsize: 0,
//   },
//   {
//     _id: { $oid: "6651dbc8d407afdc792e53d9" },
//     name: "Half Tiffin",
//     providerID: { $oid: "664cbd815197c25e1bbc6fe6" },
//     shortDescription: "Best",
//     foodType: "Veg",
//     price: 100,
//     tiffinType: "Dinner",
//     time: "12:30",
//     deliveryDetails: {
//       availability: true,
//       deliveryCharge: 25,
//       deliveryTime: "13:00",
//       _id: { $oid: "6651dbc8d407afdc792e53d8" },
//     },
//     createdAt: { $date: "2024-05-25T12:38:32.635Z" },
//     updatedAt: { $date: "2024-07-09T20:31:32.656Z" },
//     __v: 0,
//     deactivate: false,
//     packingCharge: null,
//     providePacking: false,
//     rating: 0,
//     ratingsize: 0,
//   },
//   {
//     _id: { $oid: "6651dbc8d407afdc792e53d1" },
//     name: "Half Tiffin",
//     providerID: { $oid: "664cbd815197c25e1bbc6fe6" },
//     shortDescription: "Best",
//     foodType: "Veg",
//     price: 100,
//     tiffinType: "Dinner",
//     time: "12:30",
//     deliveryDetails: {
//       availability: true,
//       deliveryCharge: 25,
//       deliveryTime: "13:00",
//       _id: { $oid: "6651dbc8d407afdc792e53d8" },
//     },
//     createdAt: { $date: "2024-05-25T12:38:32.635Z" },
//     updatedAt: { $date: "2024-07-09T20:31:32.656Z" },
//     __v: 0,
//     deactivate: false,
//     packingCharge: null,
//     providePacking: false,
//     rating: 0,
//     ratingsize: 0,
//   },
// ];

const Provider = () => {
  const [loading, setLoading] = useState(false);
  const [providerData, setProviderData] = useState([]);
  const [tiffinData, setTiffinData] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const { providerEmail } = useParams();
  const navigate = useNavigate(); 
  const {authState} = useAuth()


  useEffect(() =>{
    if(authState === null)
      navigate('/login')
  }, [authState])

  //functions
  const submitHandler = async (data) => {
    try {
      setLoading(true);
      const bodyData = {
        email: data.email,
      };
      // console.log(bodyData);
      const kitchen_response = await fetchProviderDetails(
        authState,
        data.email
      );
      // console.log(response.data);
      setProviderData([kitchen_response.data]);
      const tiffn_response = await fetchTiffinList(
        authState,
        kitchen_response.data._id
      );
      // console.log(response.data);
      setTiffinData(tiffn_response.data);
      // Navigate to the new URL
      navigate(`/provider/${data.email}`);
      localStorage.setItem("providerEmail", JSON.stringify(data.email));
    } catch (error) {
      console.error("search failed:", error.message);
      alert("search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // // Effect for retrieving providerEmail from localStorage
  // useEffect(() => {
  //   const fetchProviderEmail = async () => {
  //     try {
  //       setLoading(true); // Start loading
  //       const savedproviderEmail = localStorage.getItem("providerEmail");
  //       if (savedproviderEmail) {
  //         setInputValue(JSON.parse(savedproviderEmail));
  //       }
  //       // Debugging logs
  //       console.log("Saved Provider Email:", savedproviderEmail);
  //     } catch (error) {
  //       console.error("Failed to retrieve providerEmail:", error.message);
  //     } finally {
  //       setLoading(false); // Stop loading
  //     }
  //   };
    
  //   fetchProviderEmail();
  // }, []);

  // useEffect(() => {
  //   console.log("Input Value after change:", inputValue);
  // }, [inputValue]);

  return (
    <>
      <NavbarComponent />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <EmailSearchComponent
            submitHandler={submitHandler}
            placeholder={"Provider Email"}
            inputValue={providerEmail ? providerEmail : ""}
            localStorageName = "providerEmail"
          />

          {/* style={{width: "50%", marginLeft: 0}} */}
          <div>
            {providerData.length > 0 && (
              <UserCardComponent userData={providerData[0]} />
            )}
          </div>
          {tiffinData.length > 0 && (
            <div style={{ width: "99%", margin: "0 auto" }}>
              <TiffinTableComponent tiffinData={tiffinData} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Provider;
