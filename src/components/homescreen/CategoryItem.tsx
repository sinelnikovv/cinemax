import { StyleSheet, TouchableOpacity, View } from "react-native";

import { moderateScale } from "react-native-size-matters";

import { Genre } from "@src/store/types";
import { colors } from "@src/theme";

import RegularText from "../shared/RegularText";

type Props = {
  item: Genre;
  isSelected: boolean;
  onPress: () => void;
};

const CategoryItem = ({ item, isSelected, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container, isSelected && styles.selected]}>
        <RegularText>{item.name}</RegularText>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    minWidth: moderateScale(80),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(12),
    borderRadius: moderateScale(8),
  },
  selected: {
    backgroundColor: colors.soft,
  },
});
