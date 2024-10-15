import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { yupResolver } from "@hookform/resolvers/yup";
import auth, { updateEmail, updatePassword } from "@react-native-firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { moderateScale } from "react-native-size-matters";
import * as yup from "yup";

import Avatar from "@src/components/homescreen/Avatar";
import Button from "@src/components/shared/Button";
import Header from "@src/components/shared/Header";
import {
  PasswordInput,
  TextInput,
  TextInputType,
} from "@src/components/shared/inputs";
import RegularText from "@src/components/shared/RegularText";
import ScreenContainer from "@src/components/shared/ScreenContainer";
import { useAppDispatch, useAppSelector } from "@src/hooks/store";
import { selectUser, setUser } from "@src/store/slices/user";
import { colors, fonts } from "@src/theme";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const EditProfileScreen = () => {
  const user = useAppSelector(selectUser);

  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string(),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name,
      email: user.email,
      password: "",
    },
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      user.email !== data.email &&
        (await updateEmail(auth().currentUser, data.email));
      user.name !== data.name &&
        (await auth().currentUser.updateProfile({
          displayName: data.name,
        }));
      !!data.password &&
        (await updatePassword(auth().currentUser, data.password));
    } catch (error) {
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
    }
    dispatch(
      setUser({
        name: auth().currentUser.displayName,
        email: auth().currentUser.email,
        userId: auth().currentUser.uid,
      }),
    );
    setIsLoading(false);
  };

  return (
    <ScreenContainer header={<Header title='Edit Profile' />}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <View style={styles.info}>
            <Avatar withEdit={true} size={72} />
            <RegularText font={fonts.h4semibold} style={styles.name}>
              {user.name}
            </RegularText>
            <RegularText font={fonts.h5medium} color={colors.whiteGrey}>
              {user.email}
            </RegularText>
          </View>
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
        </View>
        <Button
          isLoading={isLoading}
          size='lg'
          onPress={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </View>
    </ScreenContainer>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: moderateScale(24),
    flex: 1,
  },
  name: {
    marginTop: moderateScale(20),
    marginBottom: moderateScale(8),
  },
  info: {
    marginBottom: moderateScale(24),
    alignItems: "center",
  },
});
