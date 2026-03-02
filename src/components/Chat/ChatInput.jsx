"use client";

import { useState, useRef, useEffect } from "react";

export default function ChatInput({ onSendMessage, isLoading }) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef(null);

  // Auto-resize du textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "24px";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    onSendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className="pb-4 px-4 flex-shrink-0 transition-colors">
      <div className="max-w-3xl mx-auto">
        <div
          className={`flex items-end gap-2 bg-white dark:bg-gray-700 rounded-full p-2 border transition-all duration-300 ${
            isLoading
              ? "border-gray-200 dark:border-gray-600 opacity-75"
              : isFocused
                ? "border-emerald-400 shadow-lg shadow-emerald-100 dark:shadow-emerald-900/30"
                : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
          }`}
        >
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={
              isLoading ? "En attente..." : "Posez votre question..."
            }
            rows={1}
            disabled={isLoading}
            className="flex-1 px-3 bg-transparent resize-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 py-2 leading-6 disabled:cursor-not-allowed"
            style={{ minHeight: "24px", maxHeight: "120px" }}
          />

          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className={`p-3 cursor-pointer rounded-full transition-all duration-200 flex-shrink-0 ${
              inputValue.trim() && !isLoading
                ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md hover:shadow-lg active:scale-95"
                : "bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
        </div>

        <p
          className={`hidden sm:block text-xs text-center mt-2 transition-colors ${isFocused ? "text-emerald-500" : "text-gray-400 dark:text-gray-500"}`}
        >
          <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-mono mr-1">
            Entrée
          </kbd>
          pour envoyer
          <span className="mx-2">•</span>
          <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-mono mr-1">
            Shift + Entrée
          </kbd>
          nouvelle ligne
        </p>
      </div>
    </div>
  );
}
