import { useState } from "react";
import { StyleSheet, View } from "react-native";

import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { moderateScale } from "react-native-size-matters";

import Logo from "@assets/images/logo.svg";
import G from "@src/assets/images/G.svg";
import Button from "@src/components/shared/Button";
import RegularText from "@src/components/shared/RegularText";
import ScreenContainer from "@src/components/shared/ScreenContainer";
import { useAppDispatch } from "@src/hooks/store";
import { Routes } from "@src/navigation/routes";
import { setUser } from "@src/store/slices/user";
import { colors, fonts } from "@src/theme";
import { navigate } from "@src/utils/navigation";
const onGoogleButtonPress = async () => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  const signInResult = await GoogleSignin.signIn();
  const idToken = signInResult.data?.idToken;
  if (!idToken) {
    throw new Error("No ID token found");
  }
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  return auth().signInWithCredential(googleCredential);
};

const IntroScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

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
        <View style={styles.centerBlock}>
          <RegularText font={fonts.h5medium} color={colors.grey}>
            Already have an account?
          </RegularText>
          <Button
            containerStyle={{ paddingHorizontal: 8 }}
            type='text'
            size='xlg'
            onPress={() => navigate(Routes.Login)}
            isLoading={isLoading}
          >
            Login
          </Button>
        </View>
        <View style={{ alignItems: "center" }}>
          <View
            style={[
              styles.centerBlock,
              {
                padding: moderateScale(40),
              },
            ]}
          >
            <View style={styles.divider} />
            <RegularText style={fonts.h5semibold} color={colors.grey}>
              Or Sign up with
            </RegularText>
            <View style={styles.divider} />
          </View>
          <Button
            containerStyle={styles.gContainer}
            onPress={() => {
              setIsLoading(true);
              onGoogleButtonPress().then((data) => {
                dispatch(
                  setUser({
                    name: data.user.displayName,
                    email: data.user.email,
                    userId: data.user.uid,
                  }),
                );
                setIsLoading(false);
                navigate(Routes.Home);
              });
            }}
            isLoading={isLoading}
          >
            <G width={moderateScale(24)} height={moderateScale(24)} />
          </Button>
        </View>
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
  centerBlock: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  gContainer: {
    width: moderateScale(69),
    height: moderateScale(69),
    borderRadius: moderateScale(69),
    backgroundColor: colors.white,
  },
});
