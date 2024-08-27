import Button from "@src/components/shared/Button";
import Header from "@src/components/shared/Header";
import RegularText from "@src/components/shared/RegularText";
import ScreenContainer from "@src/components/shared/ScreenContainer";
import { Routes } from "@src/navigation/routes";
import { fonts } from "@src/theme";
import { goBack, navigate } from "@src/utils/navigation";
import { View } from "react-native";
import { moderateScale } from "react-native-size-matters";

const ResetPasswordScreen = () => {
  return (
    <ScreenContainer
      scroll={true}
      header={<Header title='' onPress={() => goBack()} />}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          marginBottom: moderateScale(40),
        }}
      >
        <RegularText
          font={fonts.h1semibold}
          style={{ marginBottom: moderateScale(8) }}
        >
          Congrats
        </RegularText>
        <RegularText
          font={fonts.h3medium}
          style={{
            marginHorizontal: moderateScale(85),
            marginBottom: moderateScale(64),
          }}
        >
          We have send you an email with a link to reset your password
        </RegularText>
        <Button
          size='xlg'
          onPress={() => {
            navigate(Routes.Login);
          }}
        >
          Go to Login Page
        </Button>
      </View>
    </ScreenContainer>
  );
};

export default ResetPasswordScreen;
