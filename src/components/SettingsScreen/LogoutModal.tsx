import { StyleSheet, View } from "react-native";
import ModalView from "../shared/ModalView";
import RegularText from "../shared/RegularText";
import LogoutIcon from "@assets/images/logout.svg";
import { colors, fonts } from "@src/theme";
import { moderateScale } from "react-native-size-matters";
import Button from "../shared/Button";
import { clearUser } from "@src/store/slices/user";
import { useAppDispatch } from "@src/hooks/store";
import auth from "@react-native-firebase/auth";

type Props = {
  isShow: boolean;
  setIsShow: (value: boolean) => void;
};

const LogoutModal = ({ isShow, setIsShow }: Props) => {
  const dispatch = useAppDispatch();

  const logoutHandler = () => {
    dispatch(clearUser());
    auth().signOut();
    setIsShow(false);
  };
  return (
    <View style={{ width: 1, height: 1 }}>
      <ModalView handleCloseButton={() => setIsShow(false)} isShow={isShow}>
        <View style={styles.container}>
          <LogoutIcon />
          <RegularText style={styles.title} font={fonts.h3semibold}>
            Are you sure ?
          </RegularText>
          <RegularText
            style={styles.subtitle}
            font={fonts.h6regular}
            color={colors.grey}
          >
            Ullamcorper imperdiet urna id non sed est sem. Rhoncus amet, enim
            purus gravida donec aliquet.
          </RegularText>
          <Button
            containerStyle={styles.btn}
            size='lg'
            type='outlined'
            onPress={logoutHandler}
          >
            Log Out
          </Button>
          <View style={styles.boxContainer}>
            <Button
              containerStyle={styles.btn}
              size='lg'
              onPress={() => setIsShow(false)}
            >
              Cancel
            </Button>
          </View>
        </View>
      </ModalView>
    </View>
  );
};

export default LogoutModal;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    marginTop: moderateScale(32),
    marginBottom: moderateScale(12),
  },
  subtitle: {
    marginBottom: moderateScale(32),
  },
  boxContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: "red",
    gap: moderateScale(12),
  },
  btn: {
    flex: 1,
  },
});
