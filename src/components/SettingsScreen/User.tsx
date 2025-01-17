import { StyleSheet, TouchableOpacity, View } from "react-native";

import { moderateScale } from "react-native-size-matters";

import EditIcon from "@assets/images/edit.svg";
import { useAppSelector } from "@src/hooks/store";
import { Routes } from "@src/navigation/routes";
import { selectUser } from "@src/store/slices/user";
import { colors } from "@src/theme";
import fonts from "@src/theme/fonts";
import { navigate } from "@src/utils/navigation";

import Avatar from "../homescreen/Avatar";
import RegularText from "../shared/RegularText";

const User = () => {
  const user = useAppSelector(selectUser);

  return (
    <View style={styles.container}>
      <Avatar />
      <View style={styles.text}>
        <RegularText font={fonts.h4semibold} textAlign='left'>
          {user?.name}
        </RegularText>
        <RegularText font={fonts.h5medium} textAlign='left'>
          {user?.email}
        </RegularText>
      </View>
      <TouchableOpacity onPress={() => navigate(Routes.EditProfile)}>
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
