import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/MainBottomTabNavigator/HomeScreen";

const Tab = createBottomTabNavigator();

export type MainBottomTabNavigatorParamList = {
  HomeScreen: undefined;
};

const MainBottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='HomeScreen'>
      <Tab.Screen name='HomeScreen' component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default MainBottomTabNavigator;
