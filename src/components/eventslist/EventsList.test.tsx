import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EventsList from "./EventsList";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { RootState } from "../../store";

const mockStore = configureStore([]);

describe("EventsList", () => {
  let store: ReturnType<typeof mockStore>;
  let playerMock: any;

  beforeEach(() => {
    const initialState: RootState = {
      video: { playing: false, videoTime: 0 },
      events: {
        data: [
          {
            timestamp: 60,
            duration: 5,
            zone: { top: 10, left: 10, width: 100, height: 100 },
          },
          {
            timestamp: 120,
            duration: 5,
            zone: { top: 20, left: 20, width: 100, height: 100 },
          },
        ],
        activeRectangles: [],
      },
    };
    store = mockStore(initialState);

    playerMock = {
      ready: jest.fn((callback) => callback()),
      currentTime: jest.fn(),
      play: jest.fn(),
    };
  });

  it("рендерит список событий", () => {
    render(
      <Provider store={store}>
        <EventsList player={playerMock} />
      </Provider>
    );

    const eventItems = screen.getAllByRole("listitem");
    expect(eventItems).toHaveLength(2);
    expect(eventItems[0]).toHaveTextContent("01:00");
    expect(eventItems[1]).toHaveTextContent("02:00");
  });

  it("вызывает перемотку видео при клике на событие", () => {
    render(
      <Provider store={store}>
        <EventsList player={playerMock} />
      </Provider>
    );

    const eventItems = screen.getAllByRole("listitem");
    fireEvent.click(eventItems[0]);

    expect(playerMock.currentTime).toHaveBeenCalledWith(60);
    expect(playerMock.play).toHaveBeenCalled();
  });
});
