import { LOAD_RESULTS } from "../actions/actionTypes"

interface IAction {
    type: string,
    value: any
}

export interface IResult {
    kind: string,
    etag: string,
    id: {
        kind: string
        channelId?: string,
        videoId?: string
    },
    snippet: {
        publishedAt: string, //"2013-07-30T10:19:47.000Z",
        channelId?: string,
        title: string,
        description: string,
        thumbnails: {
            default: {
                url: string
            },
            medium: {
                url: string
            },
            high: {
                url: string
            }
        },
        channelTitle: string,
        liveBroadcastContent: string
    }
}

interface IReducerState {
    results: IResult[]
}

const initialState: IReducerState = {
    results: []
}

export const VideoReducer = (state: IReducerState = initialState, action: IAction) => {
    switch(action.type){
        case LOAD_RESULTS:
            return {
                ...state,
                results: action.value
            }
        default:
            return state;
    }
}