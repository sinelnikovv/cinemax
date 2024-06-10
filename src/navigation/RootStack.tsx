import { createStackNavigator } from "@react-navigation/stack";
import { Onboarding } from "../screens/Onboarding";
import { useAppSelector } from "../hooks/store";
import { isOnboardingShown } from "../store/slices/onboarding";
import SignUp from "../screens/SignUp/SignUp";

export type RootStackNavigatorParamList = {
  Onboarding: undefined;
  SignUp: undefined;
};

const Stack = createStackNavigator<RootStackNavigatorParamList>();

const RootStack = () => {
  const IsOnboardingDone = useAppSelector(isOnboardingShown);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!IsOnboardingDone && (
        <Stack.Screen name='Onboarding' component={Onboarding} />
      )}
      <Stack.Screen name='SignUp' component={SignUp} />
    </Stack.Navigator>
  );
};

export default RootStack;
