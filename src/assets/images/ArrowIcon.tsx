import { colors } from "@src/theme";
import React from "react";
import Svg, { Path } from "react-native-svg";
type Props = {
  width?: number;
  height?: number;
  color?: string;
  direction?: "up" | "down";
};
const ArrowIcon = ({
  width = 12,
  height = 12,
  color = colors.grey,
  direction = "up",
}: Props) => {
  const rotation = direction === "up" ? "0" : "180";

  return (
    <Svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      style={{ transform: [{ rotate: `${rotation}deg` }] }}
    >
      <Path d='M12 2L4 10H8V20H16V10H20L12 2Z' fill={color} />
    </Svg>
  );
};

export default ArrowIcon;
