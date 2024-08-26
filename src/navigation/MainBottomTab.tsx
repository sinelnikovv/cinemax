import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import TabBar from "./TabBar";
import { HomeScreen } from "@src/screens";

const Tab = createBottomTabNavigator();

export type MainBottomTabNavigatorParamList = {
  Home: undefined;
  Search: undefined;
  Favourites: undefined;
  Settings: undefined;
};

const MainBottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Search' component={HomeScreen} />
      <Tab.Screen name='Favourites' component={HomeScreen} />
      <Tab.Screen name='Settings' component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default MainBottomTabNavigator;
