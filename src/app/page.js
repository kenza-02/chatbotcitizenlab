"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import ChatHeader from "@/components/Chat/ChatHeader";
import ChatMessages from "@/components/Chat/ChatMessages";
import ChatInput from "@/components/Chat/ChatInput";
import ProjectsGrid from "@/components/Projects/ProjectsGrid";
import { demoProjects } from "@/data/demoData";
import { sendMessage, checkHealth } from "@/services/chatApi";
import { useTheme } from "@/context/ThemeContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Home() {
  const { darkMode } = useTheme();

  // États persistés - UNE SEULE conversation globale
  const [messages, setMessages, messagesLoaded] = useLocalStorage("acl-messages", []);
  const [sessionId, setSessionId, sessionLoaded] = useLocalStorage("acl-session-id", null);

  // États locaux
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("discussions");
  const [selectedProject, setSelectedProject] = useState(demoProjects[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);
  
  // État local pour les messages (pour mise à jour immédiate)
  const [localMessages, setLocalMessages] = useState([]);

  // Synchroniser localMessages avec messages au chargement
  useEffect(() => {
    if (messagesLoaded) {
      setLocalMessages(messages);
    }
  }, [messagesLoaded, messages]);

  // Ouvrir sidebar par défaut sur desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Vérifier l'état de l'API
  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        const health = await checkHealth();
        setApiStatus(health);
      } catch (error) {
        console.error("API non disponible:", error);
        setApiStatus({ status: "error" });
      }
    };
    checkApiHealth();
  }, []);

  // Sélectionner un projet (juste visuel, ne change pas la conversation)
  const handleSelectProject = (project) => {
    setSelectedProject(project);
    setActiveTab("discussions");
  };

  // Envoyer un message
  const handleSendMessage = async (content) => {
    // Créer le message utilisateur
    const userMessage = {
      id: Date.now(),
      role: "user",
      content: content,
      timestamp: new Date().toISOString(),
    };

    // Ajouter immédiatement à l'état local
    const updatedMessages = [...localMessages, userMessage];
    setLocalMessages(updatedMessages);
    setMessages(updatedMessages);

    setIsLoading(true);

    try {
      const response = await sendMessage(content, sessionId, "fr", "senegal");

      // Sauvegarder le session_id
      if (response.session_id) {
        setSessionId(response.session_id);
      }

      // Créer la réponse du bot
      const botMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: response.response,
        sources: response.sources || [],
        model: response.model,
        tokensUsed: response.tokens_used,
        timestamp: new Date().toISOString(),
      };

      // Ajouter la réponse
      const messagesWithResponse = [...updatedMessages, botMessage];
      setLocalMessages(messagesWithResponse);
      setMessages(messagesWithResponse);

    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        isError: true,
        timestamp: new Date().toISOString(),
      };

      const messagesWithError = [...updatedMessages, errorMessage];
      setLocalMessages(messagesWithError);
      setMessages(messagesWithError);
    } finally {
      setIsLoading(false);
    }
  };

  // Attendre le chargement
  if (!messagesLoaded || !sessionLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600 dark:text-gray-400">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedProject={selectedProject}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <ChatHeader
          selectedProject={selectedProject}
          activeTab={activeTab}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          apiStatus={apiStatus}
        />

        {activeTab === "discussions" ? (
          <>
            <ChatMessages messages={localMessages} isLoading={isLoading} />
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
          </>
        ) : (
          <ProjectsGrid
            selectedProject={selectedProject}
            onSelectProject={handleSelectProject}
          />
        )}
      </main>
    </div>
  );
}