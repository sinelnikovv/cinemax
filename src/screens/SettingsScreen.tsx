import User from "@src/components/SettingsScreen/User";
import Button from "@src/components/shared/Button";
import ScreenContainer from "@src/components/shared/ScreenContainer";
import { StyleSheet, View } from "react-native";
import { colors } from "@src/theme";
import RegularText from "@src/components/shared/RegularText";
import { moderateScale } from "react-native-size-matters";
import SettingsItem from "@src/components/SettingsScreen/SettingsItem";
import UserIcon from "@src/assets/images/UserIcon";
import BellIcon from "@src/assets/images/bell.svg";
import { useState } from "react";
import LogoutModal from "@src/components/SettingsScreen/LogoutModal";

const SettingsScreen = () => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <ScreenContainer scroll={false}>
      <User />
      <View style={styles.container}>
        <RegularText textAlign='left'>Account</RegularText>
        <SettingsItem
          onPress={() => {
            console.log("pressed");
          }}
          title='Edit Profile'
          icon={<UserIcon color={colors.blue} />}
        />
      </View>
      <View style={[styles.container, { flex: 1 }]}>
        <RegularText textAlign='left'>General</RegularText>
        <SettingsItem
          onPress={() => {
            console.log("pressed");
          }}
          title='Notification'
          icon={<BellIcon color={colors.blue} />}
        />
      </View>
      <Button type='outlined' onPress={() => setIsShowModal(true)}>
        Log Out
      </Button>
      <LogoutModal isShow={isShowModal} setIsShow={setIsShowModal} />
    </ScreenContainer>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(16),
    borderWidth: 1,
    padding: moderateScale(16),
    borderColor: colors.soft,
    marginBottom: moderateScale(24),
  },
});
