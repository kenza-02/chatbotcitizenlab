"use client";

import { useState } from "react";

export default function ChatInput({ onSendMessage, isLoading }) {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    onSendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex-shrink-0 transition-colors">
      <div className="max-w-3xl mx-auto">
        <div
          className={`flex items-end gap-3 bg-gray-50 dark:bg-gray-700 rounded-2xl p-2 border-2 transition-all duration-300 ${
            isLoading
              ? "border-gray-200 dark:border-gray-600 opacity-75"
              : isFocused
              ? "border-emerald-400 shadow-lg shadow-emerald-100 dark:shadow-emerald-900/30"
              : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
          }`}
        >
          <button
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-400 transition-all disabled:opacity-50"
            disabled={isLoading}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>

          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handleSend())}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={isLoading ? "En attente..." : "Posez votre question..."}
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-transparent resize-none outline-none text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 py-2 max-h-32 disabled:cursor-not-allowed"
          />

          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isLoading}
            className={`p-3 rounded-xl transition-all duration-300 ${
              inputValue.trim() && !isLoading
                ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md hover:shadow-lg"
                : "bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>

        <p className={`text-xs text-center mt-2 ${isFocused ? "text-emerald-500" : "text-gray-400 dark:text-gray-500"}`}>
          Veuillez utiliser la touche "Entrée" pour envoyer votre message.
        </p>
      </div>
    </div>
  );
}