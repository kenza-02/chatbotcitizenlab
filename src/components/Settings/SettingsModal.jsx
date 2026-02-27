"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function SettingsModal({ isOpen, onClose }) {
  const { darkMode, toggleDarkMode } = useTheme();
  const [notifications, setNotifications] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Paramètres</h2>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Profil */}
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-400 uppercase mb-3">Mon profil</p>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-lg">MA</span>
            </div>
            <div>
              <p className="font-medium text-gray-800 dark:text-white">Marie Dupont</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">marie.dupont@email.fr</p>
            </div>
          </div>
        </div>

        {/* Apparence */}
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-400 uppercase mb-3">Apparence</p>
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <span className="text-gray-700 dark:text-gray-200">Mode sombre</span>
            <button
              onClick={toggleDarkMode}
              className={`w-12 h-6 rounded-full relative transition-colors ${darkMode ? "bg-emerald-500" : "bg-gray-300"}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${darkMode ? "right-1" : "left-1"}`} />
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="mb-6">
          <p className="text-xs font-medium text-gray-400 uppercase mb-3">Notifications</p>
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <span className="text-gray-700 dark:text-gray-200">Notifications push</span>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-6 rounded-full relative transition-colors ${notifications ? "bg-emerald-500" : "bg-gray-300"}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${notifications ? "right-1" : "left-1"}`} />
            </button>
          </div>
        </div>

        {/* Actions */}
        <button className="w-full p-3 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-medium hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors">
          Se déconnecter
        </button>
      </div>
    </div>
  );
}