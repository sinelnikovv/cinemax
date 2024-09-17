import { StyleSheet, TouchableOpacity, View } from "react-native";
import RegularText from "../shared/RegularText";
import Btn from "@assets/images/arrowBack.svg";
import { colors } from "@src/theme";
import { moderateScale } from "react-native-size-matters";
type Props = {
  title: string;
  icon: React.ReactNode;
  onPress: () => void;
};

const SettingsItem = ({ title, icon, onPress }: Props) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={styles.iconContainer}>{icon}</View>
        <RegularText>{title}</RegularText>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Btn
          stroke={colors.blue}
          style={{ transform: [{ rotate: "180deg" }] }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SettingsItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: moderateScale(24),
    paddingVertical: moderateScale(16),
    borderBottomWidth: 1,
    borderColor: colors.soft,
  },
  iconContainer: {
    width: moderateScale(32),
    height: moderateScale(32),
    backgroundColor: colors.soft,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: moderateScale(16),
    marginRight: moderateScale(16),
  },
});
