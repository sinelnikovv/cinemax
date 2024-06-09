import { StyleSheet, View } from "react-native";
import TextCustom from "../../../components/TextCustom";
import { moderateScale } from "react-native-size-matters";
import { colors } from "../../../theme";
import fonts from "../../../theme/fonts";

type Props = {
  title: string;
  text: string;
  img: JSX.Element;
};

const OndoardingItem = ({ title, text, img }: Props) => {
  return (
    <View style={{ flex: 1 }}>
      {img}
      <View style={styles.textBLock}>
        <TextCustom
          style={{ marginBottom: moderateScale(14) }}
          font={fonts.semibold24}
          color={colors.white}
          textAlign='center'
        >
          {title}
        </TextCustom>
        <TextCustom
          font={fonts.medium14}
          color={colors.grey}
          textAlign='center'
        >
          {text}
        </TextCustom>
      </View>
    </View>
  );
};

export default OndoardingItem;

const styles = StyleSheet.create({
  textBLock: {
    flex: 1,
    backgroundColor: colors.dark,
    alignItems: "center",
    paddingVertical: moderateScale(46),
    paddingHorizontal: moderateScale(55),
  },
});
