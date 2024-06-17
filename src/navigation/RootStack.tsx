import { createStackNavigator } from "@react-navigation/stack";
import { Onboarding } from "../screens/Onboarding";
import { useAppSelector } from "../hooks/store";
import { isOnboardingShown } from "../store/slices/onboarding";
import AuthStack from "./AuthStack";
import MainBottomTab from "./MainBottomTab";
import { selectUser } from "../store/slices/user";

export type RootStackNavigatorParamList = {
  Onboarding: undefined;
  AuthStack: undefined;
  MainBottomTab: undefined;
};

const Stack = createStackNavigator<RootStackNavigatorParamList>();

const RootStack = () => {
  const isOnboardingDone = useAppSelector(isOnboardingShown);
  const userData = useAppSelector(selectUser);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isOnboardingDone && (
        <Stack.Screen name='Onboarding' component={Onboarding} />
      )}
      {userData.isAuth ? (
        <Stack.Screen name='MainBottomTab' component={MainBottomTab} />
      ) : (
        <Stack.Screen name='AuthStack' component={AuthStack} />
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
