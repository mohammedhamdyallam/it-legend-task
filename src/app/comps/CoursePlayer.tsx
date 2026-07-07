// components/CoursePlayer.tsx
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaArrowsAltH,
  FaCompressArrowsAlt,
} from "react-icons/fa";

interface CoursePlayerProps {
  videoSrc?: string;
  videoPoster?: string;
  title?: string;
}

export default function CoursePlayer({
  videoSrc,
  videoPoster,
}: CoursePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isWide, setIsWide] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [stickyHeight, setStickyHeight] = useState(0);
  const [wideHeight, setWideHeight] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const stickyAnchorRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastVolumeRef = useRef(1);

  // Auto-hide controls (only re-arm when play state changes, not on every hide)
  useEffect(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying && showControls) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  // Sticky behaviour on mobile scroll (like YouTube), with a placeholder so
  // layout doesn't jump.
  //
  // IMPORTANT: we must NOT read playerRef's own getBoundingClientRect() to
  // decide when to stick it. Once the player becomes `position: fixed`, it
  // leaves the normal document flow, so its own rect.top is reported
  // relative to the viewport and snaps back to ~0 immediately — which was
  // causing the sticky state to flicker on/off on every scroll tick.
  //
  // Instead we use a zero-height "anchor" div rendered right before the
  // player that always stays in normal flow. Its position never changes
  // regardless of whether the player is fixed, so it reliably tells us
  // whether we've scrolled past the player's original location.
  useEffect(() => {
    const handleScroll = () => {
      const anchor = stickyAnchorRef.current;
      const player = playerRef.current;
      if (!anchor || !player) return;

      if (window.innerWidth < 768 && isPlaying && !isFullscreen) {
        if (!isSticky) {
          // capture the player's rendered height while it's still in
          // normal flow, so the placeholder can reserve the same space
          setStickyHeight(player.getBoundingClientRect().height);
        }
        const anchorRect = anchor.getBoundingClientRect();
        setIsSticky(anchorRect.top < 0);
      } else {
        setIsSticky(false);
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isSticky, isFullscreen, isPlaying]);

  // Toggle play/pause (state is driven by the actual play/pause result, no double toggling)
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  // Handle progress update
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const pct =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(pct);
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration || 0);
    }
  };

  // Handle seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (video && video.duration) {
      const time = (parseFloat(e.target.value) / 100) * video.duration;
      video.currentTime = time;
      setProgress(parseFloat(e.target.value));
    }
  };

  // Handle volume
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (value > 0) lastVolumeRef.current = value;
    if (videoRef.current) {
      videoRef.current.volume = value;
      videoRef.current.muted = value === 0;
      setIsMuted(value === 0);
    }
  };

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isMuted) {
      // muting: remember current volume
      lastVolumeRef.current = volume || lastVolumeRef.current || 1;
      video.muted = true;
      setIsMuted(true);
    } else {
      // unmuting: restore last known volume
      const restored = lastVolumeRef.current || 1;
      video.muted = false;
      video.volume = restored;
      setVolume(restored);
      setIsMuted(false);
    }
  }, [isMuted, volume]);

  // Toggle fullscreen (correctly checks the current fullscreen state, with vendor fallbacks)
  const toggleFullscreen = useCallback(() => {
    const el = playerRef.current as (HTMLDivElement & {
      webkitRequestFullscreen?: () => Promise<void> | void;
    }) | null;
    const doc = document as Document & {
      webkitExitFullscreen?: () => Promise<void> | void;
      webkitFullscreenElement?: Element;
    };

    if (!document.fullscreenElement && !doc.webkitFullscreenElement) {
      if (el?.requestFullscreen) {
        el.requestFullscreen().catch(console.error);
      } else if (el?.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(console.error);
      } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
      }
    }
  }, []);

  // Listen for fullscreen change (keeps state in sync even if user exits via Esc)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const toggleWide = () => {
    if (!isWide && playerRef.current) {
      setWideHeight(playerRef.current.getBoundingClientRect().height);
    }
    setIsWide((prev) => !prev);
  };

  // Safety net: the Wide toggle button is hidden on mobile (md:flex), but if
  // the window is resized down to mobile width while wide mode is already
  // on, turn it off so it doesn't stay stuck as a full-screen overlay.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && isWide) {
        setIsWide(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isWide]);

  // Format time safely (avoids NaN:NaN before metadata loads)
  const formatTime = (time: number) => {
    if (!Number.isFinite(time) || time < 0) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Keyboard shortcuts — scoped to this player (via onKeyDown on the container)
  // instead of a document-level listener, so multiple players on one page
  // and other page inputs don't get hijacked.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLInputElement) return;

    switch (e.key) {
      case " ":
      case "k":
        e.preventDefault();
        togglePlay();
        break;
      case "f":
        toggleFullscreen();
        break;
      case "m":
        toggleMute();
        break;
      case "ArrowRight":
        if (videoRef.current) videoRef.current.currentTime += 10;
        break;
      case "ArrowLeft":
        if (videoRef.current) videoRef.current.currentTime -= 10;
        break;
    }
  };

  return (
    <div
      ref={containerRef}
      className="max-w-7xl mx-auto px-4 py-4 transition-all duration-300"
    >
      <div ref={stickyAnchorRef} aria-hidden="true" />
      {isSticky && <div style={{ height: stickyHeight }} />}
      {isWide && <div style={{ height: wideHeight }} />}

      {/* Player Container */}
      <div
        ref={playerRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={`bg-black rounded-xl overflow-hidden transition-all duration-300 outline-none ${
          isSticky || isWide
            ? "fixed top-0 left-0 z-50 w-full max-h-[80vh] shadow-xl"
            : "relative w-full"
        } ${isWide ? "rounded-none" : ""}`}
        style={{
          aspectRatio: "16/9",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          if (isPlaying) {
            setShowControls(false);
          }
        }}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={videoPoster}
          className="w-full h-full object-contain"
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setIsPlaying(false)}
        />

        {/* Controls Overlay */}
        <div
          className={`absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 ${
            showControls ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Center Play Button */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white hover:bg-white/90 transition-all flex items-center justify-center"
          >
            {isPlaying ? (
              <FaPause className="w-10 h-10 text-[#e54860]" />
            ) : (
              <FaPlay className="w-10 h-10 text-[#e54860] ml-1" />
            )}
          </button>

          {/* Bottom Controls */}
          {isPlaying && (
            <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
              {/* Progress Bar */}
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={handleSeek}
                aria-label="Seek"
                style={{
                  background: `linear-gradient(to right, #e54860 ${progress}%, rgba(255,255,255,0.3) ${progress}%)`,
                }}
                className="w-full h-1.5 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-600"
              />

              <div className="flex items-center justify-between text-white text-sm">
                <div className="flex items-center gap-4">
                  {/* Play/Pause */}
                  <button
                    onClick={togglePlay}
                    aria-label={isPlaying ? "Pause" : "Play"}
                    className="hover:text-red-500 transition-colors"
                  >
                    {isPlaying ? (
                      <FaPause className="w-5 h-5" />
                    ) : (
                      <FaPlay className="w-5 h-5" />
                    )}
                  </button>

                  {/* Volume */}
                  <div className="flex items-center gap-2 group">
                    <button
                      onClick={toggleMute}
                      aria-label={isMuted ? "Unmute" : "Mute"}
                      className="hover:text-red-500 transition-colors"
                    >
                      {isMuted || volume === 0 ? (
                        <FaVolumeMute className="w-5 h-5" />
                      ) : (
                        <FaVolumeUp className="w-5 h-5" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      aria-label="Volume"
                      className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  {/* Time */}
                  <span>
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Wide Mode (Desktop Only) */}
                  <button
                    onClick={toggleWide}
                    className="hidden md:flex hover:text-red-500 transition-colors"
                    title={isWide ? "Compress width" : "Expand width"}
                    aria-label={isWide ? "Compress width" : "Expand width"}
                  >
                    {isWide ? (
                      <FaCompressArrowsAlt className="w-5 h-5" />
                    ) : (
                      <FaArrowsAltH className="w-5 h-5" />
                    )}
                  </button>

                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
                    className="hover:text-red-500 transition-colors"
                  >
                    {isFullscreen ? (
                      <FaCompress className="w-5 h-5" />
                    ) : (
                      <FaExpand className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}