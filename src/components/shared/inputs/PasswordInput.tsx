import React, { useMemo, useState } from "react";
import { TextInput as Input, TouchableOpacity, StyleSheet } from "react-native";
import OpenedEye from "@assets/images/openedEye.svg";
import ClosedEye from "@assets/images/closedEye.svg";
import { colors, fonts, hitSlop } from "@src/theme";
import FormField from "./FormField";
import { moderateScale } from "react-native-size-matters";

type Props = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  onBlur?: () => void;
};

const TextInput: React.FC<Props> = ({
  value,
  onChange,
  error,
  placeholder,
  onBlur = () => null,
}) => {
  const [inFocus, setInFocus] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const color = useMemo(
    () => (error ? colors.red : colors.grey),
    [inFocus, error],
  );
  const textColor = useMemo(
    () => (error ? colors.red : colors.whiteGrey),
    [inFocus, error],
  );

  return (
    <FormField
      value={value}
      color={color}
      error={error}
      placeholder={placeholder}
      isActive={inFocus}
    >
      <Input
        secureTextEntry={!showPassword}
        onFocus={() => setInFocus(true)}
        onBlur={() => {
          setInFocus(false);
          onBlur();
        }}
        value={value}
        onChangeText={onChange}
        style={{
          ...styles.textInput,
          color: textColor,
        }}
        importantForAutofill='no'
      />
      <TouchableOpacity
        accessibilityLabel='Show and Hide Passwords Button'
        hitSlop={{ ...hitSlop.hs8 }}
        onPress={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <OpenedEye
            width={moderateScale(21)}
            height={moderateScale(19)}
            color={color}
          />
        ) : (
          <ClosedEye
            width={moderateScale(21)}
            height={moderateScale(19)}
            color={color}
          />
        )}
      </TouchableOpacity>
    </FormField>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  textInput: {
    ...fonts.h5medium,
    flex: 1,
    textAlignVertical: "center",
    alignItems: "center",
    color: colors.grey,
    paddingVertical: moderateScale(18),
  },
});
