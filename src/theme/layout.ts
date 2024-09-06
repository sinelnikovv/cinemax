import { Dimensions } from "react-native";
import Constants from "expo-constants";
import { initialWindowMetrics } from "react-native-safe-area-context";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const layout = {
  width: initialWindowMetrics?.frame.width || width,
  height: initialWindowMetrics?.frame.height || height,
  statusBarHeight:
    initialWindowMetrics?.insets.top || Constants.statusBarHeight,
};

export default layout;
