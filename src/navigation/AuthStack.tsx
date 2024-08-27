import { createStackNavigator } from "@react-navigation/stack";
import {
  ResetPasswordScreen,
  ForgotPasswordScreen,
  IntroScreen,
  LoginScreen,
  SignUpScreen,
} from "@src/screens";
import { Routes } from "./routes";

export type AuthStackNavigatorParamList = {
  [Routes.Intro]: undefined;
  [Routes.Login]: undefined;
  [Routes.SignUp]: undefined;
  [Routes.ForgotPassword]: undefined;
  [Routes.ResetPassword]: undefined;
};

const Stack = createStackNavigator<AuthStackNavigatorParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={Routes.Intro} component={IntroScreen} />
      <Stack.Screen name={Routes.Login} component={LoginScreen} />
      <Stack.Screen name={Routes.SignUp} component={SignUpScreen} />
      <Stack.Screen
        name={Routes.ForgotPassword}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name={Routes.ResetPassword}
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
