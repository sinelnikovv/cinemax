import { useState, useCallback } from "react";
import firestore from "@react-native-firebase/firestore";
import { useAppSelector } from "@src/hooks/store";
import { selectUser } from "@src/store/slices/user";
import { FavouriteMovie } from "@src/store/types";
import { useFocusEffect } from "@react-navigation/native";

const useFavoriteMovies = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<FavouriteMovie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const user = useAppSelector(selectUser);
  const userId = user.userId;
  const moviesRef = firestore()
    .collection("users")
    .doc(userId)
    .collection("favorites");

  const fetchFavoriteMovies = async () => {
    try {
      setLoading(true);
      if (user) {
        const snapshot = await moviesRef.get();
        const moviesList = snapshot.docs.map((doc) => ({
          ...doc.data(),
        }));
        setFavoriteMovies(moviesList as FavouriteMovie[]);
      }
    } catch (err) {
      setError("Failed to fetch favorite movies");
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchFavoriteMovies();
    }, [favoriteMovies]),
  );

  const toggleFavoriteMovie = async (movie: FavouriteMovie) => {
    if (!user) return;

    try {
      const movieRef = moviesRef.doc(`${movie.title}-${movie.id}`);

      const moviesSnapshot = await movieRef.get();

      if (moviesSnapshot.exists) {
        await movieRef.delete();
        setFavoriteMovies((prev) => prev.filter((fav) => fav.id !== movie.id));
      } else {
        await movieRef.set(movie);
        setFavoriteMovies((prev) => [...prev, movie]);
      }
    } catch (err) {
      setError("Failed to update favorite status");
    }
  };

  return { toggleFavoriteMovie, favoriteMovies, loading, error };
};

export default useFavoriteMovies;
