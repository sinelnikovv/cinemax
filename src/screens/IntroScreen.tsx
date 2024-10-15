import { StyleSheet, View } from "react-native";

import { moderateScale } from "react-native-size-matters";

import Logo from "@assets/images/logo.svg";
import Button from "@src/components/shared/Button";
import RegularText from "@src/components/shared/RegularText";
import ScreenContainer from "@src/components/shared/ScreenContainer";
import { Routes } from "@src/navigation/routes";
import { colors, fonts } from "@src/theme";
import { navigate } from "@src/utils/navigation";

const IntroScreen = () => {
  return (
    <ScreenContainer
      scroll={false}
      enableKeyboardAvoidView={false}
      background={colors.black}
    >
      <View style={{ justifyContent: "center", flex: 1 }}>
        <View style={styles.top}>
          <Logo
            width={moderateScale(88)}
            style={{ marginBottom: moderateScale(24) }}
          />
          <RegularText
            font={fonts.h1semibold}
            style={{ marginBottom: moderateScale(8) }}
          >
            CINEMAX
          </RegularText>
          <RegularText font={fonts.h5semibold} color={colors.grey}>
            Enter your registered Phone Number to Sign Up
          </RegularText>
        </View>
        <Button
          onPress={() => navigate(Routes.SignUp)}
          containerStyle={styles.btn}
          size='xlg'
        >
          Sign Up
        </Button>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: moderateScale(32),
          }}
        >
          <RegularText font={fonts.h5medium} color={colors.grey}>
            Already have an account?
          </RegularText>
          <Button
            containerStyle={{ paddingHorizontal: 8 }}
            type='text'
            size='xlg'
            onPress={() => navigate(Routes.Login)}
          >
            Login
          </Button>
        </View>
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: moderateScale(40),
          }}
        >
          <View style={styles.divider} />
          <RegularText style={fonts.semibold16} color={colors.grey}>
            Or Sign up with
          </RegularText>
          <View style={styles.divider} />
        </View> */}
      </View>
    </ScreenContainer>
  );
};

export default IntroScreen;

const styles = StyleSheet.create({
  top: {
    alignItems: "center",
    paddingHorizontal: moderateScale(40),
    marginBottom: moderateScale(64),
  },
  btn: {
    marginBottom: moderateScale(16),
  },
  divider: {
    height: 1,
    backgroundColor: colors.grey,
    flex: 1,
    marginHorizontal: moderateScale(8),
  },
});
