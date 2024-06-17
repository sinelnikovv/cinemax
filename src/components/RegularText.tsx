import { StyleProp, TextStyle } from "react-native";
import { colors } from "../theme";
import fonts from "../theme/fonts";
import Animated from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";
type Props = {
  font?: {
    color: string;
    fontFamily: string;
    fontSize: number;
  };
  color?: string;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  children: React.ReactNode | JSX.Element[] | JSX.Element;
  style?: StyleProp<TextStyle>;
  size?: number;
};
const RegularText = ({
  font = fonts.h5regular,
  color = colors.white,
  textAlign = "center",
  children,
  style,
  size,
}: Props) => {
  return (
    <Animated.Text
      style={[
        font,
        style,
        {
          color: color,
          textAlign: textAlign,
        },
        size && { fontSize: moderateScale(size) },
      ]}
    >
      {children}
    </Animated.Text>
  );
};

export default RegularText;
