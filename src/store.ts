import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import videoReducer from "./redux/slices/videoSlice";
import eventsReducer from "./redux/slices/eventsSlice";
import { videoSaga } from "./redux/sagas/videoSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    video: videoReducer,
    events: eventsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(videoSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
