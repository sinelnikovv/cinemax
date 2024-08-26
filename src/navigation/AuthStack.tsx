import { createStackNavigator } from "@react-navigation/stack";
import {
  CongratsPasswordScreen,
  ForgotPasswordScreen,
  IntroScreen,
  LoginScreen,
  SignUpScreen,
} from "@src/screens";

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
