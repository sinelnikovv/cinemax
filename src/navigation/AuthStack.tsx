import { createStackNavigator } from "@react-navigation/stack";
import IntroScreen from "../screens/Auth/IntroScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import ForgotPasswordScreen from "../screens/Auth/ForgotPasswordScreen";
import CongratsPasswordScreen from "../screens/Auth/CongratsPasswordScreen";

export type AuthStackNavigatorParamList = {
  IntroScreen: undefined;
  LoginScreen: undefined;
  SignUpScreen: undefined;
  ForgotPasswordScreen: undefined;
  CongratsPasswordScreen: undefined;
};

const Stack = createStackNavigator<AuthStackNavigatorParamList>();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='IntroScreen' component={IntroScreen} />
      <Stack.Screen name='LoginScreen' component={LoginScreen} />
      <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
      <Stack.Screen
        name='ForgotPasswordScreen'
        component={ForgotPasswordScreen}
      />
      <Stack.Screen
        name='CongratsPasswordScreen'
        component={CongratsPasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
