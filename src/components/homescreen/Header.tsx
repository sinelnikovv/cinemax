import { useAppSelector } from "@src/hooks/store";
import { selectUser } from "@src/store/slices/user";
import fonts from "@src/theme/fonts";
import { View, StyleSheet } from "react-native";
import { moderateScale } from "react-native-size-matters";
import RegularText from "../shared/RegularText";
import Avatar from "./Avatar";

const Header = () => {
  const user = useAppSelector(selectUser);

  return (
    <View style={styles.container}>
      <Avatar />
      <View style={styles.text}>
        <RegularText font={fonts.h4semibold} textAlign='left'>
          Hello, {user.name}
        </RegularText>
        <RegularText font={fonts.h5medium} textAlign='left'>
          Let`s choose film to watch
        </RegularText>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(8),
    marginBottom: moderateScale(32),
    marginHorizontal: moderateScale(16),
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: moderateScale(16),
  },
});
