import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { moderateScale } from "react-native-size-matters";

import SettingsIcon from "@src/assets/images/settingsIcon.svg";
import Filters from "@src/components/popularScreen/Filters";
import RegularText from "@src/components/shared/RegularText";
import ScreenContainer from "@src/components/shared/ScreenContainer";
import { discoverFilters } from "@src/store/types";
import { colors, hitSlop } from "@src/theme";

const PopularScreen = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<discoverFilters>({
    include_adult: true,
    sort_by: "popularity.desc",
  });

  // const { data } = useGetSearchMoviesQuery({
  //   ...appliedFilters,
  //   page: page,
  // });
  const heightOpen = moderateScale(400);
  const sharedHeight = useSharedValue(48);

  const animatedHeight = useAnimatedStyle(() => {
    return { height: sharedHeight.value };
  });

  useEffect(() => {
    if (isOpened) {
      sharedHeight.value = withTiming(heightOpen, { duration: 700 });
    }
    if (!isOpened) {
      sharedHeight.value = withTiming(48, { duration: 700 });
    }
  }, [isOpened]);

  return (
    <ScreenContainer scroll={false} background={colors.dark}>
      <Animated.View style={[animatedHeight, styles.container]}>
        <TouchableOpacity
          onPress={() => setIsOpened((prev) => !prev)}
          style={styles.settingsIcon}
          hitSlop={hitSlop.hs8}
        >
          <View style={styles.inputContainer}>
            <RegularText>Filters</RegularText>
            <SettingsIcon />
          </View>
        </TouchableOpacity>
        <View
          style={{
            bottom: 0,
            position: "absolute",
          }}
        >
          <Filters filters={filters} setFilters={setFilters} />
        </View>
      </Animated.View>
    </ScreenContainer>
  );
};

export default PopularScreen;

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(24),
    overflow: "hidden",
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: colors.soft,
    height: moderateScale(48),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    zIndex: 1,
    borderWidth: 1,
    borderRadius: moderateScale(24),
    borderColor: colors.dark,
  },
  settingsIcon: {
    paddingLeft: moderateScale(8),
    borderLeftColor: colors.darkGrey,
    borderLeftWidth: 1,
  },

  input: {
    marginLeft: moderateScale(8),
    color: colors.white,
    flex: 1,
  },
});
