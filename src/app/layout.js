import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata = {
  title: "ChatBot - AfricTivistes CitizenLab",
  description: "Interface de chatbot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}