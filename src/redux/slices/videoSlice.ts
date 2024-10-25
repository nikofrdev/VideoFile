import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoState {
  playing: boolean;
  videoTime: number;
}

const initialState: VideoState = {
  playing: false,
  videoTime: 0,
};

const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.playing = action.payload;
    },
    setVideoTime: (state, action: PayloadAction<number>) => {
      state.videoTime = action.payload;
    },
  },
});

export const { setPlaying, setVideoTime } = videoSlice.actions;
export default videoSlice.reducer;
