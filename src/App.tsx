import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import VideoPlayer from "./components/videoplayer/VideoPlayer";
import RectanglesOverlay from "./components/rectanglesoverlay/RectanglesOverlay";
import EventsList from "./components/eventslist/EventsList";
import { fetchEvents } from "./api/eventsApi";
import { setEvents } from "./redux/slices/eventsSlice";
import "./App.css";

const App = () => {
  const [player, setPlayer] = useState<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await fetchEvents();
        dispatch(setEvents(events));
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };
    loadEvents();
  }, [dispatch]);

  return (
    <div className="appContainer">
      <div className="videoContainer">
        <VideoPlayer setPlayer={setPlayer} />
        {player && <RectanglesOverlay player={player} />}
      </div>

      <EventsList player={player} />
    </div>
  );
};

export default App;
