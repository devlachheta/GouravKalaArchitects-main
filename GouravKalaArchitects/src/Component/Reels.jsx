import { useEffect, useRef, useState } from "react";
import {
  FiVolume2,
  FiVolumeX,
  FiPlay,
  FiPause,
} from "react-icons/fi";
import "../styles/reels.css";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000";

const GAP = 18;

function Reels() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);
  const [step, setStep] = useState(0);
  const [transitionEnabled, setTransitionEnabled] =
    useState(true);
  const [playingVideos, setPlayingVideos] = useState({});
  const [mutedVideos, setMutedVideos] = useState({});

  const trackRef = useRef(null);
  const intervalRef = useRef(null);
  const videoRefs = useRef({});

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;

      if (width >= 1200) {
        setVisibleCount(5);
      } else if (width >= 900) {
        setVisibleCount(4);
      } else if (width >= 600) {
        setVisibleCount(3);
      } else {
        setVisibleCount(2);
      }
    };

    updateVisibleCount();

    window.addEventListener(
      "resize",
      updateVisibleCount
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateVisibleCount
      );
    };
  }, []);

  useEffect(() => {
    const fetchReels = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_BASE_URL}/api/reels/`
        );

        if (!response.ok) {
          throw new Error(
            `Reels API error: ${response.status}`
          );
        }

        const data = await response.json();

        const results = Array.isArray(data)
          ? data
          : data.results || [];

        setReels(results);
      } catch (error) {
        console.error(
          "Error fetching reels:",
          error
        );

        setReels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  const getVideoUrl = (video) => {
    if (!video) {
      return "";
    }

    if (
      video.startsWith("http://") ||
      video.startsWith("https://")
    ) {
      return video;
    }

    return `${API_BASE_URL}${video.startsWith("/") ? "" : "/"
      }${video}`;
  };

  const canRotate =
    reels.length > visibleCount;

  useEffect(() => {
    if (!trackRef.current) {
      return;
    }

    const firstCard =
      trackRef.current.querySelector(
        ".reel-card"
      );

    if (!firstCard) {
      return;
    }

    const cardWidth =
      firstCard.getBoundingClientRect().width;

    setStep(cardWidth + GAP);
  }, [
    reels.length,
    visibleCount,
  ]);

  useEffect(() => {
    const measureStep = () => {
      if (!trackRef.current) {
        return;
      }

      const firstCard =
        trackRef.current.querySelector(
          ".reel-card"
        );

      if (!firstCard) {
        return;
      }

      const cardWidth =
        firstCard.getBoundingClientRect().width;

      setStep(cardWidth + GAP);
    };

    measureStep();

    window.addEventListener(
      "resize",
      measureStep
    );

    return () => {
      window.removeEventListener(
        "resize",
        measureStep
      );
    };
  }, [
    reels.length,
    visibleCount,
  ]);

  useEffect(() => {
    if (
      !canRotate ||
      !isAutoRotating ||
      step <= 0
    ) {
      return;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex(
        (previousIndex) =>
          previousIndex + 1
      );
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(
          intervalRef.current
        );

        intervalRef.current = null;
      }
    };
  }, [
    canRotate,
    isAutoRotating,
    step,
  ]);

  useEffect(() => {
    if (
      !canRotate ||
      currentIndex !== reels.length
    ) {
      return;
    }

    const timer = setTimeout(() => {
      setTransitionEnabled(false);
      setCurrentIndex(0);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }, 750);

    return () => {
      clearTimeout(timer);
    };
  }, [
    currentIndex,
    reels.length,
    canRotate,
  ]);

  useEffect(() => {
    setCurrentIndex(0);
    setTransitionEnabled(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransitionEnabled(true);
      });
    });
  }, [
    reels.length,
    visibleCount,
  ]);

  const handleVideoClick = () => {
    setIsAutoRotating(false);
  };

  const handlePlayPause = (key) => {
    const video = videoRefs.current[key];

    if (!video) {
      return;
    }

    if (video.paused) {
      video
        .play()
        .then(() => {
          setPlayingVideos((previous) => ({
            ...previous,
            [key]: true,
          }));
        })
        .catch((error) => {
          console.error(
            "Unable to play video:",
            error
          );
        });
    } else {
      video.pause();

      setPlayingVideos((previous) => ({
        ...previous,
        [key]: false,
      }));
    }
  };

  const handleMuteToggle = (key) => {
    const video = videoRefs.current[key];

    if (!video) {
      return;
    }

    const newMutedState = !video.muted;

    video.muted = newMutedState;

    setMutedVideos((previous) => ({
      ...previous,
      [key]: newMutedState,
    }));
  };

  const handleResume = () => {
    setIsAutoRotating(true);
  };

  if (loading) {
    return null;
  }

  if (!reels.length) {
    return null;
  }

  const displayReels = canRotate
    ? [
      ...reels,
      ...reels.slice(
        0,
        visibleCount
      ),
    ]
    : reels;

  const translateX =
    currentIndex * step;

  return (
    <section className="reels-section">
      <div className="reels-viewport">
        <div
          ref={trackRef}
          className="reels-track"
          style={{
            transform: `translate3d(-${translateX}px, 0, 0)`,
            transition: transitionEnabled
              ? "transform 0.7s ease"
              : "none",
          }}
        >
          {displayReels.map(
            (reel, index) => {
              const key =
                `${reel.id}-${index}`;

              const videoUrl =
                getVideoUrl(
                  reel.video
                );

              const isPlaying =
                playingVideos[key] ??
                true;

              const isMuted =
                mutedVideos[key] ??
                true;

              return (
                <div
                  className="reel-card"
                  key={key}
                >
                  <video
                    ref={(element) => {
                      if (element) {
                        videoRefs.current[
                          key
                        ] = element;
                      }
                    }}
                    className="reel-video"
                    src={videoUrl}
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    preload="auto"
                    onClick={handleVideoClick}
                    onPlay={() => {
                      setPlayingVideos(
                        (previous) => ({
                          ...previous,
                          [key]: true,
                        })
                      );
                    }}
                    onPause={() => {
                      setPlayingVideos(
                        (previous) => ({
                          ...previous,
                          [key]: false,
                        })
                      );
                    }}
                  />

                  <div className="reel-controls">
                    <button
                      type="button"
                      className="reel-control-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handlePlayPause(
                          key
                        );
                      }}
                    >
                      {isPlaying ? (
                        <FiPause />
                      ) : (
                        <FiPlay />
                      )}
                    </button>

                    <button
                      type="button"
                      className="reel-control-button"
                      onClick={(event) => {
                        event.stopPropagation();
                        handleMuteToggle(
                          key
                        );
                      }}
                    >
                      {isMuted ? (
                        <FiVolumeX />
                      ) : (
                        <FiVolume2 />
                      )}
                    </button>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>

      {canRotate &&
        !isAutoRotating && (
          <button
            type="button"
            className="reels-resume-button"
            onClick={handleResume}
          >
            Resume
          </button>
        )}
    </section>
  );
}

export default Reels;