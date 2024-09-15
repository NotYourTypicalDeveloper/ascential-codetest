import { EventProps } from "../../components/Events"; // Adjust the import path as needed

type IFavoritesState = {
  favoritesList: EventProps[];
};

type IFavoritesAction =
  | { type: "ADD_FAVORITE"; payload: EventProps }
  | { type: "REMOVE_FAVORITE"; payload: string };

export const initFavoritesState = {
  favoritesList: [],
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
