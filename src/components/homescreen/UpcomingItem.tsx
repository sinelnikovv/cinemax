import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { moderateScale } from "react-native-size-matters";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import Heart from "@assets/images/heart.svg";
import { Routes } from "@src/navigation/routes";
import { searchMovieResult } from "@src/store/types";
import { colors, fonts, hitSlop, layout } from "@src/theme";
import useFavoriteMovie from "@src/utils/firebase";
import { createPath, formattedDateForUpcoming } from "@src/utils/formatting";
import { navigate } from "@src/utils/navigation";

import RegularText from "../shared/RegularText";

const UpcomingItem = (item: searchMovieResult) => {
  const [isLoadedImg, setIsLoadedImg] = useState(false);
  const { favoriteMovies, toggleFavoriteMovie } = useFavoriteMovie();
  const isFavorite = favoriteMovies.some((movie) => movie.id === item.id);
  const toggleHandler = () => {
    toggleFavoriteMovie({
      id: item.id,
      title: item.title,
      poster_path: item.poster_path,
    });
  };
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
          uri: createPath(item.backdrop_path),
        }}
        width={layout.width - moderateScale(80)}
        height={moderateScale(165)}
        onLoadEnd={() => setIsLoadedImg(true)}
        style={isLoadedImg ? {} : { opacity: 0 }}
      />
      <TouchableOpacity
        hitSlop={hitSlop.hs8}
        onPress={() => toggleHandler()}
        style={styles.heart}
      >
        <Heart fill={isFavorite ? "red" : "transparent"} />
      </TouchableOpacity>
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
  heart: {
    position: "absolute",
    top: moderateScale(16),
    right: moderateScale(16),
  },
});
