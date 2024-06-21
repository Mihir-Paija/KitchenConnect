import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Linking,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import { windowWidth, windowHeight } from "@/utils/dimensions";
import BackButtonComponent from "@/components/shared/BackButton";
import DownButton from "../../components/shared/DownButton";
import UpButton from "../../components/shared/UpButton";
import { ScrollView } from "react-native-gesture-handler";

const AccordionItem = ({ label, content, isOpen, onPress, isLink }) => {
  const handleLinkPress = () => {
    if (isLink) {
      Linking.openURL(content);
    }
  };
  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.accordionHeader,
          isOpen ? { backgroundColor: "#e9e9e9" } : null,
        ]}
      >
        <Text style={styles.labelText}>{label}</Text>
        {isOpen ? <UpButton /> : <DownButton />}
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.accordionContent}>
          {isLink ? (
            <Text style={styles.linkText} onPress={handleLinkPress}>
              {content}
            </Text>
          ) : (
            <Text style={styles.contentText}>{content}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const AboutScreen = ({ navigation }) => {
  const [authState, setAuthState] = useContext(AuthContext);
  const [expandedSections, setExpandedSections] = useState({
    KitchenConnect: false,
    version: false,
    author: false,
    customerSupport: false,
    contactInformation: false,
    GitHub: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  //functions
  const backHandler = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {authState.authToken ? (
        <>
          <BackButtonComponent onPress={backHandler} screenTitle={"About"} />
          <ScrollView style={{ marginTop: windowHeight * 0.02 }}>
            <AccordionItem
              label="KitchenConnect"
              content="Through this cross-platform application, we aim to create a central hub for tiffin services. An online marketplace where local tiffin sellers can easily list their offerings, including menus and pricing. They could offer pay-and-eat or subscriptions (monthly, quarterly). On the other side, customers can browse through the nearby tiffin services. They could see their menus, read the reviews, and choose something that suits them. Through this system, we wish to help tiffin services expand their reach and give consumers more options to experience the goodness of home-cooked meals."
              isOpen={expandedSections.KitchenConnect}
              onPress={() => toggleSection("KitchenConnect")}
            />
            <AccordionItem
              label="Customer Support"
              content="For support or inquiries, please contact us at support@kitchenconnect.com or call us at +1234567890."
              isOpen={expandedSections.customerSupport}
              onPress={() => toggleSection("customerSupport")}
            />
            <AccordionItem
              label="App Version"
              content="1.0.0"
              isOpen={expandedSections.version}
              onPress={() => toggleSection("version")}
            />
            <AccordionItem
              label="Author"
              content={`Team Phoenix:\n\tMihir Paija (202101205@daiict.ac.in)\n\tDhruv Shah (202101208@daiict.ac.in)`}
              isOpen={expandedSections.author}
              onPress={() => toggleSection("author")}
            />
            <AccordionItem
              label="GitHub"
              content={`https://github.com/Mihir-Paija/KitchenConnect`}
              isOpen={expandedSections.GitHub}
              onPress={() => toggleSection("GitHub")}
              isLink={true}
            />
          </ScrollView>
        </>
      ) : (
        <Text>You are not authorized to access this screen.</Text>
      )}
    </SafeAreaView>
  );
};

export default AboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight * 1.2 : 0,
  },
  accordionItem: {
    width: windowWidth * 0.95,
    alignSelf: "center",
    marginVertical: windowHeight * 0.005,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: windowWidth * 0.03,
    paddingVertical: windowHeight * 0.015,
  },
  accordionContent: {
    paddingHorizontal: windowWidth * 0.04,
    paddingVertical: windowHeight * 0.015,
  },
  labelText: {
    fontFamily: "NunitoSemiBold",
    fontSize: windowWidth * 0.045,
  },
  contentText: {
    fontFamily: "NunitoSemiBold",
    fontSize: windowWidth * 0.035,
    color: "#505050",
  },
  linkText: {
    fontFamily: "NunitoSemiBold",
    fontSize: windowWidth * 0.035,
    color: "blue",
    textDecorationLine: "underline",
  },
});
