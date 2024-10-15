import { FlatList, View } from "react-native";

import { moderateScale } from "react-native-size-matters";

import FavouriteItem from "@src/components/homescreen/FavouriteItem";
import ScreenContainer from "@src/components/shared/ScreenContainer";
import useFavoriteMovies from "@src/utils/firebase";

const FavouritesScreen = () => {
  const { favoriteMovies } = useFavoriteMovies();
  return (
    <ScreenContainer scroll={false}>
      <FlatList
        style={{}}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        data={favoriteMovies}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                marginBottom: moderateScale(24),
              }}
            >
              <FavouriteItem {...item} />
            </View>
          );
        }}
      ></FlatList>
    </ScreenContainer>
  );
};

export default FavouritesScreen;
