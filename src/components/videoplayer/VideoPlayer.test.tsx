import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import VideoPlayer from "./VideoPlayer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { RootState } from "../../store";

const mockStore = configureStore([]);

describe("VideoPlayer", () => {
  let store: ReturnType<typeof mockStore>;

  beforeAll(() => {
    Object.defineProperty(HTMLMediaElement.prototype, "load", {
      configurable: true,
      value: jest.fn(),
    });

    Object.defineProperty(HTMLMediaElement.prototype, "play", {
      configurable: true,
      value: jest.fn().mockResolvedValue(""),
    });

    Object.defineProperty(HTMLMediaElement.prototype, "pause", {
      configurable: true,
      value: jest.fn(),
    });
  });

  beforeEach(() => {
    const initialState: RootState = {
      video: { playing: false, videoTime: 0 },
      events: { data: [], activeRectangles: [] },
    };
    store = mockStore(initialState);
  });

  it("вызывает setPlayer после рендеринга", async () => {
    const setPlayerMock = jest.fn();

    render(
      <Provider store={store}>
        <VideoPlayer setPlayer={setPlayerMock} />
      </Provider>
    );

    await waitFor(() => {
      expect(setPlayerMock).toHaveBeenCalled();
    });
  });

  it("начинает воспроизведение при клике", async () => {
    const setPlayerMock = jest.fn();

    render(
      <Provider store={store}>
        <VideoPlayer setPlayer={setPlayerMock} />
      </Provider>
    );

    await waitFor(() => {
      expect(setPlayerMock).toHaveBeenCalled();
    });

    const videoElement = screen.getByRole("button");
    fireEvent.click(videoElement);

    expect(setPlayerMock).toHaveBeenCalledTimes(1);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
