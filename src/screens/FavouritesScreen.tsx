import { FlatList, View } from "react-native";

import { moderateScale } from "react-native-size-matters";

import FavouriteItem from "@src/components/homescreen/FavouriteItem";
import Button from "@src/components/shared/Button";
import RegularText from "@src/components/shared/RegularText";
import ScreenContainer from "@src/components/shared/ScreenContainer";
import { useAppSelector } from "@src/hooks/store";
import { Routes } from "@src/navigation/routes";
import { selectUser } from "@src/store/slices/user";
import useFavoriteMovies from "@src/utils/firebase";
import { navigate } from "@src/utils/navigation";

const FavouritesScreen = () => {
  const user = useAppSelector(selectUser);

  const { favoriteMovies } = useFavoriteMovies();
  return (
    <ScreenContainer scroll={false}>
      {user ? (
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
      ) : (
        <View
          style={{
            justifyContent: "center",
            flex: 1,
          }}
        >
          <RegularText style={{ marginBottom: moderateScale(20) }}>
            To see favourites movies please sign in
          </RegularText>
          <Button
            size='xlg'
            type='filled'
            onPress={() => navigate(Routes.Auth)}
          >
            Sign In
          </Button>
        </View>
      )}
    </ScreenContainer>
  );
};

export default FavouritesScreen;
