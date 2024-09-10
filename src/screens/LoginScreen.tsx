import { moderateScale } from "react-native-size-matters";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { View, StyleSheet } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import auth from "@react-native-firebase/auth";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@src/hooks/store";
import { selectUser, setUser } from "@src/store/slices/user";
import { colors, fonts } from "@src/theme";
import { goBack, navigate } from "@src/utils/navigation";
import ScreenContainer from "@src/components/shared/ScreenContainer";
import Header from "@src/components/shared/Header";
import RegularText from "@src/components/shared/RegularText";
import {
  PasswordInput,
  TextInput,
  TextInputType,
} from "@src/components/shared/inputs";
import Button from "@src/components/shared/Button";
import { Routes } from "@src/navigation/routes";

type FormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((data) => {
        dispatch(
          setUser({
            name: data.user.displayName,
            email: data.user.email,
            userId: data.user.uid,
          }),
        );
        setIsLoading(false);
        navigate(Routes.Home);
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.code === "auth/invalid-credential") {
          setError("Check email or password!");
          control.setError("email", {
            message: "error",
          });
          control.setError("password", {
            message: "error",
          });
        }
        if (error.code === "auth/too-many-requests") {
          setError("Too many requests, try again later!");
        } else {
          setError("Something went wrong, try later!");
        }
      });
  };

  return (
    <ScreenContainer
      scroll={true}
      header={<Header title='Login' onPress={() => goBack()} />}
    >
      <RegularText
        font={fonts.h2semibold}
        style={{ marginTop: moderateScale(40), marginBottom: moderateScale(8) }}
      >
        {user?.name ? `Hi, ${user.name}` : "Hi there!"}
      </RegularText>
      <RegularText
        font={fonts.h6medium}
        style={{
          marginHorizontal: moderateScale(85),
          marginBottom: moderateScale(64),
        }}
      >
        Welcome back! Please enter your details.
      </RegularText>
      <View style={styles.container}>
        <Controller
          control={control}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <TextInput
              {...field}
              placeholder='Email Address'
              type={TextInputType.email}
              error={error?.message}
            />
          )}
          name='email'
        />
        <Controller
          control={control}
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
            <PasswordInput
              {...field}
              placeholder='Password'
              error={error?.message}
            />
          )}
          name='password'
        />
        <Button
          type='text'
          textStyle={[fonts.h6medium]}
          containerStyle={{
            alignSelf: "flex-end",
            marginTop: -moderateScale(16),
          }}
          onPress={() => navigate(Routes.ForgotPassword)}
        >
          Forgot Password?
        </Button>
        <Button
          isLoading={isLoading}
          size='lg'
          onPress={handleSubmit(onSubmit)}
        >
          Login
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

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
