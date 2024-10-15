import React, { useEffect, useState } from "react";
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import { colors, fonts } from "@src/theme";
import RegularText from "../shared/RegularText";
import Pen from "@assets/images/pen.svg";
import * as ImagePicker from "expo-image-picker";
import { openSettings } from "expo-linking";
import { useAppSelector } from "@src/hooks/store";
import { selectUser } from "@src/store/slices/user";
import storage from "@react-native-firebase/storage";
import * as ImageManipulator from "expo-image-manipulator";

type Props = {
  size?: number;
  withEdit?: boolean;
};

const Avatar = ({ size = 40, withEdit = false }: Props) => {
  const [isLoadedImg, setIsLoadedImg] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const user = useAppSelector(selectUser);

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "The app needs permission to access your photos.",
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
  };

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
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

  const changePhotoHandler = async () => {
    await requestPermissions();
    pickImageAsync();
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
    const fetchAvatar = async () => {
      const reference = storage().ref(`avatars/${user.userId}`);

      const url = await reference.getDownloadURL();
      url && setImage(url);
    };

    fetchAvatar();
  }, [user.userId]);

  return (
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
      {image ? (
        isLoadedImg ? (
          <Image
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
        ) : (
          <View style={styles.loader}>
            <ActivityIndicator color={colors.green} />
          </View>
        )
      ) : (
        <RegularText font={fonts.h5semibold}>{initials}</RegularText>
      )}

      {withEdit && (
        <TouchableOpacity onPress={changePhotoHandler} style={styles.edit}>
          <Pen />
        </TouchableOpacity>
      )}
    </View>
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
});
