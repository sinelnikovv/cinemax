import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { moderateScale } from "react-native-size-matters";

import SearchIcon from "@src/assets/images/SearchIcon";
import FavouriteItem from "@src/components/homescreen/FavouriteItem";
import RegularText from "@src/components/shared/RegularText";
import ScreenContainer from "@src/components/shared/ScreenContainer";
import { useGetSearchMoviesQuery } from "@src/store/slices/apiSlice";
import { colors } from "@src/theme";

const SearchScreen = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState([]);

  const { data, isFetching, refetch } = useGetSearchMoviesQuery({
    query: search,
    page: page,
  });

  useEffect(() => {
    page === 1
      ? setResult(data?.results)
      : setResult([...result, ...data.results]);
  }, [data]);

  return (
    <ScreenContainer scroll={false} background={colors.dark}>
      <View style={styles.inputContainer}>
        <SearchIcon />
        <TextInput
          style={styles.input}
          onChangeText={(text) => setSearch(text)}
          value={search}
          placeholder='Searc a title..'
          placeholderTextColor={colors.grey}
        />
      </View>
      <FlatList
        contentContainerStyle={{ marginVertical: moderateScale(24) }}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => refetch()}
            tintColor={colors.green}
            colors={[colors.green]}
          />
        }
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        data={result}
        maxToRenderPerBatch={20}
        windowSize={20}
        ListEmptyComponent={
          <View>
            <RegularText>Start search with input above...</RegularText>
          </View>
        }
        onEndReached={() =>
          data?.total_pages > page && !isFetching && setPage(page + 1)
        }
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              marginBottom: moderateScale(24),
            }}
          >
            <FavouriteItem {...item} />
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{ height: moderateScale(20) }}>
            {!!isFetching && <ActivityIndicator color={colors.green} />}
          </View>
        )}
        ListFooterComponentStyle={{ paddingBottom: moderateScale(20) }}
      />
    </ScreenContainer>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    backgroundColor: colors.soft,
    height: moderateScale(48),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    zIndex: 1,
    borderWidth: 1,
    borderRadius: moderateScale(24),
    borderColor: colors.dark,
  },
  settingsIcon: {
    paddingLeft: moderateScale(8),
    borderLeftColor: colors.darkGrey,
    borderLeftWidth: 1,
  },
  input: {
    marginLeft: moderateScale(8),
    color: colors.white,
    flex: 1,
  },
});
