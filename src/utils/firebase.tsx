import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { useAppSelector } from "@src/hooks/store";
import { selectUser } from "@src/store/slices/user";
import { Movie, MovieResponseType } from "@src/store/types";

const useFavoriteMovie = (movieId: number) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const user = useAppSelector(selectUser);
  useEffect(() => {
    const checkIfFavorite = async () => {
      const userId = user.userId;
      const movieRef = firestore()
        .collection("users")
        .doc(userId)
        .collection("favorites")
        .doc(movieId.toString());

      const movieSnapshot = await movieRef.get();
      if (movieSnapshot.exists) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    };

    if (user && movieId) {
      checkIfFavorite();
    }
  }, [movieId, user]);

  const toggleFavoriteMovie = async (movie: MovieResponseType | Movie) => {
    if (!user) return;

    const userId = user.userId;
    const movieRef = firestore()
      .collection("users")
      .doc(userId)
      .collection("favorites")
      .doc(movie.id.toString());

    const movieSnapshot = await movieRef.get();

    if (movieSnapshot.exists) {
      await movieRef.delete();
      setIsFavorite(false);
    } else {
      await movieRef.set({
        title: movie.title,
        poster_path: movie.poster_path,
        id: movie.id,
      });
      setIsFavorite(true);
    }
  };

  return { isFavorite, toggleFavoriteMovie };
};

export default useFavoriteMovie;
