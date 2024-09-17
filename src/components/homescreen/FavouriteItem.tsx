import { FavouriteMovie } from "@src/store/types";
import { colors, fonts, hitSlop } from "@src/theme";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { moderateScale } from "react-native-size-matters";
import RegularText from "../shared/RegularText";
import { createPath } from "@src/utils/formatting";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useState } from "react";
import { navigate } from "@src/utils/navigation";
import { Routes } from "@src/navigation/routes";
import useFavoriteMovie from "@src/utils/firebase";
import Heart from "@assets/images/heart.svg";

const FavouriteItem = (item: FavouriteMovie) => {
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
            {item.title}
          </RegularText>
        </View>
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

export default FavouriteItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(8),
    overflow: "hidden",
    alignItems: "center",
    backgroundColor: colors.soft,
    flex: 1,
    width: moderateScale(135),
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
  heart: {
    position: "absolute",
    top: moderateScale(8),
    right: moderateScale(8),
  },
});
