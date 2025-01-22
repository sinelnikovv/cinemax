import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { moderateScale } from "react-native-size-matters";

import BellIcon from "@src/assets/images/bell.svg";
import LogoutModal from "@src/components/SettingsScreen/LogoutModal";
import SettingsItem from "@src/components/SettingsScreen/SettingsItem";
import User from "@src/components/SettingsScreen/User";
import Button from "@src/components/shared/Button";
import RegularText from "@src/components/shared/RegularText";
import ScreenContainer from "@src/components/shared/ScreenContainer";
import { useAppSelector } from "@src/hooks/store";
import { Routes } from "@src/navigation/routes";
import { selectUser } from "@src/store/slices/user";
import { colors } from "@src/theme";
import { navigate } from "@src/utils/navigation";

const SettingsScreen = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const user = useAppSelector(selectUser);

  return (
    <ScreenContainer scroll={false}>
      {user ? (
        <>
          <User />
          <View style={styles.container}>
            <RegularText textAlign='left'>General</RegularText>
            <SettingsItem
              onPress={() => {}}
              title='Notification'
              icon={<BellIcon color={colors.blue} />}
            />
          </View>
          <Button type='outlined' onPress={() => setIsShowModal(true)}>
            Log Out
          </Button>
          <LogoutModal isShow={isShowModal} setIsShow={setIsShowModal} />
        </>
      ) : (
        <Button type='filled' onPress={() => navigate(Routes.Auth)}>
          Sign In
        </Button>
      )}
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
    flex: 1,
  },
});
