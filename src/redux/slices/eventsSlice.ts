import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Event {
  timestamp: number;
  duration: number;
  zone: { top: number; left: number; width: number; height: number };
}

interface EventsState {
  data: Event[];
  activeRectangles: Event[];
}

const initialState: EventsState = {
  data: [],
  activeRectangles: [],
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.data = action.payload;
    },
    setActiveRectangles: (state, action: PayloadAction<Event[]>) => {
      state.activeRectangles = action.payload;
    },
  },
});

export const { setEvents, setActiveRectangles } = eventsSlice.actions;
export default eventsSlice.reducer;
