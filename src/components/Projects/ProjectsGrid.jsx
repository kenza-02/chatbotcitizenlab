"use client";

import { demoProjects } from "@/data/demoData";

export default function ProjectsGrid({ selectedProject, onSelectProject }) {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900 mb-4">
            <span className="text-3xl">🏛️</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Choisissez un projet
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Sélectionnez le service avec lequel vous souhaitez interagir
          </p>
        </div>

        {/* Grille de projets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {demoProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => onSelectProject(project)}
              className={`group cursor-pointer p-6 rounded-2xl text-left transition-all duration-300 transform hover:scale-105 ${
                selectedProject.id === project.id
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200 dark:shadow-emerald-900/50"
                  : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-lg"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${
                    selectedProject.id === project.id
                      ? "bg-white/20"
                      : "bg-emerald-100 dark:bg-emerald-900/50"
                  }`}
                >
                  {project.icon}
                </div>
                <div className="flex-1">
                  <h3
                    className={`font-semibold text-lg ${
                      selectedProject.id === project.id
                        ? "text-white"
                        : "text-gray-800 dark:text-white"
                    }`}
                  >
                    {project.name}
                  </h3>
                  <p
                    className={`text-sm mt-1 ${
                      selectedProject.id === project.id
                        ? "text-emerald-100"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {project.description || "Cliquez pour démarrer une conversation"}
                  </p>
                </div>
                <div
                  className={`p-2 rounded-full transition-colors ${
                    selectedProject.id === project.id
                      ? "bg-white/20"
                      : "bg-gray-100 dark:bg-gray-700 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900"
                  }`}
                >
                  <svg
                    className={`w-5 h-5 ${
                      selectedProject.id === project.id
                        ? "text-white"
                        : "text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}