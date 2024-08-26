import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import UserIcon from "@assets/images/UserIcon";
import HomeIcon from "@assets/images/HomeIcon";
import SearchIcon from "@assets/images/SearchIcon";
import FavouritesIcon from "@assets/images/FavouritesIcon";
import { colors } from "@src/theme";
import RegularText from "@src/components/shared/RegularText";
import { navigate } from "@src/utils/navigation";

const TabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const translateX = useSharedValue(0);

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  const insets = useSafeAreaInsets();

  translateX.value = withTiming(state.index * 120, {
    duration: 300,
  });

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: colors.dark,
        paddingTop: moderateScale(16),
        paddingBottom: insets.bottom,
        paddingHorizontal: moderateScale(20),
        position: "relative",
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigate(route.name);
          }
        };

        const tabStyle = useAnimatedStyle(() => ({
          backgroundColor: withTiming(isFocused ? colors.soft : "transparent", {
            duration: 300,
          }),
          width: withTiming(isFocused ? 120 : 20, { duration: 300 }),
        }));

        const labelStyle = useAnimatedStyle(() => ({
          opacity: withTiming(isFocused ? 1 : 0, { duration: 300 }),
          transform: [
            {
              translateX: withTiming(isFocused ? 0 : -20, {
                duration: 300,
              }),
            },
          ],
        }));

        const iconColor = isFocused ? colors.blue : colors.grey;

        return (
          <TouchableOpacity
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tabButton}
            key={route.name}
          >
            <Animated.View style={[styles.tab, tabStyle]}>
              {route.name === "Home" && <HomeIcon color={iconColor} />}
              {route.name === "Search" && <SearchIcon color={iconColor} />}
              {route.name === "Favourites" && (
                <FavouritesIcon color={iconColor} />
              )}
              {route.name === "Settings" && <UserIcon color={iconColor} />}
              <Animated.View style={[labelStyle, { justifyContent: "center" }]}>
                <RegularText
                  color={colors.blue}
                  style={{
                    marginHorizontal: moderateScale(5),
                    maxHeight: 20,
                  }}
                >
                  {label}
                </RegularText>
              </Animated.View>
            </Animated.View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    flex: 1,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(15),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
  },
});

export default TabBar;
