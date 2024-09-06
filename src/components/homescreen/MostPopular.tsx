import { useAppSelector } from "@src/hooks/store";
import { useGetSearchMoviesQuery } from "@src/store/slices/apiSlice";
import { selectedGenre } from "@src/store/slices/selectedGenreSlice";
import { StyleSheet, View } from "react-native";
import MostPopularItem from "./MostPopularItem";
import { moderateScale } from "react-native-size-matters";
import { fonts, layout } from "@src/theme";
import Carousel from "react-native-snap-carousel";
import Button from "../shared/Button";
import RegularText from "../shared/RegularText";

const MostPopular = () => {
  const selected = useAppSelector(selectedGenre);

  const { data } = useGetSearchMoviesQuery({
    include_adult: true,
    page: 1,
    sort_by: "popularity.desc",
    with_genres: selected.id === "All" ? undefined : selected.id,
  });

  return (
    <View>
      <View style={styles.title}>
        <RegularText font={fonts.h4semibold} textAlign='left'>
          Most popular
        </RegularText>
        <Button onPress={() => console.log("see all")} size='xsm' type='text'>
          See All
        </Button>
      </View>

      {data && data.results.length > 0 ? (
        <Carousel
          activeSlideAlignment='start'
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          data={data.results}
          keyExtractor={(data) => data.id.toString()}
          sliderWidth={layout.width}
          itemWidth={moderateScale(135)}
          renderItem={({ item, index }) => (
            <MostPopularItem {...item} index={index} />
          )}
        />
      ) : null}
    </View>
  );
};

export default MostPopular;

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: moderateScale(15),
    marginHorizontal: moderateScale(16),
  },
});
