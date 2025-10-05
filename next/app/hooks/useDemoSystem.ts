"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  checkGameAccess, 
  getBookDemoStatus, 
  saveDemoUsage, 
  GameAccess,
  BookDemoUsage 
} from '../utils/demoSystem';

export const useDemoSystem = (gameId: string) => {
  const { user } = useAuth();
  const [accessLevel, setAccessLevel] = useState<GameAccess | null>(null);
  const [demoStatus, setDemoStatus] = useState<BookDemoUsage | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!user) {
      setAccessLevel({ canPlay: false, reason: 'Giriş yapmanız gerekiyor' });
      return;
    }

    const access = checkGameAccess(gameId, user.id.toString());
    setAccessLevel(access);

    if (access.canPlay && access.timeLeft) {
      const status = getBookDemoStatus(gameId, user.id.toString());
      setDemoStatus(status);
      setTimeLeft(status.timeLeft);
    }
  }, [user, gameId]);

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0 || !demoStatus) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsPlaying(false);
          saveDemoUsage(demoStatus.bookId || gameId, demoStatus.userId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, demoStatus]);

  const startDemo = () => {
    if (timeLeft <= 0) {
      alert('Günlük demo süreniz doldu! Yarın tekrar deneyin.');
      return;
    }
    setIsPlaying(true);
  };

  const stopDemo = () => {
    setIsPlaying(false);
    if (demoStatus) {
      saveDemoUsage(demoStatus.bookId || gameId, demoStatus.userId);
    }
  };

  const refreshDemo = () => {
    if (demoStatus) {
      const newStatus = getBookDemoStatus(demoStatus.bookId, demoStatus.userId);
      setDemoStatus(newStatus);
      setTimeLeft(newStatus.timeLeft);
    }
  };

  return {
    accessLevel,
    demoStatus,
    timeLeft,
    isPlaying,
    startDemo,
    stopDemo,
    refreshDemo,
    setIsPlaying
  };
};
