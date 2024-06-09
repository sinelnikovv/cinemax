import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../theme";

type Props = {
  children: React.ReactNode;
  background?: string;
};
const ScreenContainer = ({ children, background }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        { flex: 1, paddingTop: insets.top, backgroundColor: colors.dark },
        background && { backgroundColor: background },
      ]}
    >
      {children}
    </View>
  );
};

export default ScreenContainer;
