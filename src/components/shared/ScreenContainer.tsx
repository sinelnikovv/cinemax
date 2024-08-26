import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { useState } from "react";
import { colors } from "@src/theme";

type Props = {
  children: React.ReactNode;
  background?: string;
  sideBorder?: boolean;
  header?: React.ReactNode;
  scroll?: boolean;
  enableKeyboardAvoidView?: boolean;
  keyboardShouldPersistTaps?:
    | boolean
    | "handled"
    | "always"
    | "never"
    | undefined;
};

const ScreenContainer = ({
  header,
  children,
  background,
  sideBorder = true,
  scroll = true,
  enableKeyboardAvoidView = true,
  keyboardShouldPersistTaps = "handled",
}: Props) => {
  const insets = useSafeAreaInsets();
  const [scrollViewHeight, setScrollViewHeight] = useState(0);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[
        { flex: 1, paddingTop: insets.top, backgroundColor: colors.dark },
        sideBorder && { paddingHorizontal: moderateScale(16) },
        background && { backgroundColor: background },
      ]}
      enabled={enableKeyboardAvoidView}
    >
      <TouchableOpacity activeOpacity={1} onPress={Keyboard.dismiss}>
        {header && header}
      </TouchableOpacity>
      {scroll ? (
        <View
          onLayout={(e) => setScrollViewHeight(e.nativeEvent.layout.height)}
          style={{
            flex: 1,
          }}
        >
          <ScrollView
            contentContainerStyle={{ minHeight: scrollViewHeight }}
            keyboardShouldPersistTaps={keyboardShouldPersistTaps}
            style={{ flex: 1 }}
          >
            {children}
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          {children}
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default ScreenContainer;
