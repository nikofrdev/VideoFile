declare module 'react-video-js-player' {
    import React from 'react';
  
    interface VideoProps {
      src: string;
      poster?: string;
      controls?: boolean;
      autoplay?: boolean;
      width?: string | number;
      height?: string | number;
      onReady?: (player: any) => void;
      onPlay?: () => void;
      onPause?: () => void;
      onTimeUpdate?: (e: any) => void;
      onEnd?: () => void;
      ref?: React.Ref<any>;
    }
  
    const VideoPlayer: React.FC<VideoProps>;
    export default VideoPlayer;
  }
  