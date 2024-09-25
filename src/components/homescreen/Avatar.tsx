import { StyleSheet, TouchableOpacity, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { colors, fonts } from "@src/theme";
import RegularText from "../shared/RegularText";
import Pen from "@assets/images/pen.svg";

type Props = {
  name: string;
  size?: number;
};

const Avatar = ({ name, size = 40 }: Props) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <View
      style={[
        styles.container,
        {
          width: moderateScale(size),
          height: moderateScale(size),
          borderRadius: moderateScale(size / 2),
        },
      ]}
    >
      <RegularText font={fonts.h5semibold}>{initials}</RegularText>

      <TouchableOpacity style={styles.edit}>
        <Pen />
      </TouchableOpacity>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
  },
  edit: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.soft,
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    position: "absolute",
    right: -5,
    bottom: -5,
  },
});
