import { createStackNavigator } from "@react-navigation/stack";
import { useAppSelector } from "@src/hooks/store";
import { selectUser } from "@src/store/slices/user";
import MainBottomTab from "./MainBottomTab";
import AuthStack from "./AuthStack";
import { OnboardingScreen } from "@src/screens";
import { Routes } from "./routes";

export type RootStackNavigatorParamList = {
  [Routes.Onboarding]: undefined;
  AuthStack: undefined;
  MainBottomTab: undefined;
};

const Stack = createStackNavigator<RootStackNavigatorParamList>();

const RootStack = () => {
  const user = useAppSelector(selectUser);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!!user ? (
        <Stack.Screen name='MainBottomTab' component={MainBottomTab} />
      ) : (
        <>
          <Stack.Screen name={Routes.Onboarding} component={OnboardingScreen} />
          <Stack.Screen name='AuthStack' component={AuthStack} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
