import React from "react";
import { StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { colors, fonts } from "@src/theme";
import RegularText from "../RegularText";

type Props = { children?: string | null; size?: number };

const InputError: React.FC<Props> = ({
  children,
  size = moderateScale(12),
}) => (
  <View style={[styles.errorMessageContainer, { height: size }]}>
    {!!children && (
      <RegularText
        font={fonts.h6medium}
        color={colors.red}
        style={[styles.errorMessage, { fontSize: size, lineHeight: size }]}
      >
        *{children}
      </RegularText>
    )}
  </View>
);

export default InputError;

const styles = StyleSheet.create({
  errorMessageContainer: {
    marginVertical: moderateScale(8),
    marginLeft: moderateScale(16),
    height: moderateScale(9),
    alignItems: "flex-start",
  },
  errorMessage: {
    lineHeight: 12,
  },
});
