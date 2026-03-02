"use client";

import { platforms } from "@/data/demoData";

const colorClasses = {
  emerald: {
    border: "border-emerald-200 dark:border-emerald-800",
    hover: "hover:border-emerald-400 dark:hover:border-emerald-600",
    button: "bg-emerald-500 hover:bg-emerald-600",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300",
  },
  blue: {
    border: "border-blue-200 dark:border-blue-800",
    hover: "hover:border-blue-400 dark:hover:border-blue-600",
    button: "bg-blue-500 hover:bg-blue-600",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  },
  yellow: {
    border: "border-yellow-200 dark:border-yellow-800",
    hover: "hover:border-yellow-400 dark:hover:border-yellow-600",
    button: "bg-yellow-500 hover:bg-yellow-600",
    badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
  },
  green: {
    border: "border-green-200 dark:border-green-800",
    hover: "hover:border-green-400 dark:hover:border-green-600",
    button: "bg-green-500 hover:bg-green-600",
    badge: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
  },
  red: {
    border: "border-red-200 dark:border-red-800",
    hover: "hover:border-red-400 dark:hover:border-red-600",
    button: "bg-red-500 hover:bg-red-600",
    badge: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
  },
  orange: {
    border: "border-orange-200 dark:border-orange-800",
    hover: "hover:border-orange-400 dark:hover:border-orange-600",
    button: "bg-orange-500 hover:bg-orange-600",
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
  },
  purple: {
    border: "border-purple-200 dark:border-purple-800",
    hover: "hover:border-purple-400 dark:hover:border-purple-600",
    button: "bg-purple-500 hover:bg-purple-600",
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  },
};

export default function ProjectsGrid() {
  const handleVisit = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 mb-4">
            <span className="text-3xl">🌍</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Nos Plateformes CitizenLab
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 max-w-md mx-auto">
            Découvrez nos plateformes de participation citoyenne à travers l'Afrique
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform) => {
            const colors = colorClasses[platform.color] || colorClasses.emerald;
            
            return (
              <div
                key={platform.id}
                className={`group bg-white dark:bg-gray-800 rounded-2xl border-2 ${colors.border} ${colors.hover} overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}
              >
                <div className="relative h-40 bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <img
                    src={platform.logo}
                    alt={platform.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${colors.badge}`}>
                    {platform.country}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {platform.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {platform.description}
                  </p>

                  <button
                    onClick={() => handleVisit(platform.url)}
                    className={`w-full cursor-pointer flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-medium transition-all duration-200 ${colors.button}`}
                  >
                    <span>Visiter la plateforme</span>
                    <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700">
            <span className="text-lg">🌍</span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              7 pays • 7 plateformes actives
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}