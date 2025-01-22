import Categories from "@src/components/homescreen/Categories";
import Header from "@src/components/homescreen/Header";
import MostPopular from "@src/components/homescreen/MostPopular";
import Search from "@src/components/homescreen/Search";
import Upcoming from "@src/components/homescreen/Upcoming";
import ScreenContainer from "@src/components/shared/ScreenContainer";
import { useAppSelector } from "@src/hooks/store";
import { selectUser } from "@src/store/slices/user";
import { colors } from "@src/theme";

const HomeScreen = () => {
  const user = useAppSelector(selectUser);

  return (
    <ScreenContainer sideBorder={false} background={colors.dark}>
      {!!user && <Header />}
      <Search />
      <Upcoming />
      <Categories />
      <MostPopular />
    </ScreenContainer>
  );
};

export default HomeScreen;
