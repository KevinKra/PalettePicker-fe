import { combineReducers } from "redux";
import { userProjects } from "./userProjectsReducer";
import { currentPalette } from "./currentPaletteReducer";
import { userDetails } from "./userDetailsReducer";

export const rootReducer = combineReducers({
  userProjects,
  currentPalette,
  userDetails
});
