import { useGetUpcomingQuery } from "@src/store/slices/upcomingSlice";
import { StyleSheet, View, ActivityIndicator, Animated } from "react-native";
import Carousel from "react-native-snap-carousel";
import { colors, layout } from "@src/theme";
import { moderateScale } from "react-native-size-matters";
import { ExpandingDot } from "react-native-animated-pagination-dots";
import { useRef } from "react";
import UpcomingItem from "./UpcomingItem";

const Upcoming = () => {
  const { data, isLoading } = useGetUpcomingQuery({ page: "1" });
  const dataToShow = data && data.results.slice(0, 5);

  const scrollX = useRef(new Animated.Value(0)).current;

  const handleBeforeSnapToItem = (index) => {
    const width = layout.width;
    const newValue = index * width;
    Animated.timing(scrollX, {
      toValue: newValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return isLoading ? (
    <View>
      <ActivityIndicator />
    </View>
  ) : (
    <View style={styles.container}>
      <Carousel
        data={dataToShow}
        keyExtractor={(data) => data.id.toString()}
        sliderWidth={layout.width}
        itemWidth={layout.width - moderateScale(80)}
        autoplay={false}
        autoplayInterval={5000}
        enableMomentum={false}
        lockScrollWhileSnapping={true}
        renderItem={({ item, index }) => (
          <UpcomingItem {...item} index={index} />
        )}
        onBeforeSnapToItem={handleBeforeSnapToItem}
      />
      <ExpandingDot
        containerStyle={styles.pagination}
        dotStyle={{ width: moderateScale(10), height: moderateScale(10) }}
        data={dataToShow}
        scrollX={scrollX}
        inActiveDotOpacity={0.4}
        inActiveDotColor={colors.blue}
        activeDotColor={colors.blue}
        expandingDotWidth={moderateScale(32)}
      />
    </View>
  );
};

export default Upcoming;

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(24),
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  pagination: {
    bottom: -moderateScale(26),
  },
});
