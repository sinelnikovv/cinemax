import ScreenContainer from "../../components/ScreenContainer";
import Header from "../../components/Header";
import { goBack, navigate } from "../../navigation/utils";
import fonts from "../../theme/fonts";
import RegularText from "../../components/RegularText";
import { moderateScale } from "react-native-size-matters";
import { View } from "react-native";
import Button from "../../components/Button";

const CongratsPasswordScreen = () => {
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
            navigate("LoginScreen");
          }}
        >
          Go to Login Page
        </Button>
      </View>
    </ScreenContainer>
  );
};

export default CongratsPasswordScreen;
