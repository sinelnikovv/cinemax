import { View, StyleSheet } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import auth from "@react-native-firebase/auth";
import { useAppDispatch } from "@src/hooks/store";
import { setUser } from "@src/store/slices/user";
import { fonts } from "@src/theme";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { moderateScale } from "react-native-size-matters";
import * as yup from "yup";
import { goBack, navigate } from "@src/utils/navigation";
import ScreenContainer from "@src/components/shared/ScreenContainer";
import Header from "@src/components/shared/Header";
import RegularText from "@src/components/shared/RegularText";
import {
  Checkbox,
  PasswordInput,
  TextInput,
  TextInputType,
} from "@src/components/shared/inputs";
import Button from "@src/components/shared/Button";
import { Routes } from "@src/navigation/routes";

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
        dispatch(
          setUser({
            name: auth().currentUser.displayName,
            email: auth().currentUser.email,
            userId: auth().currentUser.uid,
          }),
        );
        setIsLoading(false);
        navigate(Routes.Home);
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
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          render={({ field: { ref, ...field }, fieldState: { error } }) => (
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
        <Controller
          control={control}
          render={({
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            field: { ref, onChange, value, ...field },
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
  error: {
    color: "red",
  },
});
