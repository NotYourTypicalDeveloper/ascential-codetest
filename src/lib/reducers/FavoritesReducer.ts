import { EventProps } from "../../components/Events";
import { getFavoritesFromLocalStorage } from "../../utils/getDataFromLocalStorage";
// TS types
export type IFavoritesState = {
  favoritesList: EventProps[];
};

export type IFavoritesAction =
  | { type: "ADD_FAVORITE"; payload: EventProps }
  | { type: "REMOVE_FAVORITE"; payload: string };

// initial state
export const initFavoritesState = {
  favoritesList: getFavoritesFromLocalStorage(),
};

export const favoritesReducer = (
  state: IFavoritesState,
  action: IFavoritesAction
) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return {
        ...state,
        favoritesList: [...state.favoritesList, action.payload],
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favoritesList: state.favoritesList.filter(
          (event) => event.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
