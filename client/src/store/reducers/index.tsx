import { combineReducers } from 'redux';

import * as TYPES from '../types';

const initialState = {
  videos: [],
  currentSession: {
    name: "JamesJani",
    url: "https://www.youtube.com/c/JamesJani/videos"
  },
  selectedVs: [],
  currentVideo: null,
  withText: [],
};

interface Action {
    type: string,
    payload: any
}

function sessions(state = initialState, action: Action) {
  const { type, payload } = action;
  switch (type) {
    case TYPES.SET_VIDEOS_RESULTS: {
      console.log(payload);
      const {videos, currentSession} = payload;
      return {...state, videos, currentSession};
    }
    case TYPES.SET_SELECTED_VIDEOS:
        return {...state, ...payload};
    case TYPES.UPDATE_VIDEO_CONTENT: {
      const processed : string[] = [...state.withText];
      const videos = state.videos.map((vid: any) => {
        if (vid.v === payload.v) {
          const video = {...vid, transcript: payload.transcript};
          processed.push(vid.v);
          return video;
        } return vid
      });
      console.log(processed)
      return {...state, videos, withText: processed};
    }
    case TYPES.SET_CURRENT_VIDEO:
      console.log(payload);
      return {...state, currentVideo: payload};
    default:
      return state;
  }
}


export default combineReducers({
    sessions,
});