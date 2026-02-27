"use client";

import { useState, useEffect, useMemo } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";
import ChatHeader from "@/components/Chat/ChatHeader";
import ChatMessages from "@/components/Chat/ChatMessages";
import ChatInput from "@/components/Chat/ChatInput";
import ProjectsGrid from "@/components/Projects/ProjectsGrid";
import SettingsModal from "@/components/Settings/SettingsModal";
import { demoProjects } from "@/data/demoData";
import { sendMessage, checkHealth } from "@/services/chatApi";
import { useTheme } from "@/context/ThemeContext";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function Home() {
  const { darkMode } = useTheme();

  const [projectMessages, setProjectMessages, messagesLoaded] = useLocalStorage("acl-project-messages", {});
  const [projectSessions, setProjectSessions] = useLocalStorage("acl-project-sessions", {});

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("discussions");
  const [selectedProject, setSelectedProject] = useState(demoProjects[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState(null);
  
  const [localMessages, setLocalMessages] = useState([]);

  useEffect(() => {
    if (messagesLoaded) {
      setLocalMessages(projectMessages[selectedProject.id] || []);
    }
  }, [selectedProject.id, messagesLoaded, projectMessages]);

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

  const handleSelectProject = (project) => {
    if (localMessages.length > 0) {
      setProjectMessages((prev) => ({
        ...prev,
        [selectedProject.id]: localMessages,
      }));
    }
    
    setSelectedProject(project);
    setActiveTab("discussions");
  };

  const handleSendMessage = async (content) => {
    const projectId = selectedProject.id;
    const currentSessionId = projectSessions[projectId] || null;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: content,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...localMessages, userMessage];
    setLocalMessages(updatedMessages);

    setProjectMessages((prev) => ({
      ...prev,
      [projectId]: updatedMessages,
    }));

    setIsLoading(true);

    try {
      const response = await sendMessage(content, currentSessionId, "fr", "senegal");

      if (response.session_id) {
        setProjectSessions((prev) => ({
          ...prev,
          [projectId]: response.session_id,
        }));
      }

      const botMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: response.response,
        sources: response.sources || [],
        model: response.model,
        tokensUsed: response.tokens_used,
        timestamp: new Date().toISOString(),
      };

      const messagesWithResponse = [...updatedMessages, botMessage];
      setLocalMessages(messagesWithResponse);

      setProjectMessages((prev) => ({
        ...prev,
        [projectId]: messagesWithResponse,
      }));

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

      setProjectMessages((prev) => ({
        ...prev,
        [projectId]: messagesWithError,
      }));
    } finally {
      setIsLoading(false);
    }
  };

  if (!messagesLoaded) {
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
        onOpenSettings={() => setSettingsOpen(true)}
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

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}