import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import RegularText from "./RegularText";
import Back from "@assets/images/arrowBack.svg";
import { moderateScale } from "react-native-size-matters";
import { colors, fonts } from "@src/theme";
import { goBack } from "@src/utils/navigation";

type Props = {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
};
const Header = ({ title, onPress = () => goBack(), style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: colors.soft,
          borderRadius: moderateScale(16),
        }}
      >
        <Back width={24} height={24} />
      </TouchableOpacity>
      <RegularText font={fonts.h4semibold} style={styles.title}>
        {title}
      </RegularText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flex: 1,
    marginRight: moderateScale(24),
  },
});
