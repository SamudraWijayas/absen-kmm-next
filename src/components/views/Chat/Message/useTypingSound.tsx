import { useRef, useEffect } from "react";

const useTypingSound = (usersTyping: number[], interval = 1200) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/sounds/writing-text.wav");
      audioRef.current.volume = 0.1;
    }
  }, []);

  useEffect(() => {
    if (usersTyping.length > 0) {
      // kalau belum ada interval → mulai
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          const clone = audioRef.current?.cloneNode(true) as HTMLAudioElement;
          clone?.play().catch(() => {});
        }, interval);
      }
    } else {
      // kalau sudah tidak ada yang mengetik → stop
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [usersTyping.length, interval]); // 🔥 cuma length, bukan array full
};

export default useTypingSound;
