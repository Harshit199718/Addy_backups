import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDownloadPWAMutation } from '../api/hooks';

const PWAInstallContext = createContext();

export const PWAInstallProvider = ({ children }) => {
  const [prompt, setPrompt] = useState(null);

  useEffect(() => {
    const handler = (event) => {
      event.preventDefault();
      setPrompt(event);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if the event has already been fired
    if (window.deferredPrompt) {
      setPrompt(window.deferredPrompt);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  return (
    <PWAInstallContext.Provider value={{ prompt, setPrompt }}>
      {children}
    </PWAInstallContext.Provider>
  );
};

export const usePWAInstallPrompt = () => {
  const { prompt, setPrompt } = useContext(PWAInstallContext);
  const [ progress, setProgress ] = useState(0);
  const [ DownloadPWA ] = useDownloadPWAMutation();

  const promptInstall = () => {
    if (prompt) {
      prompt.prompt();
      prompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          DownloadPWA({
            category: "pwa"
          })
          let progressInterval;
          const handleProgress = () => {
            setProgress((prev) => {
              if (prev < 100) {
                return prev + 100 / 16; // Increment progress over 16 intervals
              } else {
                clearInterval(progressInterval);
                setPrompt(null)
                return 100; // Complete progress
              }
            });
          };
          progressInterval = setInterval(handleProgress, 1000);
        } else {
          console.log('User dismissed the install prompt');
        }
      });
    }
  };

  return { promptInstall, isPromptAvailable: !!prompt, progress };
};
