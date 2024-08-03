const generateOrdersForSubscription = (startDate, endDate, subscriptionID) => {
  const orders = [];
  let currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    // console.log(currentDate);
    orders.push({
      subscriptionID,
      orderDate: new Date(currentDate),
      status: "Upcoming",
      otp: null, // Function to generate OTP if needed
      amountPaid: null, // Assuming initial amount paid is 0, can be updated as required
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return orders;
};

export default generateOrdersForSubscription;
