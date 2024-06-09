import { useEffect } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path, Rect } from "react-native-svg";
import { colors } from "../../../theme";

const AnimatedPath = Animated.createAnimatedComponent(Path);

type Props = {
  step: number;
  setStep: (step: number) => void;
  onButtonPress: () => void;
  style: ViewStyle;
};

const NextButton = ({ step, setStep, onButtonPress, style }: Props) => {
  const shared1 = useSharedValue(-82);
  const shared2 = useSharedValue(-91);
  const shared3 = useSharedValue(-82);

  const animatedProps1 = useAnimatedProps(() => ({
    strokeDashoffset: shared1.value,
  }));
  const animatedProps2 = useAnimatedProps(() => ({
    strokeDashoffset: shared2.value,
  }));
  const animatedProps3 = useAnimatedProps(() => ({
    strokeDashoffset: shared3.value,
  }));

  useEffect(() => {
    setStep(1);
  }, []);

  useEffect(() => {
    step === 0 &&
      ((shared1.value = -82), (shared2.value = -91), (shared3.value = -82));
    step === 1 && (shared1.value = withTiming(-164, { duration: 500 }));
    step === 2 && (shared2.value = withTiming(-182, { duration: 500 }));
    step === 3 && (shared3.value = withTiming(-164, { duration: 500 }));
  }, [step]);

  return (
    <TouchableOpacity style={style} onPress={() => onButtonPress()}>
      <Svg width={80} height={80}>
        <Rect
          x='10'
          y='10'
          width='60'
          height='60'
          rx='15'
          ry='15'
          fill={colors.blue}
        />

        <AnimatedPath
          d='M 40 3 H60  A20 20 0 0 1 77 20 V56'
          fill='none'
          strokeDasharray={"82, 82"}
          stroke={colors.blue}
          strokeWidth={3}
          animatedProps={animatedProps1}
        />

        <AnimatedPath
          d='M 77 60 A20 20 0 0 1 60 77 H20 A20 20 0 0 1 3 60'
          fill='none'
          strokeDasharray={"91, 91"}
          stroke={colors.blue}
          strokeWidth={3}
          animatedProps={animatedProps2}
        />

        <AnimatedPath
          d='M 3 56 V20 A20 20 0 0 1 20 3 H36 '
          fill='none'
          strokeDasharray={"82, 82"}
          stroke={colors.blue}
          strokeWidth={3}
          animatedProps={animatedProps3}
        />
        <Path
          d='M 36 33 L 43 40 L 36 47'
          stroke='black'
          strokeWidth='2'
          fill='none'
        />
      </Svg>
    </TouchableOpacity>
  );
};

export default NextButton;
