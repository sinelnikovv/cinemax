import { StyleSheet, TextInput, View } from "react-native";
import SearchIcon from "@assets/images/SearchIcon";
import { moderateScale } from "react-native-size-matters";
import { useState } from "react";
import { colors } from "@src/theme";

const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <SearchIcon />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setSearch(text)}
        value={search}
        placeholder='Searc a title..'
        placeholderTextColor={colors.grey}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: colors.soft,
    height: 48,
    borderRadius: 24,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    marginHorizontal: moderateScale(16),
    zIndex: 1,
    overflow: "hidden",
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
