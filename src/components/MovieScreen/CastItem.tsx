import { CastMember } from "@src/store/types";
import { StyleSheet, View, Image } from "react-native";
import { moderateScale } from "react-native-size-matters";
import RegularText from "../shared/RegularText";
import { fonts } from "@src/theme";
import { useState } from "react";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const CastItem = (item: CastMember) => {
  const [isLoadedImg, setIsLoadedImg] = useState(false);

  return (
    <View style={styles.container}>
      <>
        {!isLoadedImg && (
          <View style={{ position: "absolute" }}>
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item>
                <View style={styles.skeleton}></View>
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder>
          </View>
        )}
        <Image
          resizeMode='cover'
          width={moderateScale(100)}
          height={moderateScale(150)}
          source={{
            uri: `https://image.tmdb.org/t/p/w185${item.profile_path}`,
          }}
          style={styles.img}
          onLoadEnd={() => setIsLoadedImg(true)}
        />
      </>
      <View
        style={{
          flex: 1,
        }}
      >
        <RegularText
          style={{ marginBottom: moderateScale(14) }}
          font={fonts.h3semibold}
          textAlign='left'
          numberOfLines={2}
        >
          {item.original_name}
        </RegularText>
        <RegularText font={fonts.h5regular} textAlign='left'>
          {item.character}
        </RegularText>
      </View>
    </View>
  );
};

export default CastItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  skeleton: {
    width: moderateScale(100),
    height: moderateScale(150),
    borderRadius: moderateScale(12),
  },
  img: {
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(16),
    marginRight: moderateScale(16),
  },
});
