import { useGetGenresQuery } from "@src/store/slices/genresSlice";
import { useGetImageQuery } from "@src/store/slices/imageSlice";
import { searchMovieResult } from "@src/store/types";
import { colors, fonts } from "@src/theme";
import { BlurView } from "expo-blur";
import { StyleSheet, View, Image } from "react-native";
import { moderateScale } from "react-native-size-matters";
import RegularText from "../shared/RegularText";
import { genreIdToName } from "@src/utils/formatting";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useState } from "react";

const MostPopularItem = (item: searchMovieResult) => {
  const { data: allGenres } = useGetGenresQuery();
  const { data, isLoading } = useGetImageQuery({ id: item.id });
  const [isLoadedImg, setIsLoadedImg] = useState(false);

  return (
    <View style={styles.container}>
      {!isLoading ? (
        <>
          {!isLoadedImg && (
            <View style={{ position: "absolute" }}>
              <SkeletonPlaceholder>
                <SkeletonPlaceholder.Item>
                  <View
                    style={{
                      width: moderateScale(135),
                      height: moderateScale(178),
                    }}
                  ></View>
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            </View>
          )}
          <Image
            resizeMode='cover'
            width={moderateScale(135)}
            height={moderateScale(178)}
            source={{
              uri: `https://image.tmdb.org/t/p/w780${data.posters[0].file_path}`,
            }}
            onLoadEnd={() => setIsLoadedImg(true)}
            style={isLoadedImg ? {} : { opacity: 0 }}
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
              {genreIdToName(allGenres, item.genre_ids[0])}
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
        </>
      ) : null}
    </View>
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
    right: moderateScale(8),
    paddingVertical: moderateScale(4),
    paddingHorizontal: moderateScale(8),
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: moderateScale(8),
  },
});
