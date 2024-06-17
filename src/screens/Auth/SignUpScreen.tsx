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
import Checkbox from "../../components/inputs/Checkbox";
import Button from "../../components/Button";
import { setUser } from "../../store/slices/user";
import { useAppDispatch } from "../../hooks/store";
import { useState } from "react";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  checkbox: yup.boolean().oneOf([true], "You must accept the terms"),
});

const SignUpScreen = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then(() =>
        auth().currentUser.updateProfile({
          displayName: data.name,
        }),
      )
      .then(() => {
        auth().currentUser &&
          dispatch(
            setUser({
              name: auth().currentUser?.displayName,
              email: auth().currentUser?.email,
              auth: true,
            }),
          );
        setIsLoading(false);
        navigate("MainBottomTab");
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          control.setError("email", {
            message: "That email address is already in use!",
          });
        }
        if (error.code === "auth/invalid-email") {
          control.setError("email", {
            message: "That email address is invalid!",
          });
        }
      });
  };

  return (
    <ScreenContainer
      scroll={true}
      header={<Header title='Sign Up' onPress={() => goBack()} />}
    >
      <RegularText
        font={fonts.h2semibold}
        style={{ marginTop: moderateScale(40), marginBottom: moderateScale(8) }}
      >
        Let’s get started
      </RegularText>
      <RegularText
        font={fonts.h6medium}
        style={{
          marginHorizontal: moderateScale(85),
          marginBottom: moderateScale(64),
        }}
      >
        The latest movies and series are here
      </RegularText>
      <View style={styles.container}>
        <Controller
          control={control}
          render={({ field: { ...field }, fieldState: { error } }) => (
            <TextInput
              {...field}
              placeholder='Full name'
              type={TextInputType.text}
              error={error?.message}
            />
          )}
          name='name'
        />
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

        <Controller
          control={control}
          render={({
            field: { onChange, value, ...field },
            fieldState: { error },
          }) => (
            <View style={{ flexDirection: "row" }}>
              <Checkbox
                value={value}
                onChange={() => onChange(!value)}
                type='squared'
                {...field}
                error={error?.message}
                label={
                  <RegularText
                    textAlign='left'
                    font={fonts.h6medium}
                    style={styles.error}
                  >
                    I agree to the Terms and Services and Privacy Policy
                  </RegularText>
                }
              />
            </View>
          )}
          name='checkbox'
        />

        <Button
          isLoading={isLoading}
          size='lg'
          onPress={handleSubmit(onSubmit)}
        >
          Sign Up
        </Button>
      </View>
    </ScreenContainer>
  );
};

export default SignUpScreen;

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
