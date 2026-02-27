const API_URL = "https://acl-chatbot-api.onrender.com";
const API_KEY = "acl-dev-key-2024"; 

const getHeaders = () => ({
  "Content-Type": "application/json",
  "X-API-Key": API_KEY,
});

export async function sendMessage(message, sessionId = null, language = "fr", countryFilter = "senegal") {
  try {
    const response = await fetch(`${API_URL}/api/v1/chat`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({
        message: message,
        session_id: sessionId,
        language: language,
        country_filter: countryFilter,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
    throw error;
  }
}

export async function checkHealth() {
  try {
    const response = await fetch(`${API_URL}/health`);

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la vérification de l'API:", error);
    throw error;
  }
}

export async function getSessionHistory(sessionId) {
  try {
    const response = await fetch(`${API_URL}/api/v1/session/${sessionId}`, {
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique:", error);
    throw error;
  }
}

export async function deleteSession(sessionId) {
  try {
    const response = await fetch(`${API_URL}/api/v1/session/${sessionId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Erreur API: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la session:", error);
    throw error;
  }
}