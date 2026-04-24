"use client";

import { useEffect, useMemo, useRef, useState } from "react";

function fmt(t) {
  if (!isFinite(t) || t < 0) return "0:00";
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function HeroVideoWithPoster({ src, poster, className = "" }) {
  const vref = useRef(null);
  const raf = useRef(0);

  const [ready, setReady] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);
  const [vol, setVol] = useState(1);

  const progress = useMemo(() => (duration > 0 ? (time / duration) * 100 : 0), [time, duration]);

  const tick = () => {
    const v = vref.current;
    if (!v) return;
    setTime(v.currentTime || 0);
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  const startPlayback = async () => {
    const v = vref.current;
    if (!v) return;
    setShowPoster(false);
    try {
      await v.play();
    } catch (_) {}
  };

  const togglePlay = async () => {
    const v = vref.current;
    if (!v) return;
    if (showPoster) return startPlayback();
    if (v.paused) {
      try { await v.play(); } catch (_) {}
    } else {
      v.pause();
    }
  };

  const seekToPercent = (p) => {
    const v = vref.current;
    if (!v || !duration) return;
    const nt = Math.max(0, Math.min(duration, (p / 100) * duration));
    v.currentTime = nt;
    setTime(nt);
  };

  const toggleMute = () => {
    const v = vref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const setVolume = (x) => {
    const v = vref.current;
    if (!v) return;
    const nv = Math.max(0, Math.min(1, x));
    v.volume = nv;
    setVol(nv);
    if (nv > 0 && v.muted) {
      v.muted = false;
      setMuted(false);
    }
  };

  const toggleFs = async () => {
    const wrap = vref.current?.parentElement;
    if (!wrap) return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await wrap.requestFullscreen();
    } catch (_) {}
  };

  return (
    <div className={"relative h-full w-full overflow-hidden " + className}>
      <video
        ref={vref}
        className={"h-full w-full object-cover " + (showPoster ? "opacity-0 pointer-events-none" : "opacity-100")}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        onLoadedMetadata={(e) => {
          const d = e.currentTarget.duration || 0;
          setDuration(d);
          setReady(true);
        }}
        onPlay={() => {
          setPlaying(true);
          if (raf.current) cancelAnimationFrame(raf.current);
          raf.current = requestAnimationFrame(tick);
        }}
        onPause={() => {
          setPlaying(false);
          if (raf.current) cancelAnimationFrame(raf.current);
        }}
        onEnded={() => {
          setPlaying(false);
          if (raf.current) cancelAnimationFrame(raf.current);
        }}
        onVolumeChange={(e) => {
          setMuted(e.currentTarget.muted);
          setVol(e.currentTarget.volume);
        }}
        controls={false}
      />

      {/* Poster overlay */}
      {showPoster && (
        <div className="absolute inset-0 z-20">
          <img src={poster} alt="" className="h-full w-full object-cover" draggable="false" />
          <button type="button" aria-label="Play video" onClick={startPlayback} className="absolute inset-0 grid place-items-center">
            <span className="h-[72px] w-[72px] rounded-full bg-black/70 text-white grid place-items-center text-2xl shadow-lg">
              ▶
            </span>
          </button>
        </div>
      )}

      {/* YouTube-like controls */}
      {!showPoster && (
        <div className="absolute inset-x-0 bottom-0 z-30 px-3 pb-3">
          <div className="rounded-xl bg-black/55 backdrop-blur border border-white/15 p-2">
            {/* progress bar */}
            <input
              aria-label="Seek"
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={ready ? progress : 0}
              onChange={(e) => seekToPercent(Number(e.target.value))}
              className="w-full accent-red-500"
            />

            <div className="mt-2 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={togglePlay}
                  className="h-9 w-9 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white grid place-items-center"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? "❚❚" : "▶"}
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="h-9 w-9 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white grid place-items-center"
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {muted ? "🔇" : "🔊"}
                </button>

                <input
                  aria-label="Volume"
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={muted ? 0 : vol}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-[90px] accent-red-500"
                />

                <div className="text-xs text-white/90 tabular-nums">
                  {fmt(time)} / {fmt(duration)}
                </div>
              </div>

              <button
                type="button"
                onClick={toggleFs}
                className="h-9 px-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm"
                aria-label="Fullscreen"
              >
                ⛶
              </button>
            </div>
          </div>
        </div>
      )}

      {/* click on video toggles play/pause like YouTube */}
      {!showPoster && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Toggle playback"
          className="absolute inset-0 z-10"
          style={{ background: "transparent" }}
        />
      )}
    </div>
  );
}
