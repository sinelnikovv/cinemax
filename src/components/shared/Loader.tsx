import { colors } from "@src/theme";
import { ActivityIndicator, StyleSheet, View } from "react-native";
type Props = {
  isShow: boolean;
};

const Loader = ({ isShow }: Props) => {
  return (
    isShow && (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    )
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: colors.dark,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
});
