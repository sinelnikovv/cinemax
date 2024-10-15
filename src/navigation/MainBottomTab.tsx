import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { HomeScreen } from "@src/screens";
import FavouritesScreen from "@src/screens/FavouritesScreen";
import SettingsScreen from "@src/screens/SettingsScreen";

import { Routes } from "./routes";
import TabBar from "./TabBar";

export type MainBottomTabNavigatorParamList = {
  [Routes.Home]: undefined;
  [Routes.Search]: undefined;
  [Routes.Favourites]: undefined;
  [Routes.Settings]: undefined;
};

const Tab = createBottomTabNavigator<MainBottomTabNavigatorParamList>();

const MainBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={Routes.Home}
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name={Routes.Home} component={HomeScreen} />
      <Tab.Screen name={Routes.Search} component={HomeScreen} />
      <Tab.Screen name={Routes.Favourites} component={FavouritesScreen} />
      <Tab.Screen name={Routes.Settings} component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MainBottomTabNavigator;
