import { VideoReducer } from "./VideoReducer";
import { combineReducers } from "redux";

export const Reducers =  combineReducers({
    videoState: VideoReducer
});