export default {
  Kitchen: {
    navigator: "HomeCustomerNavigator",
    screen: "HomeCustomer",
    active: require("@/assets/shared/icons8-restaurant-ios-17-filled/icons8-restaurant-100.png"),
    inactive: require("@/assets/shared/icons8-restaurant-ios-17-outlined/icons8-restaurant-100.png"),
  },
  Orders:{
    active: require("@/assets/shared/icons8-take-away-food-ios-17-filled/icons8-take-away-food-100.png"),
    inactive: require("@/assets/shared/icons8-take-away-food-ios-17-outlined/icons8-take-away-food-100.png"),
  },
  History: {
    navigator: "",
    screen: "HistoryCustomer",
    active: require("@/assets/shared/icons8-time-machine-ios-17-filled/icons8-time-machine-100.png"),
    inactive: require("@/assets/shared/icons8-time-machine-ios-17-outlined/icons8-time-machine-100.png"),
  },
  Wallet: {
    navigator: "",
    screen: "WalletCustomer",
    active: require("@/assets/shared/icons8-wallet-ios-17-filled/icons8-wallet-100.png"),
    inactive: require("@/assets/shared/icons8-wallet-ios-17-outlined/icons8-wallet-100.png"),
  },
  Subscription: {
    navigator: "SubscriptionCustomerNavigator",
    screen: "SubscriptionCustomer",
    active: require("@/assets/shared/icons8-yellow-tiffin-ios-17-filled/icons8-tiffin-100.png"),
    inactive: require("@/assets/shared/icons8-grey-tiffin-ios-17-outlined/icons8-tiffin-100.png"),
  },
};
