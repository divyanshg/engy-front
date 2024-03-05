import 'video.js/dist/video-js.css';
import 'videojs-flash';

import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';

const VideoJs = ({ videoUrl }) => {
  const videoNode = useRef(null);
  let player = null;

  useEffect(() => {
    const videoJsOptions = {
      aspectRatio: "16:9",
      autoplay: true,
      controls: true,
      techOrder: ["flash"],
      flash: {
        swf: "https://unpkg.com/@brightcove/videojs-flashls-source-handler/dist/video-js.swf",
      },
      sources: [
        {
          src: videoUrl,
        },
      ],
    };
    // instantiate Video.js
    player = videojs(
      videoNode.current,
      videoJsOptions,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [videoUrl]);

  return (
    <div>
      <div data-vjs-player>
        <video ref={videoNode} className="video-js" />
      </div>
    </div>
  );
};

export default VideoJs;
