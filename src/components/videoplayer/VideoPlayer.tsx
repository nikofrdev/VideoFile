import { useRef, useEffect } from "react";
import VideoJS from "react-video-js-player";
import { useDispatch, useSelector } from "react-redux";
import { setPlaying } from "../../redux/slices/videoSlice";
import { RootState } from "../../store";

interface VideoPlayerProps {
  setPlayer: (player: any) => void;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ setPlayer }) => {
  const playerRef = useRef<any>(null);
  const dispatch = useDispatch();
  const { playing } = useSelector((state: RootState) => state.video);

  const videoSrc =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  useEffect(() => {
    if (playerRef.current && playerRef.current.player) {
      playerRef.current.player.on("ready", () => {
        setPlayer(playerRef.current.player);
        playerRef.current.player.on("canplaythrough", () => {
          if (playing) {
            playerRef.current.player.play();
          }
        });
      });
    }
  }, [setPlayer, playing]);

  const handleClick = () => {
    if (playerRef.current && playerRef.current.player) {
      if (playing) {
        playerRef.current.player.pause();
      } else {
        playerRef.current.player.play();
      }
      dispatch(setPlaying(!playing));
    }
  };

  return (
    <div onClick={handleClick}>
      <VideoJS
        ref={playerRef}
        controls={true}
        src={videoSrc}
        width="720"
        height="420"
        autoplay={false}
      />
    </div>
  );
};

export default VideoPlayer;
