import { Movie } from "@src/store/types";
import { colors, fonts, layout } from "@src/theme";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
import RegularText from "../shared/RegularText";
import { formattedDateForUpcoming } from "@src/utils/formatting";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useState } from "react";
import { navigate } from "@src/utils/navigation";
import { Routes } from "@src/navigation/routes";

const UpcomingItem = (item: Movie) => {
  const [isLoadedImg, setIsLoadedImg] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => navigate(Routes.Movie, { id: item.id })}
      style={styles.container}
    >
      {!isLoadedImg && (
        <SkeletonPlaceholder>
          <SkeletonPlaceholder.Item>
            <View
              style={{
                width: layout.width - moderateScale(80),
                height: moderateScale(165),
              }}
            ></View>
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      )}
      <Image
        resizeMode='cover'
        source={{
          uri: `https://image.tmdb.org/t/p/w780${item.backdrop_path}`,
        }}
        width={layout.width - moderateScale(80)}
        height={moderateScale(165)}
        onLoadEnd={() => setIsLoadedImg(true)}
        style={isLoadedImg ? {} : { opacity: 0 }}
      />
      <View style={styles.textBlock}>
        <RegularText style={styles.text} font={fonts.h4semibold}>
          {item.title}
        </RegularText>
        <RegularText style={styles.text}>
          {formattedDateForUpcoming(item.release_date)}
        </RegularText>
      </View>
    </TouchableOpacity>
  );
};

export default UpcomingItem;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderRadius: moderateScale(16),
    height: moderateScale(165),
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  textBlock: {
    position: "absolute",
    bottom: moderateScale(20),
    left: moderateScale(20),
    alignItems: "flex-start",
  },
  text: {
    textShadowColor: colors.black,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
});
