import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import "../../App.css";

const RectanglesOverlay = ({ player }: { player: any }) => {
  const events = useSelector((state: RootState) => state.events.data);
  const [activeEvents, setActiveEvents] = useState<any[]>([]);

  useEffect(() => {
    if (!player) return;

    const handleTimeUpdate = () => {
      const currentTime = player.currentTime();

      const currentActiveEvents = events.filter(
        (event) =>
          currentTime >= event.timestamp &&
          currentTime <= event.timestamp + event.duration
      );
      setActiveEvents(currentActiveEvents);
    };

    player.on("timeupdate", handleTimeUpdate);

    return () => {
      player.off("timeupdate", handleTimeUpdate);
    };
  }, [events, player]);

  const videoWidth = 720;
  const videoHeight = 420;

  return (
    <div className="rectanglesOverlay">
      {activeEvents.map((event) => {
        const zone = event.zone;

        if (!zone) return null;

        const left = (zone.left / 1280) * videoWidth;
        const top = (zone.top / 720) * videoHeight;
        const width = (zone.width / 1280) * videoWidth;
        const height = (zone.height / 720) * videoHeight;

        return (
          <div
            key={event.timestamp}
            data-testid="rectangle"
            className="rectangle"
            style={{
              position: "absolute",
              top: `${top}px`,
              left: `${left}px`,
              width: `${width}px`,
              height: `${height}px`,
            }}
          />
        );
      })}
    </div>
  );
};

export default RectanglesOverlay;
