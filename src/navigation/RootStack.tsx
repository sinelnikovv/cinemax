import {
  createStackNavigator,
  StackScreenProps,
} from "@react-navigation/stack";

import { useAppSelector } from "@src/hooks/store";
import { MovieScreen, OnboardingScreen } from "@src/screens";
import EditProfileScreen from "@src/screens/EditProfileScreen";
import PopularScreen from "@src/screens/PopularScreen";
import { selectUser } from "@src/store/slices/user";

import AuthStack from "./AuthStack";
import MainBottomTab from "./MainBottomTab";
import { Routes } from "./routes";

export type RootStackNavigatorParamList = {
  [Routes.Onboarding]: undefined;
  AuthStack: undefined;
  MainBottomTab: undefined;
  [Routes.Movie]: {
    id: number;
  };
  [Routes.EditProfile]: undefined;
  [Routes.PopularScreen]: undefined;
};

export type RootStackNavigatorScreenProps<
  T extends keyof RootStackNavigatorParamList,
> = StackScreenProps<RootStackNavigatorParamList, T>;

const Stack = createStackNavigator<RootStackNavigatorParamList>();

const RootStack = () => {
  const user = useAppSelector(selectUser);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name={Routes.Onboarding} component={OnboardingScreen} />
          <Stack.Screen name={Routes.Auth} component={AuthStack} />
        </>
      ) : (
        <>
          <Stack.Screen name={Routes.MainBottomTab} component={MainBottomTab} />
          <Stack.Screen name={Routes.Movie} component={MovieScreen} />
          <Stack.Screen
            name={Routes.EditProfile}
            component={EditProfileScreen}
          />
          <Stack.Screen name={Routes.PopularScreen} component={PopularScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
