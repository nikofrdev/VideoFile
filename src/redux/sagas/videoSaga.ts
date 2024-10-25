import { select, put, takeEvery } from "redux-saga/effects";
import { setActiveRectangles } from "../slices/eventsSlice";
import { RootState } from "../../store";

interface Event {
  timestamp: number;
  duration: number;
  zone: { top: number; left: number; width: number; height: number };
}

function* watchVideoTime(): Generator {
  const videoTime: number = (yield select(
    (state: RootState) => state.video.videoTime
  )) as unknown as number;
  const events: Event[] = (yield select(
    (state: RootState) => state.events.data
  )) as unknown as Event[];

  const activeEvents = events.filter(
    (event: Event) =>
      videoTime >= event.timestamp &&
      videoTime <= event.timestamp + event.duration
  );
  yield put(setActiveRectangles(activeEvents));
}

export function* videoSaga() {
  yield takeEvery("video/setVideoTime", watchVideoTime);
}
