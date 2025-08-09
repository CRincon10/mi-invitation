import { useRef, useState } from "react";

export default function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.volume = 0.5;
            audioRef.current.play()
                .then(() => {
                    setIsPlaying(true);
                })
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                zIndex: 99999,
                pointerEvents: "auto",
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
                    color: "#333",
                    pointerEvents: "auto",
                }}
            >
                <span  className={`color-gold fas ${isPlaying ? "fa-volume-xmark" : "fa-volume-up"}`} />
            </button>
        </div>
    );
}
