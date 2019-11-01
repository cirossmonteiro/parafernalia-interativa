//https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=react&maxresults=20&key=AIzaSyB2qPOWZw7J7GJ5rRjpL_tkfi4shZckQaE
import axios from "axios";
import { LOAD_RESULTS } from "./actionTypes";
import { IResult } from "../reducers/VideoReducer";
const API_KEY = "AIzaSyB2qPOWZw7J7GJ5rRjpL_tkfi4shZckQaE"
const VERSION_API = "v3"
const URL_BASE = `https://www.googleapis.com/youtube/${VERSION_API}`;
const ENDPOINT = "search";
const URL_REQUEST = `${URL_BASE}/${ENDPOINT}`;
const PARAMS = {
    part: "id,snippet",
    maxresults: 20,
    key: API_KEY
};


export const fetchLoadResults = (q: string = "react") => {
    return async (dispatch: any) => {
        let request = await axios.get(URL_REQUEST, {params: {...PARAMS, q: q}});
        const { items } = request.data;
        console.log(items);
        dispatch(loadResults(items))
    }
}

export const loadResults = (results: IResult[] = []) => {
    return {
        type: LOAD_RESULTS,
        value: results
    };
}