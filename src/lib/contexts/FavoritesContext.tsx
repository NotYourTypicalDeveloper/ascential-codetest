import React, { createContext, useContext, ReactNode, useReducer } from "react";
import {
  favoritesReducer,
  initFavoritesState,
  IFavoritesAction,
  IFavoritesState,
} from "../reducers/FavoritesReducer";

type FavoritesContextType = {
  state: IFavoritesState;
  dispatch: React.Dispatch<IFavoritesAction>;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(favoritesReducer, initFavoritesState);

  return (
    <FavoritesContext.Provider value={{ state, dispatch }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("FavoritesProvider is missing");
  }
  return context;
};
