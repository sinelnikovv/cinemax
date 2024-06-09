import { StyleProp, TextStyle, Text } from "react-native";
import { colors } from "../theme";
import fonts from "../theme/fonts";
type Props = {
  font: {
    color: string;
    fontFamily: string;
    fontSize: number;
  };
  color?: string;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  children: React.ReactNode | JSX.Element[] | JSX.Element;
  style?: StyleProp<TextStyle>;
};
const TextCustom = ({
  font = fonts.regular14,
  color = colors.white,
  textAlign = "center",
  children,
  style,
}: Props) => {
  return (
    <Text
      style={[
        font,
        {
          color: color,
          textAlign: textAlign,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default TextCustom;
