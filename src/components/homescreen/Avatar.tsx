import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import storage from "@react-native-firebase/storage";
import * as ImageManipulator from "expo-image-manipulator";
import * as ImagePicker from "expo-image-picker";
import { openSettings } from "expo-linking";
import FastImage from "react-native-fast-image";
import { moderateScale } from "react-native-size-matters";

import Pen from "@assets/images/pen.svg";
import { useAppSelector } from "@src/hooks/store";
import { selectUser } from "@src/store/slices/user";
import { colors, fonts } from "@src/theme";

import BottomSheet from "../shared/BottomSheet";
import Button from "../shared/Button";
import RegularText from "../shared/RegularText";

type Props = {
  size?: number;
  withEdit?: boolean;
};

const SHOW_HEIGHT = moderateScale(230);

const Avatar = ({ size = 40, withEdit = false }: Props) => {
  const [isLoadedImg, setIsLoadedImg] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const user = useAppSelector(selectUser);

  const initials = user?.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const requestPermissions = async (type: "camera" | "gallery") => {
    const { status } =
      type === "camera"
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        `The app needs permission to access your ${type}.`,
        [
          { text: "Cancel" },
          {
            text: "Open Settings",
            onPress: async () => {
              openSettings();
            },
          },
        ],
        { cancelable: false },
      );
    }
    close();
  };

  const pickImageAsync = async (type: "camera" | "gallery") => {
    const result =
      type === "camera"
        ? await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 1,
            aspect: [1, 1],
          })
        : await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            aspect: [1, 1],
          });

    if (!result.canceled) {
      setIsLoadedImg(false);
      const webpImage = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [],
        { format: ImageManipulator.SaveFormat.WEBP, compress: 0.7 },
      );
      const downloadUrl = await uploadToFirebase(webpImage.uri);
      setImage(downloadUrl);
    }
  };

  const getFromGallery = async () => {
    await requestPermissions("gallery");
    await pickImageAsync("gallery");
  };

  const getFromCamera = async () => {
    await requestPermissions("camera");
    await pickImageAsync("camera");
  };

  const uploadToFirebase = async (uri: string) => {
    const fetchResponse = await fetch(uri);
    const blob = await fetchResponse.blob();
    const reference = storage().ref(`avatars/${user.userId}`);
    await reference.put(blob);
    const downloadUrl = await reference.getDownloadURL();
    return downloadUrl;
  };

  useEffect(() => {
    if (user) {
      const fetchAvatar = async () => {
        const reference = storage().ref(`avatars/${user.userId}`);
        const url = await reference.getDownloadURL();
        url && setImage(url);
      };

      fetchAvatar();
    }
  }, [user]);

  const closeRef = useRef(() => {});
  const openRef = useRef(() => {});

  const open = useCallback(() => openRef.current(), []);
  const close = useCallback(() => closeRef.current(), []);

  return (
    <>
      <View>
        {image ? (
          <>
            <FastImage
              style={[
                styles.avatar,
                {
                  width: moderateScale(size),
                  height: moderateScale(size),
                  borderRadius: moderateScale(size / 2),
                },
              ]}
              source={{ uri: image }}
              onLoadEnd={() => setIsLoadedImg(true)}
            />
            {!isLoadedImg && (
              <View style={styles.loader}>
                <ActivityIndicator color={colors.green} />
              </View>
            )}
          </>
        ) : (
          <View
            style={[
              styles.container,
              {
                width: moderateScale(size),
                height: moderateScale(size),
                borderRadius: moderateScale(size / 2),
              },
            ]}
          >
            <RegularText font={fonts.h5semibold}>{initials}</RegularText>
          </View>
        )}

        {withEdit && (
          <TouchableOpacity onPress={open} style={styles.edit}>
            <Pen />
          </TouchableOpacity>
        )}
      </View>
      <BottomSheet
        open={openRef}
        close={closeRef}
        showHeight={SHOW_HEIGHT}
        closeOnBackdrop
        closeOnPanDown
      >
        <View style={{ marginTop: moderateScale(15), alignSelf: "stretch" }}>
          <RegularText size={14}>What do you prefer?</RegularText>
          <Button containerStyle={styles.btnStyle} onPress={getFromCamera}>
            Take photo
          </Button>
          <Button containerStyle={styles.btnStyle} onPress={getFromGallery}>
            Choose from gallery
          </Button>
          <View style={{ flex: 1 }}></View>
        </View>
      </BottomSheet>
    </>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  edit: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.soft,
    width: moderateScale(32),
    height: moderateScale(32),
    borderRadius: moderateScale(16),
    position: "absolute",
    right: -5,
    bottom: -5,
  },
  avatar: {
    overflow: "hidden",
  },
  loader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBackdropStyle: {
    backgroundColor: colors.green,
    opacity: 0.85,
  },
  modalBackgroundStyle: {
    backgroundColor: colors.soft,
    borderRadius: 0,
  },
  btnStyle: {
    alignSelf: "stretch",
    marginVertical: moderateScale(10),
  },
});
