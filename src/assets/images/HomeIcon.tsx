import Svg, { Path } from "react-native-svg";

const FavouritesIcon = ({ color }) => {
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' fill='none'>
      <Path
        d='M10 19V14H14V19C14 19.55 14.45 20 15 20H18C18.55 20 19 19.55 19 19V12H20.7C21.16 12 21.38 11.43 21.03 11.13L12.67 3.6C12.29 3.26 11.71 3.26 11.33 3.6L2.97 11.13C2.63 11.43 2.84 12 3.3 12H5V19C5 19.55 5.45 20 6 20H9C9.55 20 10 19.55 10 19Z'
        fill={color}
      />
    </Svg>
  );
};

export default FavouritesIcon;
