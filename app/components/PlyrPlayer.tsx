"use client";

import { useEffect, useRef } from "react";
import "plyr/dist/plyr.css";

type Props = {
  src: string;
  poster?: string;
  autoPlay?: boolean;
};

export default function PlyrPlayer({ src, poster, autoPlay = true }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const plyrRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!videoRef.current) return;
      if (typeof window === "undefined" || typeof document === "undefined") return;

      try {
        const mod = await import("plyr");
        const Plyr = mod?.default || mod;

        if (cancelled || !videoRef.current) return;

        try {
          plyrRef.current?.destroy?.();
        } catch {}

        plyrRef.current = new Plyr(videoRef.current, {
          autoplay: autoPlay,
          controls: [
            "play-large",
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "fullscreen",
          ],
        });
      } catch (err) {
        console.error("Plyr init failed:", err);
      }
    }

    init();

    return () => {
      cancelled = true;
      try {
        plyrRef.current?.destroy?.();
      } catch {}
    };
  }, [src, poster, autoPlay]);

  return (
    <video
      ref={videoRef}
      className="h-full w-full"
      controls
      playsInline
      preload="metadata"
      poster={poster}
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}
