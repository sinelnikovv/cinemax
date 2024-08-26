import { useRef, useState } from "react";
import { StyleSheet, View, Image, Animated } from "react-native";
import { moderateScale } from "react-native-size-matters";
import Carousel from "react-native-snap-carousel";
import { ExpandingDot } from "react-native-animated-pagination-dots";
import { colors, layout } from "@src/theme";
import ScreenContainer from "@src/components/shared/ScreenContainer";
import { navigate } from "@src/utils/navigation";
import OndoardingItem from "@src/components/onboarding/OnboardingItem";
import NextButton from "@src/components/onboarding/NextButton";

const onboarding = [
  {
    title: "Lorem ipsum dolor sit amet consecteur esplicit",
    text: "Semper in cursus magna et eu varius nunc adipiscing. Elementum justo, laoreet id sem semper parturient.",
    img: (
      <Image
        style={{ resizeMode: "cover", flex: 1, width: "100%" }}
        source={require("@src/assets/images/onboarding1.png")}
      />
    ),
  },
  {
    title: "Lorem ipsum dolor sit amet consecteur esplicit",
    text: "Semper in cursus magna et eu varius nunc adipiscing. Elementum justo, laoreet id sem semper parturient.",
    img: (
      <Image
        style={{ resizeMode: "cover", flex: 1, width: "100%" }}
        source={require("@src/assets/images/onboarding2.png")}
      />
    ),
  },
  {
    title: "Lorem ipsum dolor sit amet consecteur esplicit",
    text: "Semper in cursus magna et eu varius nunc adipiscing. Elementum justo, laoreet id sem semper parturient.",
    img: (
      <Image
        style={{ resizeMode: "cover", flex: 1, width: "100%" }}
        source={require("@src/assets/images/onboarding3.png")}
      />
    ),
  },
];

const OnboardingScreen = () => {
  const [step, setStep] = useState(0);

  const onButtonPress = () => {
    carouselRef.current?.snapToNext();
    step === 1 && setStep(2);
    step === 2 && setStep(3);
    step === 3 && navigate("AuthStack");
  };

  const carouselRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <ScreenContainer
      scroll={false}
      sideBorder={false}
      background={colors.black}
    >
      <Carousel
        layoutCardOffset={0}
        ref={carouselRef}
        inactiveSlideScale={1}
        scrollEnabled={false}
        data={onboarding}
        sliderWidth={layout.width}
        itemWidth={layout.width}
        renderItem={({ item }) => <OndoardingItem {...item} />}
        vertical={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          },
        )}
      />
      <View style={styles.button}>
        <ExpandingDot
          containerStyle={styles.pagination}
          dotStyle={{ width: moderateScale(10), height: moderateScale(10) }}
          data={onboarding}
          scrollX={scrollX}
          inActiveDotOpacity={0.4}
          inActiveDotColor={colors.blue}
          activeDotColor={colors.blue}
          expandingDotWidth={moderateScale(32)}
        />
        <NextButton
          step={step}
          setStep={setStep}
          onButtonPress={onButtonPress}
          style={styles.nextBtn}
        />
      </View>
    </ScreenContainer>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
  },
  nextBtn: {
    position: "absolute",
    right: moderateScale(24),
    bottom: moderateScale(60),
  },
  pagination: {
    left: moderateScale(30),
    bottom: moderateScale(96),
  },
});
