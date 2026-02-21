"use client";

import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useState, useEffect, useRef } from "react";
import { Smile } from "lucide-react";

interface EmojiProps {
  value: string;
  onChange: (val: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const Emoji = ({ value, onChange, inputRef }: EmojiProps) => {
  const [showEmoji, setShowEmoji] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const cursor = inputRef.current?.selectionStart ?? value.length;
    const newValue =
      value.slice(0, cursor) + emojiData.emoji + value.slice(cursor);

    onChange(newValue);

    // fokus kembali ke input
    setTimeout(() => inputRef.current?.focus(), 0);

    setShowEmoji(false);
  };

  useEffect(() => {
    // tutup picker kalau klik di luar
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowEmoji(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex item-center" ref={pickerRef}>
      {showEmoji && (
        <div className="absolute bottom-12 left-0 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowEmoji(!showEmoji)}
        className="text-gray-500 hover:text-primary"
      >
        <Smile size={25} />
      </button>
    </div>
  );
};

export default Emoji;
