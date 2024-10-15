import React, { useMemo, useState } from "react";
import { TextInput as Input, StyleSheet } from "react-native";

import { moderateScale } from "react-native-size-matters";

import { colors, fonts } from "@src/theme";

import FormField from "./FormField";

export enum TextInputType {
  text = "default",
  email = "email-address",
  numeric = "numeric",
}

type Props = {
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  type?: TextInputType;
  placeholder?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  editable?: boolean;
  onEndEditing?: () => void;
};

const TextInput: React.FC<Props> = ({
  value,
  onChange,
  type,
  error,
  placeholder,
  onBlur = () => null,
  onFocus = () => null,
  editable = true,
  onEndEditing,
}) => {
  const [inFocus, setInFocus] = useState(false);

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
        keyboardType={type || TextInputType.text}
        onFocus={() => {
          setInFocus(true);
          onFocus();
        }}
        onBlur={() => {
          setInFocus(false);
          onBlur();
        }}
        value={value}
        onChangeText={onChange}
        editable={editable}
        style={{
          ...styles.textInput,
          color: textColor,
        }}
        {...(type === TextInputType.email
          ? {
              autoCapitalize: "none",
              autoCorrect: false,
              autoCompleteType: "email",
              importantForAutofill: "no",
            }
          : {})}
        onEndEditing={onEndEditing}
      />
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
