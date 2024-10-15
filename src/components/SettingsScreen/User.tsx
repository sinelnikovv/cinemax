import { useAppSelector } from "@src/hooks/store";
import { selectUser } from "@src/store/slices/user";
import fonts from "@src/theme/fonts";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
import RegularText from "../shared/RegularText";
import Avatar from "../homescreen/Avatar";
import { colors } from "@src/theme";
import EditIcon from "@assets/images/edit.svg";
const User = () => {
  const user = useAppSelector(selectUser);

  return (
    <View style={styles.container}>
      <Avatar />
      <View style={styles.text}>
        <RegularText font={fonts.h4semibold} textAlign='left'>
          {user.name}
        </RegularText>
        <RegularText font={fonts.h5medium} textAlign='left'>
          {user.email}
        </RegularText>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log("edit");
        }}
      >
        <EditIcon />
      </TouchableOpacity>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(16),
    borderWidth: 1,
    padding: moderateScale(16),
    borderColor: colors.soft,
    marginTop: moderateScale(8),
    marginBottom: moderateScale(32),
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginLeft: moderateScale(16),
    flex: 1,
  },
});
