import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

import { useAnimatedStyle, withTiming } from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";

import { colors, fonts } from "@src/theme";

import InputError from "./InputError";
import RegularText from "../RegularText";

type Props = {
  color?: string;
  error?: string;
  children: JSX.Element[] | JSX.Element;
  placeholder?: string;
  isActive?: boolean;
  value?: string | boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

const FormField: React.FC<Props> = ({
  color,
  error,
  children,
  placeholder,
  isActive,
  value,
  containerStyle,
}) => {
  const placeholderStyle = useAnimatedStyle(() => {
    let topPosition;
    isActive
      ? (topPosition = withTiming(-10, { duration: 300 }))
      : !value
        ? (topPosition = withTiming(20, { duration: 300 }))
        : (topPosition = -10);

    return {
      top: topPosition,
    };
  });

  return (
    <View>
      <View
        style={[
          {
            ...styles.inputContainer,
            borderColor: color,
          },
          containerStyle && containerStyle,
        ]}
      >
        {placeholder && (
          <RegularText
            font={fonts.h6medium}
            style={[styles.placeholder, placeholderStyle]}
            color={colors.whiteGrey}
          >
            {placeholder}
          </RegularText>
        )}
        {children}
      </View>
      <InputError>{error !== "error" && error}</InputError>
    </View>
  );
};

export default FormField;

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(25),
    paddingHorizontal: moderateScale(15),
    flexDirection: "row",
    alignItems: "center",
  },
  placeholder: {
    backgroundColor: colors.dark,
    paddingHorizontal: moderateScale(5),
    position: "absolute",
    left: 10,
    fontSize: moderateScale(12),
  },
});
