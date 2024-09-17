import { colors } from "@src/theme";
import ScreenContainer from "@src/components/shared/ScreenContainer";
import Header from "@src/components/homescreen/Header";
import Search from "@src/components/homescreen/Search";
import Upcoming from "@src/components/homescreen/Upcoming";
import Categories from "@src/components/homescreen/Categories";
import MostPopular from "@src/components/homescreen/MostPopular";
import { TouchableOpacity, View } from "react-native";
import { moderateScale } from "react-native-size-matters";
import { useAppDispatch } from "@src/hooks/store";
import { clearUser } from "@src/store/slices/user";
import auth from "@react-native-firebase/auth";

const HomeScreen = () => {
  const dispatch = useAppDispatch();

  return (
    <ScreenContainer sideBorder={false} background={colors.dark}>
      <TouchableOpacity
        onPress={() => {
          dispatch(clearUser());
          auth().signOut();
        }}
      >
        <View
          style={{
            width: moderateScale(50),
            height: moderateScale(50),
            backgroundColor: "red",
          }}
        ></View>
      </TouchableOpacity>
      <Header />
      <Search />
      <Upcoming />
      <Categories />
      <MostPopular />
    </ScreenContainer>
  );
};

export default HomeScreen;
