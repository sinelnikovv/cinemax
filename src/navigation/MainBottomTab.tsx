import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/MainBottomTabNavigator/HomeScreen";
import TabBar from "./TabBar";

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
    >
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Search' component={HomeScreen} />
      <Tab.Screen name='Favourites' component={HomeScreen} />
      <Tab.Screen name='Settings' component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default MainBottomTabNavigator;
