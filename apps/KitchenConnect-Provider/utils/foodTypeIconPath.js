import { windowHeight, windowWidth } from "@/utils/dimensions";
export default {
  Veg: {
    Type: "Veg",
    path: require("@/assets/foodType/Veg_Icon.png"),
    foodTypeStyle: {
      resizeMode: "cover",
      width: windowWidth * 0.05,
      height: windowWidth * 0.05,
    },
  },
  NonVeg: {
    Type: "Non-Veg",
    path: require("@/assets/foodType/Non_Veg_Icon.png"),
    foodTypeStyle: {
      resizeMode: "cover",
      width: windowWidth * 0.05,
      height: windowWidth * 0.05,
    },
  },
  Vegan: {
    Type: "Vegan",
    path: require("@/assets/foodType/vegan.png"),
    foodTypeStyle: {
      resizeMode: "cover",
      width: windowWidth * 0.05,
      height: windowWidth * 0.05,
    },
  },
  Jain: {
    Type: "Jain",
    path: require("@/assets/foodType/Jain.png"),
    foodTypeStyle: {
      resizeMode: "cover",
      width: windowWidth * 0.1,
      height: windowWidth * 0.05,
    },
  },
  Swaminarayan: {
    Type: "Swaminarayan",
    path: require("@/assets/foodType/swaminarayan.png"),
    foodTypeStyle: {
      resizeMode: "cover",
      width: windowWidth * 0.2,
      height: windowWidth * 0.05,
    },
  },
};
