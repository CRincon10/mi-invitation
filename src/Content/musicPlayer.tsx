import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [autoplayBlocked, setAutoplayBlocked] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;

            // Intentar reproducir al cargar (algunos navegadores lo permiten)
            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                })
                .catch(() => {
                    setIsPlaying(false);
                    setAutoplayBlocked(true);
                });
        }

        const handleScroll = () => {
            if (audioRef.current && !isPlaying) {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                        setAutoplayBlocked(false);
                        window.removeEventListener("scroll", handleScroll);
                    })
                    .catch(() => {
                        setAutoplayBlocked(true);
                    });
            }
        };

        // Agrega evento de scroll
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isPlaying]);

    useEffect(() => {
        if (autoplayBlocked) {
            // Si el autoplay está bloqueado, intenta reproducir al hacer clic
            const handleClick = () => {
                if (audioRef.current && !isPlaying) {
                    audioRef.current.play()
                        .then(() => {
                            setIsPlaying(true);
                            setAutoplayBlocked(false);
                            window.removeEventListener("click", handleClick);
                        })
                        .catch(() => {
                            setAutoplayBlocked(true);
                        });
                }
            };

            window.addEventListener("click", handleClick);

            return () => {
                window.removeEventListener("click", handleClick);
            };
        }
    }, [autoplayBlocked, isPlaying]);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                    setAutoplayBlocked(false);
                })
                .catch(() => {
                    setAutoplayBlocked(true);
                });
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                zIndex: 9999,
            }}
        >
            <audio ref={audioRef} src="/audio.mp3" loop />
            <button
                onClick={toggleMusic}
                style={{
                    backgroundColor: "#ffffffcc",
                    border: "none",
                    borderRadius: "50px",
                    padding: "10px 16px",
                    fontSize: "16px",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    backdropFilter: "blur(6px)",
                }}
            >
                {isPlaying ? "🔊" : "🔇"}
            </button>
        </div>
    );
}
