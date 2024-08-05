import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { windowHeight, windowWidth } from "@/utils/dimensions";


const ReviewCard = ({ feedBack }) => {
  console.log("feedBack:", feedBack);
  const stars = [1, 2, 3, 4, 5];
  //function

  displayDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const optionsThisYear = { day: "numeric", month: "short" };
    const optionsPastYear = { day: "numeric", month: "short", year: "numeric" };

    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString("en-US", optionsThisYear);
    } else {
      return date.toLocaleDateString("en-US", optionsPastYear);
    }
  };

  return (
    <View style={styles.outerBox}>
      <View style={styles.firstBox}>
        <View style={styles.customerBox}>
          <Image
            source={require("../../assets/shared/icons8-male-user-ios-17-outlined/icons8-male-user-100.png")}
            style={styles.iconImage}
          />
          <View style={{}}>
            <Text style={styles.customerNameTxt}>
              {feedBack.customerDetail.name}
            </Text>
            <View style={styles.starContainer}>
              {stars.map((star) => (
                <View key={star}>
                  <Icon
                    name={
                      star <= feedBack.feedBack.rate
                        ? "star-sharp"
                        : "star-outline"
                    }
                    size={windowWidth * 0.05}
                    color={star <= feedBack.feedBack.rate ? "#ffa500" : "#aaa"}
                    style={styles.star}
                  />
                </View>
              ))}
              <Text
                style={[
                  styles.detailTxt,
                  { color: "#505050", marginLeft: windowWidth * 0.01 },
                ]}
              >
                [{feedBack.feedBack.rate}]
              </Text>
            </View>
          </View>
        </View>
        <View style={{ justifyContent: "center" }}>
          <Text style={[styles.detailTxt, { marginRight: windowWidth * 0.03 }]}>
            {displayDate(feedBack.feedBack.createdAt)}
          </Text>
        </View>
      </View>
      <View style={styles.secondBox}>
        <Text style={[styles.detailTxt, { marginLeft: windowWidth * 0.03 }]}>
          {feedBack.feedBack.review}
        </Text>
      </View>
    </View>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({
  outerBox: {
    borderBottomColor: "#ccc",
    // backgroundColor: "#aaff",
    borderBottomWidth: windowWidth * 0.005,
    // paddingVertical: windowHeight * 0.002,
    marginBottom: windowHeight * 0.01,
  },
  firstBox: {
    // backgroundColor: "#aaff",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: windowHeight * 0.005,
    justifyContent: "space-between",
  },
  iconImage: {
    height: windowWidth * 0.1,
    width: windowWidth * 0.1,
    marginRight: windowWidth * 0.025,
    borderRadius: windowWidth * 0.1,
    padding: 0,
    alignSelf: "center",
  },
  customerBox: { flexDirection: "row" },
  customerNameTxt: {
    fontSize: windowWidth * 0.046,
    fontFamily: "NunitoSemiBold",
  },
  secondBox: {
    marginBottom: windowHeight * 0.01,
  },
  starContainer: {
    flexDirection: "row",
    justifyContent: "center",
    // marginVertical: windowHeight * 0.025,
    alignItems: "center",
  },
  star: {
    marginRight: windowWidth * 0.005,
  },
  detailTxt: {
    fontSize: windowWidth * 0.04,
    fontFamily: "NunitoRegular",
  },
});
