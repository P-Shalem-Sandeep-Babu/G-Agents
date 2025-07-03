import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activeModule, setActiveModule] = useState("assistant");
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [userPreferences, setUserPreferences] = useState({
    fontSize: "medium",
    theme: "light",
    notifications: true,
  });

  const updatePreferences = (newPrefs) => {
    setUserPreferences(prev => ({ ...prev, ...newPrefs }));
  };

  return (
    <AppContext.Provider
      value={{
        activeModule,
        setActiveModule,
        currentLanguage,
        setCurrentLanguage,
        userPreferences,
        updatePreferences,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);