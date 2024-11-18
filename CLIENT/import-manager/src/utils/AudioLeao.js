import React, { useState } from "react";
import ReactHowler from "react-howler";

function AudioPlayer() {
  const [playing, setPlaying] = useState(false);

  return (
    <div>
      <ReactHowler src="/audio/leao.mp3" playing={playing} />
      <button onClick={() => setPlaying(true)}>Play</button>
      <button onClick={() => setPlaying(false)}>Pause</button>
    </div>
  );
}

export default AudioPlayer;
