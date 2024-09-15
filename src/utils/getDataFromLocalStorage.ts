import { EventProps } from "../components/Events";

export const getFavoritesFromLocalStorage = (): EventProps[] => {
  const storedFavorites = localStorage.getItem("favorites");
  return storedFavorites ? JSON.parse(storedFavorites) : [];
};
