import { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = 0.5;
            audioRef.current.play().catch(() => {
                // Algunos navegadores requieren interacción
                setIsPlaying(false);
            });
        }
    }, []);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        setIsPlaying(!isPlaying);
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
                    fontSize: "14px",
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
