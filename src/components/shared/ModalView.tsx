import React from "react";
import { Modal, Pressable, StyleSheet, View, ViewStyle } from "react-native";

import { BlurView } from "expo-blur";
import { moderateScale } from "react-native-size-matters";

import { colors } from "@src/theme";

type Props = {
  isShow: boolean;
  children: JSX.Element[] | JSX.Element;
  handleCloseButton?: () => void;
  modalStyles?: ViewStyle;
  onContnentPress?: () => void;
};

const ModalView: React.FC<Props> = ({
  isShow = false,
  children,
  handleCloseButton,
  modalStyles,
  onContnentPress,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType='fade' transparent={true} visible={isShow}>
        <Pressable onPress={handleCloseButton} style={styles.absoluteContainer}>
          <BlurView style={styles.absoluteContainer} />
          <View style={styles.centeredView}>
            <View style={[styles.modalView, modalStyles && modalStyles]}>
              <Pressable
                style={{ width: "100%" }}
                onPress={() => !!onContnentPress && onContnentPress()}
              >
                {children}
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: moderateScale(15),
    zIndex: 1,
  },
  absoluteContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  modalView: {
    justifyContent: "center",
    zIndex: 10,
    width: "100%",
    borderRadius: moderateScale(10),
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(14),
    alignItems: "center",
    backgroundColor: colors.soft,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ModalView;
