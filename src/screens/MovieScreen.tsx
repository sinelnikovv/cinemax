import { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { moderateScale } from "react-native-size-matters";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

import Back from "@assets/images/arrowBack.svg";
import Calendar from "@assets/images/calendar.svg";
import Clock from "@assets/images/clock.svg";
import Cube from "@assets/images/cube.svg";
import Heart from "@assets/images/heart.svg";
import ShareIcon from "@assets/images/share.svg";
import CastItem from "@src/components/MovieScreen/CastItem";
import Loader from "@src/components/shared/Loader";
import RegularText from "@src/components/shared/RegularText";
import ScreenContainer from "@src/components/shared/ScreenContainer";
import { RootStackNavigatorScreenProps } from "@src/navigation/RootStack";
import { Routes } from "@src/navigation/routes";
import {
  useGetCastQuery,
  useGetMovieDetailsQuery,
} from "@src/store/slices/apiSlice";
import { MovieResponseType } from "@src/store/types";
import { colors, fonts, hitSlop, layout } from "@src/theme";
import useFavoriteMovie from "@src/utils/firebase";
import { createPath } from "@src/utils/formatting";
import { navigate } from "@src/utils/navigation";

type Props = RootStackNavigatorScreenProps<Routes.Movie>;

const MovieScreen = ({ route }: Props) => {
  const [isLoadedImg, setIsLoadedImg] = useState(false);
  const id = route.params.id;
  const { data: movie, isLoading: isLoadingMovie } = useGetMovieDetailsQuery({
    id,
  });
  const { data: cast, isLoading: isLoadingCast } = useGetCastQuery({
    id,
  });
  const { favoriteMovies, toggleFavoriteMovie } = useFavoriteMovie();
  const isFavorite = favoriteMovies.some((movie) => movie.id === id);

  const toggleHandler = (item: MovieResponseType) => {
    toggleFavoriteMovie({
      id: item.id,
      title: item.title,
      poster_path: item.poster_path,
    });
  };

  const shareMovie = () => {
    Share.share({
      message: `https://cinemax.com/movie/${id}`,
    });
  };

  return (
    <ScreenContainer useInsets={false} sideBorder={false}>
      {isLoadingMovie ? (
        <Loader isShow={true} />
      ) : (
        <>
          <View style={styles.topContainer}>
            <ImageBackground
              source={{
                uri: createPath(movie.poster_path),
              }}
              style={[styles.bgImg, styles.gradient]}
              resizeMode='cover'
            />
            <LinearGradient
              style={styles.gradient}
              colors={["#1F1D2B14", "#1F1D2BFF"]}
            />
            <View style={styles.header}>
              <TouchableOpacity
                hitSlop={hitSlop.hs8}
                onPress={() =>
                  navigate(Routes.MainBottomTab, {
                    screen: Routes.Home,
                  })
                }
              >
                <Back />
              </TouchableOpacity>
              <RegularText
                style={{ paddingHorizontal: moderateScale(16), flex: 1 }}
                numberOfLines={1}
                font={fonts.h4semibold}
              >
                {movie.title}
              </RegularText>
              <View
                style={{
                  flexDirection: "row",
                  gap: moderateScale(8),
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  hitSlop={hitSlop.hs8}
                  onPress={() => toggleHandler(movie)}
                >
                  <Heart fill={isFavorite ? "red" : "transparent"} />
                </TouchableOpacity>
                <TouchableOpacity
                  hitSlop={hitSlop.hs8}
                  onPress={() => shareMovie()}
                >
                  <ShareIcon />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.main}>
              {!isLoadedImg && (
                <View style={{ position: "absolute" }}>
                  <SkeletonPlaceholder>
                    <SkeletonPlaceholder.Item>
                      <View
                        style={{
                          width: moderateScale(205),
                          height: moderateScale(287),
                          borderRadius: moderateScale(12),
                        }}
                      ></View>
                    </SkeletonPlaceholder.Item>
                  </SkeletonPlaceholder>
                </View>
              )}
              <Image
                resizeMode='cover'
                width={moderateScale(205)}
                height={moderateScale(287)}
                source={{
                  uri: createPath(movie.poster_path),
                }}
                style={styles.img}
                onLoadEnd={() => setIsLoadedImg(true)}
              />
              <View
                style={{ flexDirection: "row", marginBottom: moderateScale(8) }}
              >
                <View style={styles.infoContainer}>
                  <Calendar style={styles.mr} />
                  <RegularText color={colors.grey}>
                    {movie.release_date.slice(0, 4)}
                  </RegularText>
                </View>
                <View style={[styles.infoContainer, styles.border]}>
                  <Clock style={styles.mr} />
                  <RegularText color={colors.grey}>
                    {movie.runtime} Minutes
                  </RegularText>
                </View>
                <View style={styles.infoContainer}>
                  <Cube style={styles.mr} />
                  <RegularText color={colors.grey}>
                    {movie.genres[0].name}
                  </RegularText>
                </View>
              </View>
              <BlurView intensity={10} style={styles.rating}>
                <View>
                  <RegularText
                    font={fonts.h5semibold}
                    color={colors.orange}
                    textAlign='left'
                  >
                    ★ {movie.vote_average.toFixed(1)}
                  </RegularText>
                </View>
              </BlurView>
            </View>
          </View>
          <View style={{ marginHorizontal: moderateScale(16) }}>
            <RegularText
              textAlign='left'
              font={fonts.h4regular}
              style={{ marginBottom: moderateScale(8) }}
            >
              Story Line
            </RegularText>
            <RegularText
              style={{ marginBottom: moderateScale(24) }}
              textAlign='left'
            >
              {movie.overview}
            </RegularText>
            {isLoadingCast ? (
              <Loader isShow={true} />
            ) : (
              <>
                <RegularText
                  textAlign='left'
                  font={fonts.h4regular}
                  style={{ marginBottom: moderateScale(8) }}
                >
                  Cast and Crew
                </RegularText>

                <FlatList
                  scrollEnabled={false}
                  data={cast.cast.slice(0, 9)}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => <CastItem {...item} />}
                />
              </>
            )}
          </View>
        </>
      )}
    </ScreenContainer>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  topContainer: {
    height: moderateScale(480),
  },
  bgImg: {
    opacity: 0.24,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    paddingTop: layout.statusBarHeight + moderateScale(8),
    marginHorizontal: moderateScale(16),
    marginBottom: moderateScale(24),
    flexDirection: "row",
    justifyContent: "space-between",
  },
  main: {
    alignItems: "center",
  },
  img: {
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(16),
  },
  mr: {
    marginRight: moderateScale(4),
  },
  infoContainer: {
    flexDirection: "row",
    paddingHorizontal: moderateScale(12),
  },
  border: {
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: colors.grey,
  },
  rating: {
    paddingVertical: moderateScale(4),
    paddingHorizontal: moderateScale(8),
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(24),
  },
});
