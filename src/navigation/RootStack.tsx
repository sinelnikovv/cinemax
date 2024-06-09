import { createStackNavigator } from "@react-navigation/stack";
import { Onboarding } from "../screens/Onboarding";

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Onboarding' component={Onboarding} />
    </Stack.Navigator>
  );
};

export default RootStack;
