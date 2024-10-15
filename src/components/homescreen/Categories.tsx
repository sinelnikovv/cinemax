import { FlatList, StyleSheet, View } from "react-native";

import { moderateScale } from "react-native-size-matters";

import { useAppDispatch, useAppSelector } from "@src/hooks/store";
import { useGetGenresQuery } from "@src/store/slices/apiSlice";
import { selectedGenre, setGenre } from "@src/store/slices/selectedGenreSlice";
import { fonts } from "@src/theme";

import CategoryItem from "./CategoryItem";
import RegularText from "../shared/RegularText";

const ListHeaderComponent = () => {
  const selected = useAppSelector(selectedGenre);
  const dispatch = useAppDispatch();
  return (
    <CategoryItem
      onPress={() => dispatch(setGenre({ name: "All", id: "All" }))}
      isSelected={selected.name === "All"}
      item={{
        name: "All",
        id: 0,
      }}
    />
  );
};

const Categories = () => {
  const { data } = useGetGenresQuery();
  const selected = useAppSelector(selectedGenre);
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <RegularText font={fonts.h4semibold} style={styles.title}>
        Categories
      </RegularText>
      {!!data && (
        <FlatList
          contentContainerStyle={styles.contentContainerStyle}
          showsHorizontalScrollIndicator={false}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          data={data.genres}
          ListHeaderComponent={ListHeaderComponent}
          renderItem={({ item }) => (
            <CategoryItem
              onPress={() => dispatch(setGenre(item))}
              isSelected={selected.name === item.name}
              item={item}
            />
          )}
        />
      )}
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginVertical: moderateScale(24),
    alignItems: "flex-start",
  },
  title: {
    marginBottom: moderateScale(15),
    marginHorizontal: moderateScale(16),
  },
  contentContainerStyle: {
    gap: moderateScale(8),
    paddingHorizontal: moderateScale(16),
  },
});
