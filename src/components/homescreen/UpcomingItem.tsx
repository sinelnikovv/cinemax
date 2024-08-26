import { Movie } from "@src/store/types";
import { colors, fonts } from "@src/theme";
import { StyleSheet, View, Image } from "react-native";
import { moderateScale } from "react-native-size-matters";
import RegularText from "../shared/RegularText";
import { formattedDateForUpcoming } from "@src/utils/formatting";

const UpcomingItem = (item: Movie) => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode='contain'
        source={{
          uri: `https://image.tmdb.org/t/p/w780${item.backdrop_path}`,
        }}
        style={styles.image}
      />
      <View style={styles.textBlock}>
        <RegularText style={styles.text} font={fonts.h4semibold}>
          {item.title}
        </RegularText>
        <RegularText style={styles.text}>
          {formattedDateForUpcoming(item.release_date)}
        </RegularText>
      </View>
    </View>
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
  image: {
    width: "100%",
    height: "100%",
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
