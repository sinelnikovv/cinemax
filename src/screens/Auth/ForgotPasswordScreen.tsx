import ScreenContainer from "../../components/ScreenContainer";
import Header from "../../components/Header";
import { goBack, navigate } from "../../navigation/utils";
import fonts from "../../theme/fonts";
import RegularText from "../../components/RegularText";
import { moderateScale } from "react-native-size-matters";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { View, StyleSheet } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput, TextInputType } from "../../components/inputs";
import auth from "@react-native-firebase/auth";
import Button from "../../components/Button";
import { useState } from "react";
import { colors } from "../../theme";

type FormData = {
  email: string;
};

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPasswordScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    auth()
      .sendPasswordResetEmail(data.email)
      .then(() => {
        setIsLoading(false);
        navigate("CongratsPasswordScreen");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setError("User not found!");
          control.setError("email", {
            message: "error",
          });
        }
      });
  };

  return (
    <ScreenContainer
      scroll={true}
      header={<Header title='' onPress={() => goBack()} />}
    >
      <RegularText
        font={fonts.h2semibold}
        style={{ marginTop: moderateScale(40), marginBottom: moderateScale(8) }}
      >
        Reset Password
      </RegularText>
      <RegularText
        font={fonts.h6medium}
        style={{
          marginHorizontal: moderateScale(85),
          marginBottom: moderateScale(64),
        }}
      >
        Recover your account password
      </RegularText>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({ field: { ...field }, fieldState: { error } }) => (
            <TextInput
              {...field}
              placeholder='Email Address'
              type={TextInputType.email}
              error={error?.message}
            />
          )}
          name='email'
        />
        <Button
          isLoading={isLoading}
          size='lg'
          onPress={handleSubmit(onSubmit)}
        >
          Next
        </Button>
        {error ? (
          <RegularText
            textAlign='right'
            font={fonts.h6medium}
            color={colors.red}
            style={{ marginTop: moderateScale(5) }}
          >
            *{error}
          </RegularText>
        ) : (
          <></>
        )}
      </View>
    </ScreenContainer>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
