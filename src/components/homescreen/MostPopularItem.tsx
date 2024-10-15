import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { BlurView } from "expo-blur";
import { moderateScale } from "react-native-size-matters";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import Heart from "@assets/images/heart.svg";
import { Routes } from "@src/navigation/routes";
import { useGetGenresQuery } from "@src/store/slices/apiSlice";
import { searchMovieResult } from "@src/store/types";
import { colors, fonts, hitSlop } from "@src/theme";
import useFavoriteMovie from "@src/utils/firebase";
import { createPath, genreIdToName } from "@src/utils/formatting";
import { navigate } from "@src/utils/navigation";

import RegularText from "../shared/RegularText";

const MostPopularItem = (item: searchMovieResult) => {
  const { data: allGenres } = useGetGenresQuery();
  const [isLoadedImg, setIsLoadedImg] = useState(false);
  const movieGenre = allGenres
    ? genreIdToName(allGenres, item.genre_ids[0])
    : "";
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
      style={styles.container}
      onPress={() => navigate(Routes.Movie, { id: item.id })}
    >
      <>
        {!isLoadedImg && (
          <View style={{ position: "absolute" }}>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item>
                <View style={styles.skeleton}></View>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        )}
        <Image
          resizeMode='cover'
          width={moderateScale(135)}
          height={moderateScale(178)}
          source={{
            uri: createPath(item.poster_path),
          }}
          onLoadEnd={() => setIsLoadedImg(true)}
        />
        <View style={styles.textBlock}>
          <RegularText
            font={fonts.h5semibold}
            numberOfLines={2}
            color={colors.white}
            textAlign='left'
            style={styles.title}
          >
            {item.original_title}
          </RegularText>
          <RegularText
            font={fonts.h7medium}
            color={colors.grey}
            textAlign='left'
          >
            {movieGenre}
          </RegularText>
        </View>
        <BlurView intensity={90} style={styles.rating}>
          <View style={{ flex: 1 }}>
            <RegularText
              font={fonts.h6semibold}
              color={colors.orange}
              textAlign='left'
            >
              ★ {item.vote_average.toFixed(1)}
            </RegularText>
          </View>
        </BlurView>
        <TouchableOpacity
          hitSlop={hitSlop.hs8}
          onPress={() => toggleHandler()}
          style={styles.heart}
        >
          <Heart fill={isFavorite ? "red" : "transparent"} />
        </TouchableOpacity>
      </>
    </TouchableOpacity>
  );
};

export default MostPopularItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(8),
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: colors.soft,
    flex: 1,
  },
  skeleton: {
    width: moderateScale(135),
    height: moderateScale(178),
  },
  textBlock: {
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(12),
    alignSelf: "stretch",
    flex: 1,
  },
  title: {
    marginBottom: moderateScale(4),
    flex: 1,
  },
  rating: {
    position: "absolute",
    top: moderateScale(8),
    left: moderateScale(8),
    paddingVertical: moderateScale(4),
    paddingHorizontal: moderateScale(8),
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: moderateScale(8),
  },
  heart: {
    position: "absolute",
    top: moderateScale(8),
    right: moderateScale(8),
  },
});
