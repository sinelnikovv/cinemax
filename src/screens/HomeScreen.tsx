import { colors } from "@src/theme";
import ScreenContainer from "@src/components/shared/ScreenContainer";
import Header from "@src/components/homescreen/Header";
import Search from "@src/components/homescreen/Search";
import Upcoming from "@src/components/homescreen/Upcoming";
import Categories from "@src/components/homescreen/Categories";
import MostPopular from "@src/components/homescreen/MostPopular";

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
