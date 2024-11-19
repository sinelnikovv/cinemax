import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { moderateScale } from "react-native-size-matters";

import { colors, hitSlop } from "@src/theme";

import RegularText from "./RegularText";

type Props = {
  children: React.ReactNode;
  type?: "filled" | "outlined" | "text";
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: ViewStyle;
  size?: "xsm" | "sm" | "md" | "lg" | "xlg";
  onPress: () => void;
  isLoading?: boolean;
};

const Button = ({
  children,
  type = "filled",
  textStyle,
  containerStyle,
  size = "md",
  onPress,
  isLoading,
}: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        type === "filled" && styles.filled,
        type === "outlined" && styles.outlined,
        size === "xsm" && styles.xsm,
        size === "sm" && styles.sm,
        size === "md" && styles.md,
        size === "lg" && styles.lg,
        size === "xlg" && styles.xlg,
        containerStyle,
      ]}
      onPress={onPress}
      hitSlop={hitSlop.hs5}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.dark} />
      ) : (
        <RegularText
          color={type === "filled" ? colors.white : colors.blue}
          style={textStyle}
        >
          {children}
        </RegularText>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(32),
    justifyContent: "center",
    alignItems: "center",
  },
  filled: {
    backgroundColor: colors.blue,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.blue,
  },
  xsm: {
    padding: moderateScale(4),
  },
  sm: {
    padding: moderateScale(8),
  },
  md: {
    padding: moderateScale(12),
  },
  lg: {
    padding: moderateScale(16),
  },
  xlg: {
    padding: moderateScale(18),
  },
});
