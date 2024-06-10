import { StyleSheet, View } from "react-native";
import { onboardingShowed } from "../../store/slices/onboarding";
import { useAppDispatch } from "../../hooks/store";
import { useEffect } from "react";

const SignUp = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(onboardingShowed());
  }, []);
  return <View style={styles.container}></View>;
};

export default SignUp;

const styles = StyleSheet.create({
  container: { height: 200, backgroundColor: "red" },
});
