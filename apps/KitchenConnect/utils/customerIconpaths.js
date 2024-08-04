import React from "react";
export default {
  Kitchen: {
    navigator: "HomeCustomerNavigator",
    screen: "HomeCustomer",
    active: require("../assets/icons8-restaurant-ios-17-filled/icons8-restaurant-100.png"),
    inactive: require("@assets/icons8-restaurant-ios-17-outlined/icons8-restaurant-100.png"),
  },
  History: {
    navigator: "",
    screen: "HistoryCustomer",
    active: require("../assets/icons8-time-machine-ios-17-filled/icons8-time-machine-100.png"),
    inactive: require("../assets/icons8-time-machine-ios-17-outlined/icons8-time-machine-100.png"),
  },
  Wallet: {
    navigator: "",
    screen: "WalletCustomer",
    active: require("@assets/icons8-wallet-ios-17-filled/icons8-wallet-100.png"),
    inactive: require("@assets/icons8-wallet-ios-17-outlined/icons8-wallet-100.png"),
  },
  Subscription: {
    navigator: "SubscriptionCustomerNavigator",
    screen: "SubscriptionCustomer",
    active: require("@assets/icons8-yellow-tiffin-ios-17-filled/icons8-tiffin-100.png"),
    inactive: require("@assets/icons8-grey-tiffin-ios-17-outlined/icons8-tiffin-100.png"),
  },
};
