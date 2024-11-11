import React, { useCallback, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { moderateScale } from "react-native-size-matters";

import { colors } from "@src/theme";

type Props = {
  open?: React.MutableRefObject<() => void>;
  close?: React.MutableRefObject<() => void>;
  showHeight: number;
  closeOnBackdrop?: boolean;
  closeOnPanDown?: boolean;
  onClose?: () => void;
  children: JSX.Element[] | JSX.Element;
};

const BottomSheet: React.FC<Props> = ({
  open,
  close,
  showHeight,
  children,
  closeOnBackdrop,
  closeOnPanDown,
  onClose = () => {},
}) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (open)
      open.current = () => {
        bottomSheetRef.current?.present();
        bottomSheetRef.current?.expand();
      };
    if (close) close.current = () => bottomSheetRef.current?.close();
    return bottomSheetRef.current?.close;
  }, []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        style={styles.backdropStyle}
        opacity={0.85}
        pressBehavior={(closeOnBackdrop && "close") || "none"}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [closeOnBackdrop],
  );

  return (
    <BottomSheetModal
      backdropComponent={renderBackdrop}
      ref={bottomSheetRef}
      index={0}
      enablePanDownToClose={!!closeOnPanDown}
      snapPoints={[showHeight]}
      style={styles.style}
      handleIndicatorStyle={styles.handleIndicatorStyle}
      handleStyle={styles.handleStyle}
      backgroundStyle={styles.backgroundStyle}
      onChange={(n) => n === -1 && onClose()}
    >
      <BottomSheetView style={styles.contentContainer}>
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: colors.dark,
    borderRadius: moderateScale(32),
  },
  handleIndicatorStyle: {
    display: "none",
  },
  handleStyle: {
    display: "none",
  },
  style: {
    paddingTop: moderateScale(15),
    paddingHorizontal: moderateScale(15),
  },
  backdropStyle: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: colors.soft,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
