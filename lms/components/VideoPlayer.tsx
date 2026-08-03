// =============================================================
// LMS Video Player — HLS (.m3u8) + mp4 playback ke saath:
//  - resume from last position (initialPosSec)
//  - playback speed control
//  - moving watermark overlay (phone/email) => anti-piracy deterrent
//  - onProgress (throttled) + onComplete callbacks
//
// Basic DRM layer (Phase 2). Full DRM (Widevine/signed URLs) Phase 3+
// me Mux/Cloudflare ke saath aayega — plan section 9.
// =============================================================

import React, { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  /** Watermark me dikhega — student ka phone/email (leak trace ke liye). */
  watermark?: string;
  initialPosSec?: number;
  onProgress?: (currentSec: number) => void;
  onComplete?: () => void;
};

const WATERMARK_POSITIONS = [
  { top: "12%", left: "8%" },
  { top: "12%", right: "8%" },
  { bottom: "18%", left: "8%" },
  { bottom: "18%", right: "8%" },
  { top: "45%", left: "40%" },
];

export default function VideoPlayer({ src, watermark, initialPosSec = 0, onProgress, onComplete }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [wmIndex, setWmIndex] = useState(0);
  const lastReport = useRef(0);
  const completed = useRef(false);

  const isHls = /\.m3u8($|\?)/i.test(src);

  // ---- Load source (hls.js for .m3u8 where not native) ----
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    let hls: { destroy: () => void } | null = null;
    let cancelled = false;

    const nativeHls = video.canPlayType("application/vnd.apple.mpegurl");

    if (isHls && !nativeHls) {
      // Browser me HLS native nahi (Chrome/Firefox) -> hls.js dynamically load.
      import("hls.js")
        .then(({ default: Hls }) => {
          if (cancelled) return;
          if (Hls.isSupported()) {
            const instance = new Hls({ maxBufferLength: 30 });
            instance.loadSource(src);
            instance.attachMedia(video);
            hls = instance;
          } else {
            video.src = src;
          }
        })
        .catch(() => {
          video.src = src;
        });
    } else {
      // mp4, ya Safari jaha HLS native chalta hai.
      video.src = src;
    }

    return () => {
      cancelled = true;
      if (hls) hls.destroy();
    };
  }, [src, isHls]);

  // ---- Resume position once metadata ready ----
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onMeta = () => {
      if (initialPosSec > 0 && initialPosSec < (video.duration || Infinity)) {
        video.currentTime = initialPosSec;
      }
    };
    video.addEventListener("loadedmetadata", onMeta);
    return () => video.removeEventListener("loadedmetadata", onMeta);
  }, [initialPosSec]);

  // ---- Progress + complete reporting ----
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTime = () => {
      const t = video.currentTime;
      // Throttle: har ~15s me ek baar report.
      if (t - lastReport.current >= 15) {
        lastReport.current = t;
        onProgress?.(t);
      }
      // 95% dekh liya -> complete.
      if (!completed.current && video.duration && t / video.duration >= 0.95) {
        completed.current = true;
        onComplete?.();
      }
    };
    const onEnded = () => {
      if (!completed.current) {
        completed.current = true;
        onComplete?.();
      }
    };

    video.addEventListener("timeupdate", onTime);
    video.addEventListener("ended", onEnded);
    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("ended", onEnded);
    };
  }, [onProgress, onComplete, src]);

  // ---- Watermark position rotate every 8s ----
  useEffect(() => {
    if (!watermark) return;
    const iv = setInterval(() => {
      setWmIndex((i) => (i + 1) % WATERMARK_POSITIONS.length);
    }, 8000);
    return () => clearInterval(iv);
  }, [watermark]);

  function setSpeed(rate: number) {
    if (videoRef.current) videoRef.current.playbackRate = rate;
  }

  return (
    <div style={{ position: "relative", width: "100%", background: "#000", borderRadius: 12, overflow: "hidden" }}>
      <video
        ref={videoRef}
        controls
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
        playsInline
        style={{ width: "100%", display: "block", aspectRatio: "16 / 9", background: "#000" }}
      />

      {/* Moving watermark (leak hone par is number se pakda jayega) */}
      {watermark && (
        <div
          style={{
            position: "absolute",
            ...WATERMARK_POSITIONS[wmIndex],
            pointerEvents: "none",
            color: "rgba(255,255,255,0.35)",
            fontSize: 12,
            fontWeight: 700,
            textShadow: "0 1px 2px rgba(0,0,0,0.6)",
            transition: "all 0.6s ease",
            userSelect: "none",
          }}
        >
          {watermark}
        </div>
      )}

      {/* Speed control */}
      <div style={{ position: "absolute", top: 8, left: 8, display: "flex", gap: 6, pointerEvents: "auto" }}>
        {[1, 1.25, 1.5, 2].map((r) => (
          <button
            key={r}
            onClick={() => setSpeed(r)}
            style={{
              fontSize: 11,
              fontWeight: 800,
              padding: "3px 8px",
              borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.25)",
              background: "rgba(0,0,0,0.45)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            {r}x
          </button>
        ))}
      </div>
    </div>
  );
}
