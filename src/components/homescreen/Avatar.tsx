import { StyleSheet, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { colors, fonts } from "@src/theme";
import RegularText from "../shared/RegularText";

type Props = {
  name: string;
};

const Avatar = ({ name }: Props) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <View style={styles.container}>
      <RegularText font={fonts.h5semibold}>{initials}</RegularText>
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    height: moderateScale(40),
    width: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
  },
});
