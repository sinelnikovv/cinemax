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
import {
  PasswordInput,
  TextInput,
  TextInputType,
} from "../../components/inputs";
import auth from "@react-native-firebase/auth";
import Button from "../../components/Button";
import { useState } from "react";
import { colors } from "../../theme";
import { selectUser, setUser } from "../../store/slices/user";
import { useAppDispatch, useAppSelector } from "../../hooks/store";

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
      .then(() => {
        auth().currentUser &&
          dispatch(
            setUser({
              name: auth().currentUser?.displayName,
              email: auth().currentUser?.email,
            }),
          );
        setIsLoading(false);
        navigate("MainBottomTab");
      })
      .catch((error) => {
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
        {user.name ? `Hi, ${user.name}` : "Hi there!"}
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
        <Controller
          control={control}
          render={({ field: { ...field }, fieldState: { error } }) => (
            <PasswordInput
              {...field}
              placeholder='Password'
              error={error?.message}
            />
          )}
          name='password'
        />

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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  error: {
    color: "red",
  },
});
