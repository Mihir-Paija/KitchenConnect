import * as Font from "expo-font";
import {
  //   Nunito_200ExtraLight_Italic,
  //   Nunito_300Light_Italic,
  //   Nunito_400Regular_Italic,
  //   Nunito_600SemiBold_Italic,
  //   Nunito_700Bold_Italic,
  Nunito_800ExtraBold_Italic,
  Nunito_300Light,
  //   Nunito_200ExtraLight,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";

// const loadFonts = async () => {
//   return new Promise((resolve) => {
//     setTimeout(async () => {
//       await Font.loadAsync({
//         NunitoExtraLightItalic: Nunito_200ExtraLight_Italic,
//         NunitoLightItalic: Nunito_300Light_Italic,
//         NunitoRegularItalic: Nunito_400Regular_Italic,
//         NunitoSemiBoldItalic: Nunito_600SemiBold_Italic,
//         NunitoBoldItalic: Nunito_700Bold_Italic,
//         NunitoExtraBoldItalic: Nunito_800ExtraBold_Italic,
//         NunitoLight: Nunito_300Light,
//         NunitoExtraLight: Nunito_200ExtraLight,
//         NunitoRegular: Nunito_400Regular,
//         NunitoSemiBold: Nunito_600SemiBold,
//         NunitoBold: Nunito_700Bold,
//         NunitoExtraBold: Nunito_800ExtraBold,
//       });
//       resolve();
//     }, 3000); // Delay of 3 seconds
//   });
// };

const loadFonts = async () => {
  await Font.loadAsync({
    // NunitoExtraLightItalic: Nunito_200ExtraLight_Italic,
    // NunitoLightItalic: Nunito_300Light_Italic,
    // NunitoRegularItalic: Nunito_400Regular_Italic,
    // NunitoSemiBoldItalic: Nunito_600SemiBold_Italic,
    // NunitoBoldItalic: Nunito_700Bold_Italic,
    NunitoExtraBoldItalic: Nunito_800ExtraBold_Italic,
    NunitoLight: Nunito_300Light,
    // NunitoExtraLight: Nunito_200ExtraLight,
    NunitoRegular: Nunito_400Regular,
    NunitoSemiBold: Nunito_600SemiBold,
    NunitoBold: Nunito_700Bold,
    NunitoExtraBold: Nunito_800ExtraBold,
  });
};

export default loadFonts;
