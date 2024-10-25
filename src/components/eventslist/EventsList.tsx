import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useState } from "react";
import "../../App.css";

const EventsList = ({ player }: { player: any }) => {
  const events = useSelector((state: RootState) => state.events.data);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 14;

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleEventClick = (timestamp: number) => {
    if (player) {
      player.ready(() => {
        player.currentTime(timestamp);
        player.play();
      });
    } else {
      console.error("Player is not initialized");
    }
  };

  const formatTime = (seconds: number) => {
    const totalMilliseconds = Math.floor(seconds * 1000);
    const minutes = Math.floor(totalMilliseconds / 60000);
    const secondsPart = Math.floor((totalMilliseconds % 60000) / 1000);
    const ms = totalMilliseconds % 1000;

    return `${String(minutes).padStart(2, "0")}:${String(secondsPart).padStart(
      2,
      "0"
    )}:${String(ms).padStart(3, "0")}`;
  };

  const totalPages = Math.ceil(events.length / eventsPerPage);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {currentEvents.map((event) => (
          <li
            key={event.timestamp}
            onClick={() => handleEventClick(event.timestamp)}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "5px",
              cursor: "pointer",
              display: "inline-block",
              width: "200px",
              textAlign: "center",
            }}
          >
            {formatTime(event.timestamp)}
          </li>
        ))}
      </ul>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`paginationButton ${
              currentPage === index + 1 ? "activePaginationButton" : ""
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
