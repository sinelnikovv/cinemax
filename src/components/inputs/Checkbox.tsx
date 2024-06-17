import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { colors, hitSlop } from "../../theme";
import { moderateScale } from "react-native-size-matters";
import FormField from "./FormField";
import { useMemo } from "react";

type Props = {
  type?: "rounded" | "squared";
  value: boolean;
  error?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  onChange: () => void;
  label: JSX.Element;
};

const Checkbox = ({
  type = "rounded",
  value,
  disabled = false,
  style,
  error,
  onChange,
  label,
}: Props) => {
  const color = useMemo(() => (error ? colors.red : colors.grey), [error]);
  return (
    <FormField
      value={value}
      error={error}
      containerStyle={{ borderWidth: 0, paddingHorizontal: 5 }}
    >
      <TouchableOpacity
        hitSlop={hitSlop.hs8}
        onPress={onChange}
        style={[{ marginRight: moderateScale(5) }, style && style]}
      >
        {type === "rounded" ? (
          <View
            style={[
              styles.rounded,
              disabled && styles.disabled,
              { borderColor: color },
            ]}
          >
            {value && !disabled ? <View style={styles.roundedCheck} /> : <></>}
          </View>
        ) : (
          <View style={styles.squared}>
            {value && !disabled ? <View style={styles.squaredCheck} /> : <></>}
          </View>
        )}
      </TouchableOpacity>
      {label}
    </FormField>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  rounded: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(12),
    borderColor: colors.whiteGrey,
    borderWidth: moderateScale(1),
    alignItems: "center",
    justifyContent: "center",
  },
  roundedCheck: {
    width: moderateScale(16),
    height: moderateScale(16),
    borderRadius: moderateScale(8),
    backgroundColor: colors.blue,
  },
  squared: {
    width: moderateScale(24),
    height: moderateScale(24),
    borderRadius: moderateScale(4),
    borderColor: colors.whiteGrey,
    borderWidth: moderateScale(1),
    alignItems: "center",
    justifyContent: "center",
  },
  squaredCheck: {
    width: moderateScale(16),
    height: moderateScale(16),
    borderRadius: moderateScale(2),
    backgroundColor: colors.blue,
  },
  disabled: {
    backgroundColor: colors.grey,
  },
});
