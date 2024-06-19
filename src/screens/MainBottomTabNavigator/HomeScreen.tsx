import { StyleSheet, TouchableOpacity, View } from "react-native";
import auth from "@react-native-firebase/auth";
import RegularText from "../../components/RegularText";
import { navigate } from "../../navigation/utils";
import { useAppDispatch } from "../../hooks/store";
import { clearUser } from "../../store/slices/user";
const HomeScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              dispatch(clearUser());
              navigate("AuthStack");
            });
        }}
      >
        <RegularText>Sign out</RegularText>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { height: 200, backgroundColor: "red" },
});
