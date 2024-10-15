import { StyleSheet, View } from "react-native";

import { moderateScale } from "react-native-size-matters";

import { colors, fonts } from "@src/theme";

import RegularText from "../shared/RegularText";

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
        <RegularText
          style={{ marginBottom: moderateScale(14) }}
          font={fonts.h2semibold}
          color={colors.white}
          textAlign='center'
        >
          {title}
        </RegularText>
        <RegularText
          font={fonts.h5medium}
          color={colors.grey}
          textAlign='center'
        >
          {text}
        </RegularText>
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
