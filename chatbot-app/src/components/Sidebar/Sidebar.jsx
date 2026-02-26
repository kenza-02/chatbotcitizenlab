"use client";

export default function Sidebar({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
  selectedProject,
}) {
  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:relative inset-y-0 left-0 z-50
          w-72 bg-emerald-600 dark:bg-emerald-900
          flex flex-col overflow-hidden
          transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-0"}
        `}
      >
        {/* Logo */}
        <div className="p-4 border-b border-emerald-500 dark:border-emerald-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div>
              <span className="font-semibold text-white">AssistCitoyen</span>
              <p className="text-xs text-emerald-200 dark:text-emerald-300">Votre assistant civique</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-emerald-200 lg:hidden"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Boutons de navigation */}
        <div className="p-3 space-y-2">
          {/* Bouton Discussions */}
          <button
            onClick={() => setActiveTab("discussions")}
            className={`w-full cursor-pointer flex items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
              activeTab === "discussions"
                ? "bg-white text-emerald-600 shadow-lg"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              activeTab === "discussions" 
                ? "bg-emerald-100" 
                : "bg-white/10"
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium">Discussions</p>
              <p className={`text-xs ${
                activeTab === "discussions" 
                  ? "text-emerald-500" 
                  : "text-emerald-200"
              }`}>
                Chattez avec l'assistant
              </p>
            </div>
          </button>

          {/* Bouton Projets */}
          <button
            onClick={() => setActiveTab("projets")}
            className={`w-full flex cursor-pointer items-center gap-3 p-3 rounded-xl transition-all duration-200 ${
              activeTab === "projets"
                ? "bg-white text-emerald-600 shadow-lg"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              activeTab === "projets" 
                ? "bg-emerald-100" 
                : "bg-white/10"
            }`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-medium">Projets</p>
              <p className={`text-xs ${
                activeTab === "projets" 
                  ? "text-emerald-500" 
                  : "text-emerald-200"
              }`}>
                Choisir un service
              </p>
            </div>
          </button>
        </div>

        {/* Projet actuel */}
        <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
          <p className="text-xs font-medium text-emerald-200 uppercase tracking-wide mb-3 px-2">
            Projet actuel
          </p>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <span className="text-xl">{selectedProject.icon}</span>
              </div>
              <div>
                <p className="font-medium text-white">{selectedProject.name}</p>
                <p className="text-xs text-emerald-200 mt-1">
                  {selectedProject.description || "Discussion en cours"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}