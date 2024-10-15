import Categories from "@src/components/homescreen/Categories";
import Header from "@src/components/homescreen/Header";
import MostPopular from "@src/components/homescreen/MostPopular";
import Search from "@src/components/homescreen/Search";
import Upcoming from "@src/components/homescreen/Upcoming";
import ScreenContainer from "@src/components/shared/ScreenContainer";
import { colors } from "@src/theme";

const HomeScreen = () => {
  return (
    <ScreenContainer sideBorder={false} background={colors.dark}>
      <Header />
      <Search />
      <Upcoming />
      <Categories />
      <MostPopular />
    </ScreenContainer>
  );
};

export default HomeScreen;
