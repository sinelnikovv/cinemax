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
  const topPositionActive = moderateScale(-27);
  const topPositionInactive = moderateScale(0);

  const placeholderStyle = useAnimatedStyle(() => {
    let topPosition;
    isActive
      ? (topPosition = withTiming(topPositionActive, { duration: 300 }))
      : !value
        ? (topPosition = withTiming(topPositionInactive, { duration: 300 }))
        : (topPosition = withTiming(topPositionActive, { duration: 300 }));

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
          <View style={styles.placeholderConatiner}>
            <RegularText
              font={fonts.h6medium}
              style={[styles.placeholder, placeholderStyle]}
              color={colors.whiteGrey}
            >
              {placeholder}
            </RegularText>
          </View>
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
  placeholderConatiner: {
    position: "absolute",
    height: "100%",
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  placeholder: {
    paddingHorizontal: moderateScale(5),
    fontSize: moderateScale(12),
    backgroundColor: colors.dark,
    left: 10,
  },
});
