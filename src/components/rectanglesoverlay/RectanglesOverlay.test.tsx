import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RectanglesOverlay from "./RectanglesOverlay";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { RootState } from "../../store";

const mockStore = configureStore([]);

describe("RectanglesOverlay", () => {
  let store: ReturnType<typeof mockStore>;
  let playerMock: any;

  beforeEach(() => {
    const initialState: RootState = {
      video: { playing: false, videoTime: 5 },
      events: {
        data: [
          {
            timestamp: 3,
            duration: 5,
            zone: { top: 10, left: 10, width: 100, height: 100 },
          },
        ],
        activeRectangles: [],
      },
    };
    store = mockStore(initialState);

    playerMock = {
      currentTime: jest.fn(() => 5),
      on: jest.fn((event, callback) => callback()),
      off: jest.fn(),
    };
  });

  it("рендерит активные прямоугольники", () => {
    render(
      <Provider store={store}>
        <RectanglesOverlay player={playerMock} />
      </Provider>
    );

    const rectangles = screen.getAllByTestId("rectangle");
    expect(rectangles.length).toBeGreaterThan(0);
  });

  it("правильно добавляет и удаляет обработчики времени", () => {
    const { unmount } = render(
      <Provider store={store}>
        <RectanglesOverlay player={playerMock} />
      </Provider>
    );

    expect(playerMock.on).toHaveBeenCalledWith(
      "timeupdate",
      expect.any(Function)
    );

    unmount();
    expect(playerMock.off).toHaveBeenCalledWith(
      "timeupdate",
      expect.any(Function)
    );
  });

  it("вычисляет правильные позиции и размеры для прямоугольников", () => {
    render(
      <Provider store={store}>
        <RectanglesOverlay player={playerMock} />
      </Provider>
    );
    const rectangle = screen.getByTestId("rectangle");
    const styles = window.getComputedStyle(rectangle);

    expect(parseFloat(styles.top)).toBeCloseTo(5.83, 2);
    expect(parseFloat(styles.left)).toBeCloseTo(5.63, 2);
    expect(parseFloat(styles.width)).toBeCloseTo(56.25, 2);
    expect(parseFloat(styles.height)).toBeCloseTo(58.33, 2);
  });
});
