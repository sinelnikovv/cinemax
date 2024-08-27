import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./TabBar";
import { HomeScreen } from "@src/screens";
import { Routes } from "./routes";

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
      <Tab.Screen name={Routes.Favourites} component={HomeScreen} />
      <Tab.Screen name={Routes.Settings} component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default MainBottomTabNavigator;
